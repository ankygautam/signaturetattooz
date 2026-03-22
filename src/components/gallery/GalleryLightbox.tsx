import { AnimatePresence, motion } from "framer-motion";
import { TattooGalleryItem } from "@/data/galleryData";

type GalleryLightboxProps = {
  items: TattooGalleryItem[];
  selectedId: string | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

const executionNotesByFilter: Record<TattooGalleryItem["filter"], string> = {
  Portraits:
    "Portrait tattoos depend on smooth shading, controlled values, and enough contrast to keep the subject dimensional instead of flat.",
  Spiritual:
    "Spiritual tattoos need clean line placement, respect for symbolism, and balanced flow so the final piece feels meaningful as well as visually grounded.",
  Script:
    "Script tattoos require steady line control, clean letter spacing, and balanced sizing so the message stays elegant and readable over time.",
  Floral:
    "Floral tattoos work best when petal edges, soft gradients, and tonal depth are handled carefully so the flower keeps both softness and structure.",
  Geometric:
    "Geometric tattoos rely on symmetry, spacing, and repeat precision so the pattern stays crisp, aligned, and strong on the body.",
  Custom:
    "Custom tattoos are shaped around placement, flow, and visual storytelling, so the composition has to feel intentional from every angle.",
};

function getTattooFocus(item: TattooGalleryItem) {
  const title = item.title.toLowerCase();

  if (title.includes("rose") || item.filter === "Floral") {
    return "This piece is built around petal movement, soft black-and-grey depth, and a floral silhouette that stays elegant both up close and at a distance.";
  }

  if (title.includes("eye")) {
    return "The focus here is realism through detail, value control, and a strong focal point that immediately pulls attention to the eye itself.";
  }

  if (
    title.includes("lion") ||
    title.includes("tiger") ||
    title.includes("lioness") ||
    item.filter === "Portraits"
  ) {
    return "Portrait-led tattoos like this depend on expression, texture, and contrast so the subject carries power and presence clearly on skin.";
  }

  if (item.filter === "Spiritual") {
    return "The emphasis here is on symbolism, flow, and respectful detailing so the tattoo feels personal, grounded, and visually strong at the same time.";
  }

  if (item.filter === "Script") {
    return "This tattoo is about clarity first, keeping the message clean, readable, and emotionally direct without losing visual finesse.";
  }

  if (item.filter === "Geometric") {
    return "The design is driven by structure, repeat rhythm, and spacing discipline so the pattern reads cleanly as it wraps with the body.";
  }

  return "This piece focuses on composition, contrast, and long-term readability so the tattoo feels intentional and visually balanced over time.";
}

export function GalleryLightbox({
  items,
  selectedId,
  onClose,
  onPrevious,
  onNext,
}: GalleryLightboxProps) {
  const selectedIndex = items.findIndex((item) => item.id === selectedId);
  const selectedItem = selectedIndex >= 0 ? items[selectedIndex] : null;

  return (
    <AnimatePresence>
      {selectedItem ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] overflow-y-auto bg-black/88 backdrop-blur-md"
        >
          <div className="flex min-h-full w-full items-start justify-center p-3 sm:p-4 md:p-6 lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="relative grid w-full max-w-[96rem] overflow-hidden border border-white/10 bg-[#080808] shadow-[0_30px_120px_rgba(0,0,0,0.65)] lg:max-h-[calc(100vh-3rem)] lg:grid-cols-[1.25fr_0.75fr]"
            >
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/50 text-2xl text-white/80 transition hover:border-white/30 hover:text-white"
                aria-label="Close gallery view"
              >
                ×
              </button>

              <div className="relative min-h-[42vh] overflow-hidden bg-black sm:min-h-[48vh] lg:min-h-0">
                <img
                  src={selectedItem.src}
                  alt={selectedItem.alt}
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
                      onClick={onPrevious}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/45 text-lg text-bone transition hover:border-white/30 hover:bg-black/60"
                      aria-label="Previous gallery item"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={onNext}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/45 text-lg text-bone transition hover:border-white/30 hover:bg-black/60"
                      aria-label="Next gallery item"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between border-t border-white/10 bg-[#090909] p-6 sm:p-8 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto lg:border-l lg:border-t-0 lg:p-10">
                <div className="space-y-8">
                  <div className="space-y-3">
                    <p className="eyebrow">Gallery Detail</p>
                    <h3 className="font-display text-4xl uppercase leading-[0.95] tracking-[0.08em] text-bone sm:text-5xl">
                      {selectedItem.title}
                    </h3>
                  </div>

                  <p className="section-copy max-w-xl">
                    This piece sits inside our {selectedItem.filter.toLowerCase()} collection at
                    Signature Tattooz, shaped to feel strong in composition, clean in execution,
                    and natural in the way it settles on skin.
                  </p>

                  <div className="border border-white/10 bg-white/[0.02] p-5">
                    <p className="meta-label text-accentMuted">Description</p>
                    <p className="mt-3 text-sm leading-relaxed text-white/72">
                      {selectedItem.description}
                    </p>
                  </div>

                  <div className="border border-white/10 bg-gradient-to-br from-accentMuted/10 via-white/[0.02] to-transparent p-5">
                    <p className="meta-label text-accentMuted">Tattoo Focus</p>
                    <p className="mt-3 text-sm leading-relaxed text-white/72">
                      {getTattooFocus(selectedItem)}
                    </p>
                  </div>

                  <div className="border border-white/10 bg-white/[0.02] p-5">
                    <p className="meta-label text-accentMuted">Execution Notes</p>
                    <p className="mt-3 text-sm leading-relaxed text-white/72">
                      {executionNotesByFilter[selectedItem.filter]}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="meta-label text-white/45">
                    {String(selectedIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                  </p>
                  <div className="flex items-center gap-3 md:hidden">
                    <button
                      type="button"
                      onClick={onPrevious}
                      className="flex-1 border border-white/15 px-4 py-3 text-[0.68rem] uppercase tracking-[0.28em] text-bone transition hover:border-white/30"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={onNext}
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
  );
}
