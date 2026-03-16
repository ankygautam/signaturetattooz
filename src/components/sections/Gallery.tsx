import { startTransition, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { galleryItems } from "@/data/site-content";
import { fadeUp, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

const filters = ["All", "Blackwork", "Realism", "Fine Line", "Traditional", "Custom"] as const;

export function Gallery() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") {
      return galleryItems;
    }

    return galleryItems.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="gallery" className="relative py-24">
      <div className="section-shell space-y-10">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
          <SectionHeader
            eyebrow="Featured work"
            title="Latest Work, Shown With A Stronger Tattoo-Shop Energy."
            description="A grittier image-led portfolio inspired by the reference. You can still swap every placeholder later, but the structure now feels closer to a modern studio showcase."
          />

          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => startTransition(() => setActiveFilter(filter))}
                className={cn(
                  "rounded-full border px-4 py-2 text-[0.65rem] uppercase tracking-[0.28em] transition",
                  activeFilter === filter
                    ? "border-accentMuted bg-accentMuted/10 text-bone"
                    : "border-white/10 bg-white/[0.03] text-muted hover:text-bone",
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.35 }}
            className="columns-1 gap-5 md:columns-2 xl:columns-3"
          >
            {filteredItems.map((item, index) => (
              <motion.article
                key={`${activeFilter}-${item.title}`}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                variants={fadeUp(index * 0.03)}
                className={cn("group relative overflow-hidden rounded-[1.2rem] border border-white/8", item.size)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className={cn(
                    "w-full object-cover transition duration-500 group-hover:scale-105",
                    index % 3 === 0 ? "h-[32rem]" : index % 2 === 0 ? "h-[26rem]" : "h-[22rem]",
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-85" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                  <div>
                    <p className="font-display text-4xl uppercase leading-none text-bone">
                      {item.title}
                    </p>
                    <p className="mt-2 text-[0.65rem] uppercase tracking-[0.28em] text-accentMuted">
                      {item.category}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full border border-white/15 bg-black/30 transition group-hover:border-accentMuted" />
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
