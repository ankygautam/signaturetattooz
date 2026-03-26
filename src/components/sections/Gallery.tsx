import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GalleryItemContent } from "@/admin/types/content";
import { GalleryFilters } from "@/components/gallery/GalleryFilters";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import {
  GalleryFilter,
  TattooGalleryItem,
  normalizeGalleryFilter,
  normalizeGalleryImageKey,
} from "@/data/galleryData";
import { defaultGalleryPublicItems } from "@/data/cms-defaults";
import { usePublicContentCollection } from "@/firebase/public-content";
import { resolveSiteAssetPath } from "@/lib/site-paths";

type GalleryMode = "preview" | "full";

function toGalleryItem(item: GalleryItemContent): TattooGalleryItem {
  return {
    id: item.id,
    src: resolveSiteAssetPath(item.imageUrl),
    title: item.title,
    filter: normalizeGalleryFilter(item.category),
    secondaryFilters: [],
    alt: item.alt || `${item.title} tattoo artwork`,
    description:
      item.description?.trim() ||
      `A Signature Tattooz piece designed with strong placement, clean execution, and long-term readability on skin.`,
    order: item.order ?? Number.MAX_SAFE_INTEGER,
  };
}

export function Gallery({
  mode = "preview",
  browseHref = "./ourgallery/",
}: {
  mode?: GalleryMode;
  browseHref?: string;
}) {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const fallbackItems = useMemo(() => defaultGalleryPublicItems, []);
  const managedItems = usePublicContentCollection<GalleryItemContent>("galleryItems", fallbackItems);
  const isPreviewMode = mode === "preview";

  const allItems = useMemo(
    () =>
      Array.from(
        new Map(
          [...fallbackItems, ...managedItems].map((item) => [
            normalizeGalleryImageKey(item.imageUrl),
            toGalleryItem(item),
          ]),
        ).values(),
      ).sort((left, right) => left.order - right.order),
    [fallbackItems, managedItems],
  );

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") {
      return allItems;
    }

    return allItems.filter((item) => item.filter === activeFilter);
  }, [activeFilter, allItems]);

  const selectedIndex = useMemo(
    () => allItems.findIndex((item) => item.id === selectedId),
    [allItems, selectedId],
  );

  const selectedItem = selectedIndex >= 0 ? allItems[selectedIndex] : null;
  const previewCountLabel = Math.min(filteredItems.length, 8);

  useEffect(() => {
    if (selectedId && !selectedItem) {
      setSelectedId(null);
    }
  }, [selectedId, selectedItem]);

  useEffect(() => {
    if (!selectedItem) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedId(null);
      }

      if (event.key === "ArrowRight" && allItems.length > 1) {
        const nextIndex = (selectedIndex + 1) % allItems.length;
        setSelectedId(allItems[nextIndex].id);
      }

      if (event.key === "ArrowLeft" && allItems.length > 1) {
        const prevIndex = (selectedIndex - 1 + allItems.length) % allItems.length;
        setSelectedId(allItems[prevIndex].id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [allItems, selectedIndex, selectedItem]);

  const showNextItem = () => {
    if (!allItems.length || selectedIndex < 0) {
      return;
    }

    const nextIndex = (selectedIndex + 1) % allItems.length;
    setSelectedId(allItems[nextIndex].id);
  };

  const showPrevItem = () => {
    if (!allItems.length || selectedIndex < 0) {
      return;
    }

    const prevIndex = (selectedIndex - 1 + allItems.length) % allItems.length;
    setSelectedId(allItems[prevIndex].id);
  };

  const HeadingTag = isPreviewMode ? "h2" : "h1";

  return (
    <section id="gallery" className="section-surface surface-stone relative py-24">
      <div className="section-shell space-y-10">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div className="min-w-0">
            <p className="eyebrow">Featured Work</p>
            <HeadingTag className="section-title mt-4">
              Tattoo
              <br />
              Gallery
            </HeadingTag>
          </div>

          <div className="min-w-0 space-y-5">
            <p className="section-copy max-w-2xl">
              A tattoo-first gallery built to feel premium and visual, with every uploaded piece
              organized into a cleaner filter system that reads more naturally across the
              portfolio.
            </p>

            <GalleryFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

            {isPreviewMode && filteredItems.length > 8 ? (
              <p className="theme-light-muted text-[0.68rem] uppercase tracking-[0.18em] sm:text-xs sm:tracking-[0.24em]">
                Showing {previewCountLabel} works here. Open any image or visit{" "}
                <a href={browseHref} className="underline underline-offset-4 transition hover:text-theme-light-ink">
                  Gallery
                </a>{" "}
                for all {filteredItems.length}.
              </p>
            ) : !isPreviewMode ? (
              <p className="theme-light-muted text-[0.68rem] uppercase tracking-[0.18em] sm:text-xs sm:tracking-[0.24em]">
                Showing all {filteredItems.length} works in the full gallery.
              </p>
            ) : null}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            <GalleryGrid items={filteredItems} mode={mode} onOpen={setSelectedId} />
          </motion.div>
        </AnimatePresence>

        <GalleryLightbox
          items={allItems}
          selectedId={selectedId}
          onClose={() => setSelectedId(null)}
          onPrevious={showPrevItem}
          onNext={showNextItem}
        />
      </div>
    </section>
  );
}
