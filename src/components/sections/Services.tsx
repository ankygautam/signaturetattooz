import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { services } from "@/data/site-content";
import { revealCard, stagger, viewport } from "@/lib/motion";

const serviceImage =
  "https://images.unsplash.com/photo-1542727365-19732a80dcfd?auto=format&fit=crop&w=1200&q=80";

export function Services() {
  return (
    <section id="services" className="relative py-24">
      <div className="section-shell space-y-12">
        <SectionHeader
          eyebrow="Services"
          title="Everything Starts With The Idea, Then The Process."
          description="The service structure is designed like a real tattoo shop workflow: concept, planning, execution, cover-ups, and digital concept support."
        />

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                variants={revealCard}
                className="group panel min-h-[16rem] p-6 transition duration-300 hover:-translate-y-1 hover:border-accentMuted/50 hover:bg-white/[0.045]"
              >
                <p className="text-[0.65rem] uppercase tracking-[0.34em] text-muted">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-8 font-display text-5xl uppercase leading-none text-bone">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted">{service.description}</p>
                <div className="mt-8 h-px w-full bg-gradient-to-r from-accentMuted/70 to-transparent transition duration-300 group-hover:from-accent" />
              </motion.article>
            ))}
          </div>

          <motion.div variants={revealCard} className="panel overflow-hidden p-4">
            <div className="relative h-full min-h-[34rem] overflow-hidden rounded-[1.6rem] border border-white/8">
              <img src={serviceImage} alt="Tattoo session" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="eyebrow">Studio process</p>
                <h3 className="mt-3 font-display text-6xl uppercase leading-none text-bone">
                  Thoughtful
                  <br />
                  Execution
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-7 text-muted">
                  Consultation, design collaboration, clean setup, and a calm one-on-one session
                  all built into the experience.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
