import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { values } from "@/data/site-content";
import { revealCard, stagger, viewport } from "@/lib/motion";

export function Values() {
  return (
    <section id="why-us" className="section-surface surface-clay relative py-24">
      <div className="section-shell space-y-12">
        <SectionHeader
          eyebrow="Why choose us"
          title="The Shop Standard Behind The Work."
          description="These points are the backbone of the studio, similar to the reference's punchier value blocks and bold service messaging."
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
              <p className="meta-label text-accentMuted">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="card-title mt-8">
                {value.title}
              </h3>
              <p className="section-copy mt-4 text-sm">{value.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
