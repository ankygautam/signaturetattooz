import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeUp, viewport } from "@/lib/motion";

const aboutMain =
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80";
const aboutSide =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80";

export function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="section-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-5 sm:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp(0.05)}
            className="noise-mask relative overflow-hidden border border-white/10"
          >
            <img src={aboutMain} alt="Signature Tattooz interior" className="h-[38rem] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp(0.12)}
            className="flex flex-col gap-5"
          >
            <div className="border border-white/10 bg-white/[0.03] p-6">
              <p className="eyebrow">Location</p>
              <p className="mt-3 font-display text-5xl uppercase leading-none text-bone">
                Hoshiarpur
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.26em] text-accentMuted">Punjab</p>
            </div>
            <div className="noise-mask relative flex-1 overflow-hidden border border-white/10">
              <img src={aboutSide} alt="Nitin Gautam portrait" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>

        <div className="space-y-8">
          <SectionHeader
            eyebrow="About Signature Tattooz"
            title="A Better Rated Tattoo Shop With A More Personal Process."
            description="Signature Tattooz provides unique and custom work and is one of the best rated tattoo shops in Hoshiarpur (PB). The studio focuses on high quality service, custom artwork, collaboration, comfort, privacy, and a safe sanitary environment."
          />

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp(0.1)}
            className="serif-copy text-2xl leading-9 text-bone/85"
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

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Private & comfortable setup",
              "Custom artwork built with the client",
              "Safe and sanitary process",
              "Multiple tattoo genres with strong roots",
            ].map((item, index) => (
              <motion.div
                key={item}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                variants={fadeUp(0.08 + index * 0.04)}
                className="border border-white/10 bg-white/[0.03] p-5"
              >
                <p className="font-display text-4xl uppercase leading-none text-bone">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
