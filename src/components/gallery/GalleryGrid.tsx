import { motion } from "framer-motion";
import { TattooGalleryItem } from "@/data/galleryData";
import { fadeUp, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

type GalleryGridProps = {
  items: TattooGalleryItem[];
  mode?: "preview" | "full";
  onOpen: (itemId: string) => void;
};

export function GalleryGrid({ items, mode = "preview", onOpen }: GalleryGridProps) {
  const isPreviewMode = mode === "preview";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-4"
    >
      {items.map((item, index) => {
        const visibilityClasses =
          !isPreviewMode
            ? ""
            : index < 4
              ? ""
              : index < 8
                ? "hidden sm:block"
                : "hidden";

        return (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => onOpen(item.id)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp(index * 0.04)}
            className={cn(
              "group noise-mask relative overflow-hidden rounded-[1.35rem] border border-white/10 text-left transition hover:-translate-y-1 hover:border-white/20",
              visibilityClasses,
            )}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="h-[14rem] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[16rem] lg:h-[18rem]"
            />
            <div className="theme-image-overlay absolute inset-0" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <p className="font-display text-[2rem] uppercase leading-[0.92] text-bone sm:text-[2.35rem]">
                {item.title}
              </p>
              <p className="mt-3 text-[0.58rem] uppercase tracking-[0.28em] text-white/60 transition group-hover:text-white">
                Open Gallery View
              </p>
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
