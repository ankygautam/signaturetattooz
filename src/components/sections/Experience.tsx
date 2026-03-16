import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { Tag } from "../ui/Tag";

const pillars = [
  {
    title: "Private suites",
    description:
      "Sound-insulated rooms with custom scent profile, curated playlists, and ergonomic chairs for long sessions.",
  },
  {
    title: "Sterile protocols",
    description:
      "Hospital-grade sterilization, single-use needles, MEDICOM barriers, and HEPA-filtered airflow monitored daily.",
  },
  {
    title: "Design ritual",
    description:
      "Collaborative sketch reviews, digital mockups on body reference, and precision stenciling for perfect placement.",
  },
  {
    title: "Aftercare concierge",
    description:
      "Tailored aftercare kit, day-3 check-in, and healed review with complimentary micro-refinement if needed.",
  },
];

export function Experience() {
  return (
    <section id="studio" className="relative bg-background py-24">
      <div className="section-shell space-y-12">
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-4">
            <Tag tone="muted">The experience</Tag>
            <h2 className="font-display text-3xl text-bone md:text-4xl">Artist-centered hospitality</h2>
            <p className="max-w-2xl text-muted">
              The studio is built like a luxury atelier—quietly confident, meticulously clean, and obsessively comfortable.
            </p>
          </div>
          <div className="hidden h-16 w-16 rounded-full border border-accent/30 bg-gradient-to-br from-accent/50 to-accentMuted/70 shadow-glow md:block" />
        </div>

        <motion.div
          className="grid gap-6 md:grid-cols-2"
          variants={stagger(0.16)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              variants={fadeUp(index * 0.05)}
              className="glass relative overflow-hidden rounded-3xl p-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/4 via-transparent to-accent/5" />
              <div className="relative flex flex-col gap-3">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted">
                  <span className="h-8 w-8 rounded-full border border-accent/30 bg-black/40 text-center leading-8 text-bone">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  {pillar.title}
                </div>
                <p className="text-bone/90">{pillar.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
