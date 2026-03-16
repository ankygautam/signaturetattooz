import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { services } from "@/data/site-content";
import { revealCard, stagger, viewport } from "@/lib/motion";

export function Services() {
  return (
    <section id="services" className="relative py-24">
      <div className="section-shell space-y-12">
        <SectionHeader
          eyebrow="Services"
          title="A premium process around original tattoo work."
          description="Each service is designed to support better ideas, smoother sessions, and a stronger final piece. The goal is not speed, but thoughtful execution."
          align="center"
        />

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-5"
        >
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              variants={revealCard}
              className="group panel min-h-[17rem] p-6 transition duration-300 hover:-translate-y-1 hover:border-accentMuted/50 hover:bg-white/[0.045]"
            >
              <p className="text-[0.65rem] uppercase tracking-[0.34em] text-muted">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-10 font-display text-4xl leading-none text-bone">{service.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted">{service.description}</p>
              <div className="mt-8 h-px w-full bg-gradient-to-r from-accentMuted/70 to-transparent transition duration-300 group-hover:from-accent" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
