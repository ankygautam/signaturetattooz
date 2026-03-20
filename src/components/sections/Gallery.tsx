import { startTransition, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GalleryItemContent } from "@/admin/types/content";
import { defaultGalleryPublicItems } from "@/data/cms-defaults";
import { usePublicContentCollection } from "@/firebase/public-content";
import { fadeUp, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

const filters = ["All", "Blackwork", "Realism", "Fine Line", "Traditional", "Custom"] as const;

export function Gallery() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const fallbackItems = useMemo(() => defaultGalleryPublicItems, []);
  const managedItems = usePublicContentCollection<GalleryItemContent>("galleryItems", fallbackItems);

  const sortedItems = useMemo(
    () =>
      [...managedItems].sort(
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

  return (
    <section id="gallery" className="relative bg-[#050505] py-24">
      <div className="section-shell space-y-10">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <p className="eyebrow">Featured Work</p>
            <h2 className="section-title mt-4">
              Black
              <br />
              Stories
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
                    "border px-4 py-2 text-[0.64rem] uppercase tracking-[0.28em] transition",
                    activeFilter === filter
                      ? "border-accentMuted bg-accentMuted/10 text-bone"
                      : "border-white/10 text-muted hover:border-white/20 hover:text-bone",
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
                <motion.article
                  key={`${activeFilter}-${item.title}`}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                  variants={fadeUp(index * 0.04)}
                  className={cn(
                    "group noise-mask relative overflow-hidden border border-white/10",
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="card-title">
                      {item.title}
                    </p>
                    <p className="meta-label mt-2 text-accentMuted">
                      {item.category}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
