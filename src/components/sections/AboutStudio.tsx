import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { Tag } from "../ui/Tag";

const studioImage =
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1800&q=80&sat=-25";

export function AboutStudio() {
  return (
    <section id="studio" className="relative overflow-hidden bg-surface py-24">
      <div className="section-shell grid gap-10 md:grid-cols-2 md:items-center">
        <motion.div
          className="space-y-6"
          variants={stagger(0.14)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <Tag tone="muted">About the studio</Tag>
          <motion.h2
            variants={fadeUp(0.05)}
            className="font-display text-3xl text-bone md:text-4xl"
          >
            A private atelier for custom tattoo narratives.
          </motion.h2>
          <motion.p variants={fadeUp(0.12)} className="text-lg text-muted">
            SignatureTattooz crafts bespoke pieces through collaborative design rituals, museum-grade
            hygiene, and a hospitality-forward experience that keeps focus on the artist and the guest.
          </motion.p>
          <motion.div
            variants={fadeUp(0.18)}
            className="grid grid-cols-1 gap-4 text-sm text-muted sm:grid-cols-2"
          >
            <div className="glass rounded-2xl border border-stroke p-4">
              <p className="text-bone">Artistry</p>
              <p className="mt-2">Concept sketching, anatomical placement, and couture-level line work.</p>
            </div>
            <div className="glass rounded-2xl border border-stroke p-4">
              <p className="text-bone">Hygiene</p>
              <p className="mt-2">Single-use needles, MEDICOM barriers, HEPA-filtered airflow, daily logs.</p>
            </div>
            <div className="glass rounded-2xl border border-stroke p-4">
              <p className="text-bone">Custom design</p>
              <p className="mt-2">Body-mapped mockups, fine-line detailing, and bespoke color palettes.</p>
            </div>
            <div className="glass rounded-2xl border border-stroke p-4">
              <p className="text-bone">Guest experience</p>
              <p className="mt-2">Private suites, curated playlists, aftercare concierge, and calm pacing.</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="relative overflow-hidden rounded-3xl border border-stroke shadow-card"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-accent/10" />
          <img
            src={studioImage}
            alt="SignatureTattooz studio interior"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}
