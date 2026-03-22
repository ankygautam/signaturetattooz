import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SiteVisuals } from "@/admin/types/content";
import { defaultSiteVisuals } from "@/data/cms-defaults";
import { usePublicSingletonDocument } from "@/firebase/public-content";
import { fadeUp, stagger } from "@/lib/motion";

export function Hero() {
  const visuals = usePublicSingletonDocument<SiteVisuals>(
    "cms",
    "siteVisuals",
    defaultSiteVisuals,
  );
  const localSecondaryImage = `${import.meta.env.BASE_URL}images/gallery/clock-eye.jpg`;
  const heroSecondaryImage =
    !visuals.heroSecondaryImage ||
    visuals.heroSecondaryImage ===
      "https://images.unsplash.com/photo-1517230878791-4d28214057c2?auto=format&fit=crop&w=1200&q=80"
      ? localSecondaryImage
      : visuals.heroSecondaryImage;

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-black pt-24 sm:pt-28">
      <div className="theme-hero-glow absolute inset-0" />
      <div className="absolute inset-0 grid-overlay opacity-[0.08]" />

      <div className="section-shell relative grid min-h-[calc(100vh-6rem)] gap-10 pb-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          animate="show"
          className="flex flex-col justify-end pb-4 sm:pb-10"
        >
          <motion.p variants={fadeUp(0.02)} className="eyebrow">
            Tattoo shop aesthetic · Custom work · Hoshiarpur
          </motion.p>
          <motion.h1
            variants={fadeUp(0.08)}
            className="mt-4 font-display text-[4rem] uppercase leading-[0.82] tracking-[0.05em] text-bone sm:text-[5.8rem] lg:text-[10rem]"
          >
            Ink
            <br />
            With
            <br />
            Identity
          </motion.h1>
          <motion.p
            variants={fadeUp(0.14)}
            className="serif-copy mt-5 max-w-xl text-[1.35rem] leading-8 text-bone/80 sm:mt-6 sm:text-2xl"
          >
            Signature Tattooz creates custom tattoos with story, detail, privacy, hygiene, and a
            more personal studio process led by Nitin Gautam.
          </motion.p>
          <motion.div variants={fadeUp(0.2)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button href="#gallery" size="lg" className="w-full sm:w-auto">
              View Work
            </Button>
            <Button href="#contact" variant="ghost" size="lg" className="w-full sm:w-auto">
              Book Now
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp(0.12)}
          initial="hidden"
          animate="show"
          className="relative min-h-[28rem] sm:min-h-[38rem]"
        >
          <div className="noise-mask absolute right-0 top-0 h-[74%] w-[84%] overflow-hidden border border-white/10 bg-black shadow-card sm:h-[78%] sm:w-[78%]">
            <img
              src={visuals.heroPrimaryImage}
              alt="Tattoo studio portrait"
              className="h-full w-full object-cover"
            />
            <div className="theme-image-overlay absolute inset-0" />
          </div>

          <div className="noise-mask absolute bottom-0 left-0 z-10 h-[40%] w-[52%] overflow-hidden border border-white/10 bg-black shadow-card sm:h-[42%] sm:w-[46%]">
            <img src={heroSecondaryImage} alt="Tattoo detail" className="h-full w-full object-cover" />
            <div className="theme-image-overlay-soft absolute inset-0" />
          </div>

          <div className="absolute left-4 top-4 z-20 max-w-[78%] border border-white/10 bg-black/80 px-4 py-3 backdrop-blur-md sm:left-[10%] sm:top-[10%] sm:max-w-none sm:px-5 sm:py-4">
            <p className="eyebrow">Lead artist</p>
            <p className="mt-2 font-display text-4xl uppercase leading-none text-bone sm:text-5xl">
              Nitin Gautam
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.28em] text-accentMuted">
              Expert Tattooist · Digital Artist
            </p>
          </div>

          <div className="absolute bottom-4 left-4 right-4 z-20 max-w-none border border-white/10 bg-black/85 p-4 backdrop-blur-md sm:bottom-8 sm:left-auto sm:right-0 sm:max-w-xs sm:p-5">
            <p className="eyebrow">Studio values</p>
            <p className="mt-3 text-sm leading-7 text-muted">
              Welcoming atmosphere, private station, safe and sanitary environment, and custom work
              shaped through collaboration.
            </p>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[0.65rem] uppercase tracking-[0.28em] text-muted transition hover:text-bone sm:inline-flex"
      >
        Scroll Down
        <ArrowDownRight className="h-4 w-4" />
      </a>

      <div className="pointer-events-none absolute bottom-2 right-4 font-display text-[4.5rem] uppercase leading-none text-white/5 sm:text-[10rem]">
        Tattoo
      </div>
    </section>
  );
}
