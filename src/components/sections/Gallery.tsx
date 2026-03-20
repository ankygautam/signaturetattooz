import { startTransition, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GalleryItemContent } from "@/admin/types/content";
import { defaultGalleryPublicItems } from "@/data/cms-defaults";
import { usePublicContentCollection } from "@/firebase/public-content";
import { fadeUp, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

const filters = ["All", "Blackwork", "Realism", "Fine Line", "Traditional", "Custom"] as const;

const galleryDisplayOverrides: Array<{
  match: string;
  title: string;
  category: (typeof filters)[number];
  alt: string;
  description: string;
}> = [
  {
    match: "clock-eye",
    title: "Eye Of Time",
    category: "Realism",
    alt: "Realism forearm tattoo with eye and Roman numeral watch composition",
    description:
      "A black-and-grey forearm composition built around the symbolism of time and awareness, pairing a detailed eye with Roman numeral clockwork for a strong realism-driven flow.",
  },
  {
    match: "lion-crown",
    title: "Crowned Lion",
    category: "Realism",
    alt: "Lion crown and rose realism tattoo across the upper arm",
    description:
      "A bold lion portrait with crown and rose elements, designed to read with authority across the upper arm while keeping the black-and-grey shading rich and controlled.",
  },
  {
    match: "spartan-eagle",
    title: "Spartan Eagle",
    category: "Realism",
    alt: "Black and grey Spartan helmet and eagle tattoo on the upper arm",
    description:
      "This warrior-driven sleeve section layers a Spartan helmet with an eagle motif, giving the piece a disciplined heroic mood and a clean contrast through deep black-and-grey shading.",
  },
  {
    match: "tiger-crown",
    title: "Royal Tiger",
    category: "Realism",
    alt: "Tiger portrait with crown realism tattoo on the forearm",
    description:
      "A tiger face anchored by a crown for a king-like statement piece, focused on direct eye contact, heavy contrast, and a commanding forearm presence.",
  },
  {
    match: "pattern-arm",
    title: "Geometric Flow",
    category: "Blackwork",
    alt: "Geometric blackwork tattoo pattern wrapping across the arm",
    description:
      "A precision geometric blackwork piece that uses repeating forms and negative space to create a clean ornamental rhythm across the arm.",
  },
  {
    match: "shiv-half-face",
    title: "Shiv Shakti Linework",
    category: "Custom",
    alt: "Custom spiritual tattoo with Shiv portrait and calligraphic trident linework",
    description:
      "A devotional custom piece blending portraiture, symbolism, and calligraphic flow, balanced with a red accent stroke to keep the spiritual energy sharp and modern.",
  },
  {
    match: "family-watch",
    title: "Family In Time",
    category: "Custom",
    alt: "Custom family silhouette tattoo with watch realism on the forearm",
    description:
      "A sentimental family composition with a mechanical watch centerpiece, built to express time, memory, and emotional connection through layered realism.",
  },
  {
    match: "respect-time",
    title: "Respect The Past",
    category: "Blackwork",
    alt: "Black and grey watch tattoo with script banner on the forearm",
    description:
      "A black-and-grey watch concept with scripted lettering, composed as a reflective piece about honoring the past while moving forward with purpose.",
  },
  {
    match: "portrait-elder",
    title: "Legacy Portrait",
    category: "Realism",
    alt: "Realism portrait tribute tattoo with silhouette scene on the forearm",
    description:
      "A realism portrait tribute focused on likeness, softness in the face, and emotional storytelling through the figure and silhouette scene below.",
  },
];

function normalizeGalleryItem(item: GalleryItemContent): GalleryItemContent {
  const normalizedSource = `${item.imageUrl} ${item.title}`.toLowerCase();
  const matchedOverride = galleryDisplayOverrides.find((entry) =>
    normalizedSource.includes(entry.match),
  );

  if (!matchedOverride) {
    return item;
  }

  return {
    ...item,
    title: matchedOverride.title,
    category: matchedOverride.category,
    alt: matchedOverride.alt,
    description: item.description?.trim() || matchedOverride.description,
  };
}

function getGalleryDescription(item: GalleryItemContent) {
  if (item.description?.trim()) {
    return item.description.trim();
  }

  return `This ${item.category.toLowerCase()} piece is presented as part of the Signature Tattooz portfolio, with attention on composition, readability, and long-term visual strength on the skin.`;
}

export function Gallery() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const fallbackItems = useMemo(() => defaultGalleryPublicItems, []);
  const managedItems = usePublicContentCollection<GalleryItemContent>("galleryItems", fallbackItems);

  const sortedItems = useMemo(
    () =>
      [...managedItems]
        .map((item) => normalizeGalleryItem(item))
        .sort(
        (left, right) => (left.order ?? Number.MAX_SAFE_INTEGER) - (right.order ?? Number.MAX_SAFE_INTEGER),
        ),
    [managedItems],
  );

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") {
      return sortedItems;
    }

    return sortedItems.filter((item) => item.category === activeFilter);
  }, [activeFilter, sortedItems]);

  const selectedIndex = useMemo(
    () => filteredItems.findIndex((item) => item.id === selectedId),
    [filteredItems, selectedId],
  );

  const selectedItem = selectedIndex >= 0 ? filteredItems[selectedIndex] : null;
  const selectedDescription = selectedItem ? getGalleryDescription(selectedItem) : "";

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

      if (event.key === "ArrowRight" && filteredItems.length > 1) {
        const nextIndex = (selectedIndex + 1) % filteredItems.length;
        setSelectedId(filteredItems[nextIndex].id);
      }

      if (event.key === "ArrowLeft" && filteredItems.length > 1) {
        const prevIndex = (selectedIndex - 1 + filteredItems.length) % filteredItems.length;
        setSelectedId(filteredItems[prevIndex].id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [filteredItems, selectedIndex, selectedItem]);

  const openItem = (itemId: string) => {
    setSelectedId(itemId);
  };

  const showNextItem = () => {
    if (!filteredItems.length || selectedIndex < 0) {
      return;
    }

    const nextIndex = (selectedIndex + 1) % filteredItems.length;
    setSelectedId(filteredItems[nextIndex].id);
  };

  const showPrevItem = () => {
    if (!filteredItems.length || selectedIndex < 0) {
      return;
    }

    const prevIndex = (selectedIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedId(filteredItems[prevIndex].id);
  };

  return (
    <section id="gallery" className="section-surface surface-stone relative py-24">
      <div className="section-shell space-y-10">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <p className="eyebrow">Featured Work</p>
            <h2 className="section-title mt-4">
              Tattoo
              <br />
              Gallery
            </h2>
          </div>

          <div className="space-y-5">
            <p className="section-copy max-w-2xl">
              A more image-heavy gallery inspired by the reference layout. It is built to feel like
              a tattoo brand showcase first, with filters and hover details layered in after.
            </p>

            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => startTransition(() => setActiveFilter(filter))}
                  className={cn(
                    "min-w-[7rem] border px-5 py-2.5 text-[0.64rem] uppercase tracking-[0.24em] transition",
                    activeFilter === filter
                      ? "theme-filter-chip-active"
                      : "theme-filter-chip",
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid gap-5 lg:grid-cols-12"
          >
            {filteredItems.map((item, index) => {
              const sizes = [
                "lg:col-span-5 lg:row-span-2",
                "lg:col-span-3",
                "lg:col-span-4",
                "lg:col-span-4",
                "lg:col-span-3",
                "lg:col-span-5",
              ];

              const heights = [
                "h-[34rem]",
                "h-[16rem]",
                "h-[16rem]",
                "h-[16rem]",
                "h-[16rem]",
                "h-[20rem]",
              ];

              return (
                <motion.button
                  key={`${activeFilter}-${item.title}`}
                  type="button"
                  onClick={() => openItem(item.id)}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                  variants={fadeUp(index * 0.04)}
                  className={cn(
                    "group noise-mask relative overflow-hidden border border-white/10 text-left transition hover:border-white/20",
                    sizes[index % sizes.length],
                  )}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.alt || item.title}
                    className={cn(
                      "w-full object-cover transition duration-500 group-hover:scale-105",
                      heights[index % heights.length],
                    )}
                  />
                  <div className="theme-image-overlay absolute inset-0" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="card-title">{item.title}</p>
                    <p className="meta-label mt-2 text-accentMuted">
                      {item.category}
                    </p>
                    <p className="mt-4 text-[0.62rem] uppercase tracking-[0.3em] text-white/60 transition group-hover:text-white">
                      Open Gallery View
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {selectedItem ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[120] bg-black/88 backdrop-blur-md"
            >
              <div className="flex h-full w-full items-center justify-center p-4 md:p-6">
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 24, scale: 0.98 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="relative grid h-full w-full max-w-[96rem] overflow-hidden border border-white/10 bg-[#080808] shadow-[0_30px_120px_rgba(0,0,0,0.65)] lg:grid-cols-[1.25fr_0.75fr]"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedId(null)}
                    className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/50 text-2xl text-white/80 transition hover:border-white/30 hover:text-white"
                    aria-label="Close gallery view"
                  >
                    ×
                  </button>

                  <div className="relative min-h-[48vh] overflow-hidden bg-black lg:min-h-full">
                    <img
                      src={selectedItem.imageUrl}
                      alt={selectedItem.alt || selectedItem.title}
                      className="h-full w-full object-contain p-4 sm:p-6 lg:p-8"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                      <div>
                        <p className="eyebrow text-white/70">Signature Tattooz Gallery</p>
                        <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.08em] text-bone sm:text-4xl">
                          {selectedItem.title}
                        </h3>
                      </div>

                      <div className="hidden items-center gap-3 md:flex">
                        <button
                          type="button"
                          onClick={showPrevItem}
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/45 text-lg text-bone transition hover:border-white/30 hover:bg-black/60"
                          aria-label="Previous gallery item"
                        >
                          ←
                        </button>
                        <button
                          type="button"
                          onClick={showNextItem}
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/45 text-lg text-bone transition hover:border-white/30 hover:bg-black/60"
                          aria-label="Next gallery item"
                        >
                          →
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex h-full flex-col justify-between border-t border-white/10 bg-[#090909] p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
                    <div className="space-y-8">
                      <div className="space-y-3">
                        <p className="eyebrow">Gallery Detail</p>
                        <h3 className="font-display text-4xl uppercase leading-[0.95] tracking-[0.08em] text-bone sm:text-5xl">
                          {selectedItem.title}
                        </h3>
                      </div>

                      <p className="section-copy max-w-xl">
                        This piece sits inside the {selectedItem.category.toLowerCase()} direction of
                        Signature Tattooz — designed to feel bold in composition, clean in execution,
                        and personal in how it reads on the skin.
                      </p>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="border border-white/10 bg-white/[0.02] p-4">
                          <p className="meta-label text-accentMuted">Style</p>
                          <p className="mt-3 text-lg font-medium text-bone">{selectedItem.category}</p>
                        </div>
                        <div className="border border-white/10 bg-white/[0.02] p-4">
                          <p className="meta-label text-accentMuted">Gallery Note</p>
                          <p className="mt-3 text-sm leading-relaxed text-white/72">
                            {selectedItem.alt || `${selectedItem.title} by Signature Tattooz`}
                          </p>
                        </div>
                      </div>

                      <div className="border border-white/10 bg-white/[0.02] p-5">
                        <p className="meta-label text-accentMuted">Description</p>
                        <p className="mt-3 text-sm leading-relaxed text-white/72">
                          {selectedDescription}
                        </p>
                      </div>

                      <div className="border border-white/10 bg-gradient-to-br from-accentMuted/10 via-white/[0.02] to-transparent p-5">
                        <p className="meta-label text-accentMuted">Studio Perspective</p>
                        <p className="mt-3 text-sm leading-relaxed text-white/72">
                          Every featured piece is built around placement, readability, and long-term
                          wear. The gallery view is meant to let the artwork breathe the way it would
                          in a real studio portfolio presentation.
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <p className="meta-label text-white/45">
                        {String(selectedIndex + 1).padStart(2, "0")} / {String(filteredItems.length).padStart(2, "0")}
                      </p>
                      <div className="flex items-center gap-3 md:hidden">
                        <button
                          type="button"
                          onClick={showPrevItem}
                          className="flex-1 border border-white/15 px-4 py-3 text-[0.68rem] uppercase tracking-[0.28em] text-bone transition hover:border-white/30"
                        >
                          Previous
                        </button>
                        <button
                          type="button"
                          onClick={showNextItem}
                          className="flex-1 border border-white/15 px-4 py-3 text-[0.68rem] uppercase tracking-[0.28em] text-bone transition hover:border-white/30"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
