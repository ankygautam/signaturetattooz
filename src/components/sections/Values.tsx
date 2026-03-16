import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { values } from "@/data/site-content";
import { revealCard, stagger, viewport } from "@/lib/motion";

export function Values() {
  return (
    <section className="relative py-24">
      <div className="section-shell space-y-12">
        <SectionHeader
          eyebrow="Why choose us"
          title="A serious tattoo brand is built on more than visuals."
          description="These are the standards behind the studio experience, from the first consultation to the healed result."
          align="center"
        />

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-5"
        >
          {values.map((value, index) => (
            <motion.article key={value.title} variants={revealCard} className="panel p-6">
              <p className="text-[0.65rem] uppercase tracking-[0.34em] text-accentMuted">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-8 font-display text-4xl leading-none text-bone">{value.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted">{value.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
