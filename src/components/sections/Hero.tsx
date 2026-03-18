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

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-black pt-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(141,31,50,0.22),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(183,145,96,0.14),transparent_24%)]" />
      <div className="absolute inset-0 grid-overlay opacity-[0.08]" />

      <div className="section-shell relative grid min-h-[calc(100vh-7rem)] gap-10 pb-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          animate="show"
          className="flex flex-col justify-end pb-10"
        >
          <motion.p variants={fadeUp(0.02)} className="eyebrow">
            Tattoo shop aesthetic · Custom work · Hoshiarpur
          </motion.p>
          <motion.h1
            variants={fadeUp(0.08)}
            className="mt-4 font-display text-[5.5rem] uppercase leading-[0.8] tracking-[0.05em] text-bone sm:text-[7.5rem] lg:text-[10rem]"
          >
            Ink
            <br />
            With
            <br />
            Identity
          </motion.h1>
          <motion.p
            variants={fadeUp(0.14)}
            className="serif-copy mt-6 max-w-xl text-2xl leading-8 text-bone/80"
          >
            Signature Tattooz creates custom tattoos with story, detail, privacy, hygiene, and a
            more personal studio process led by Nitin Gautam.
          </motion.p>
          <motion.div variants={fadeUp(0.2)} className="mt-8 flex flex-wrap gap-4">
            <Button href="#gallery" size="lg">
              View Work
            </Button>
            <Button href="#contact" variant="ghost" size="lg">
              Book Now
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp(0.12)}
          initial="hidden"
          animate="show"
          className="relative min-h-[38rem]"
        >
          <div className="noise-mask absolute right-0 top-0 h-[78%] w-[78%] overflow-hidden border border-white/10 bg-black shadow-card">
            <img
              src={visuals.heroPrimaryImage}
              alt="Tattoo studio portrait"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
          </div>

          <div className="noise-mask absolute bottom-0 left-0 z-10 h-[42%] w-[46%] overflow-hidden border border-white/10 bg-black shadow-card">
            <img src={visuals.heroSecondaryImage} alt="Tattoo detail" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>

          <div className="absolute left-[10%] top-[10%] z-20 border border-white/10 bg-black/80 px-5 py-4 backdrop-blur-md">
            <p className="eyebrow">Lead artist</p>
            <p className="mt-2 font-display text-5xl uppercase leading-none text-bone">
              Nitin Gautam
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.28em] text-accentMuted">
              Expert Tattooist · Digital Artist
            </p>
          </div>

          <div className="absolute bottom-8 right-0 z-20 max-w-xs border border-white/10 bg-black/85 p-5 backdrop-blur-md">
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
        className="absolute bottom-6 left-1/2 inline-flex -translate-x-1/2 items-center gap-3 text-[0.65rem] uppercase tracking-[0.28em] text-muted transition hover:text-bone"
      >
        Scroll Down
        <ArrowDownRight className="h-4 w-4" />
      </a>

      <div className="pointer-events-none absolute bottom-2 right-4 font-display text-[7rem] uppercase leading-none text-white/5 sm:text-[10rem]">
        Tattoo
      </div>
    </section>
  );
}
