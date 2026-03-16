import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fadeUp, stagger } from "@/lib/motion";

const heroImage =
  "https://images.unsplash.com/photo-1542727365-19732a80dcfd?auto=format&fit=crop&w=1800&q=80";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(6,6,6,0.95) 8%, rgba(6,6,6,0.76) 45%, rgba(6,6,6,0.88) 100%), url(${heroImage})`,
          backgroundPosition: "center top",
          backgroundSize: "cover",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(183,145,96,0.16),transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(6,6,6,0.3)_60%,rgba(6,6,6,1))]" />

      <div className="section-shell relative flex min-h-screen items-end pb-14 pt-32 md:items-center md:pb-24">
        <motion.div
          variants={stagger(0.14)}
          initial="hidden"
          animate="show"
          className="grid w-full gap-12 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="max-w-3xl space-y-7">
            <motion.p variants={fadeUp(0.04)} className="eyebrow">
              Signature Tattooz · Tattoo shop in Hoshiarpur
            </motion.p>
            <motion.h1
              variants={fadeUp(0.1)}
              className="font-display text-[5.5rem] uppercase leading-[0.82] tracking-[0.03em] text-bone sm:text-[7rem] md:text-[8.5rem] lg:text-[10rem]"
            >
              Custom Tattoos
              <br />
              With Story,
              <br />
              Detail & Soul
            </motion.h1>
            <motion.p
              variants={fadeUp(0.16)}
              className="max-w-xl text-sm leading-8 text-muted sm:text-base"
            >
              Signature Tattooz builds original tattoo work around custom artwork, private comfort,
              hygienic practice, and direct collaboration with lead artist Nitin Gautam.
            </motion.p>
            <motion.div variants={fadeUp(0.22)} className="flex flex-wrap gap-4">
              <Button href="#gallery" size="lg">
                View Work
              </Button>
              <Button href="#contact" variant="ghost" size="lg">
                Book Now
              </Button>
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp(0.18)}
            className="self-end justify-self-end rounded-[2rem] border border-white/10 bg-black/40 p-6 backdrop-blur-md md:max-w-sm"
          >
            <p className="eyebrow">Lead artist</p>
            <h2 className="mt-3 font-display text-5xl uppercase leading-none text-bone">
              Nitin Gautam
            </h2>
            <p className="mt-2 text-sm uppercase tracking-[0.22em] text-accentMuted">
              Expert Tattooist · Digital Artist
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6 text-sm text-muted">
              <div>
                <p className="font-display text-3xl uppercase text-bone">Location</p>
                <p className="mt-2">Hoshiarpur (PB)</p>
              </div>
              <div>
                <p className="font-display text-3xl uppercase text-bone">Focus</p>
                <p className="mt-2">Custom tattoos, privacy, hygiene</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 inline-flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-[0.65rem] uppercase tracking-[0.28em] text-muted backdrop-blur-md"
      >
        Scroll
        <ArrowDown className="h-3.5 w-3.5" />
      </motion.a>
    </section>
  );
}
