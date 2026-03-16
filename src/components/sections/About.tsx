import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeUp, viewport } from "@/lib/motion";

const aboutImage =
  "https://images.unsplash.com/photo-1517230878791-4d28214057c2?auto=format&fit=crop&w=1400&q=80";

export function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="space-y-7">
          <div className="space-y-4">
            <p className="eyebrow">About Signature Tattooz</p>
            <h2 className="font-display text-5xl uppercase leading-[0.88] tracking-[0.03em] text-bone sm:text-6xl">
              A Better Rated Tattoo Shop With A More Personal Process.
            </h2>
          </div>

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp(0.06)}
            className="max-w-xl text-sm leading-8 text-muted"
          >
            Signature Tattooz provides unique and custom work and is one of the best rated tattoo
            shops in Hoshiarpur (PB). The studio focuses on high quality service, custom artwork,
            collaboration, comfort, privacy, and a safe sanitary environment.
          </motion.p>

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp(0.1)}
            className="max-w-xl text-sm leading-8 text-muted"
          >
            Nitin Gautam leads the studio as an Expert Tattooist and Digital Artist, constantly
            evolving through new methods while staying grounded in traditional tattooing roots.
          </motion.p>

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp(0.15)}
            className="max-w-xl text-sm leading-8 text-muted"
          >
            The atmosphere is welcoming, the station is private and comfortable, and each tattoo is
            shaped through conversation so the final work feels original rather than repeated. From
            concept to execution, the studio is built around trust, clarity, and clean standards.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={fadeUp(0.08)}
          className="noise-mask relative overflow-hidden border border-white/10"
        >
          <img
            src={aboutImage}
            alt="Tattoo artwork detail"
            className="h-[38rem] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
