import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import { fadeUp, revealCard, stagger, viewport } from "@/lib/motion";
import { Tag } from "../ui/Tag";

export function Portfolio() {
  return (
    <section id="portfolio" className="relative bg-background py-24">
      <div className="section-shell space-y-12">
        <div className="flex items-center justify-between gap-6">
          <div className="space-y-4">
            <Tag tone="muted">Signature work</Tag>
            <h2 className="font-display text-3xl text-bone md:text-4xl">Curated portfolio</h2>
            <p className="max-w-xl text-muted">
              Editorial storytelling through fine line, ornamental blackwork, surreal black & grey, and painterly color.
            </p>
          </div>
          <motion.div
            className="hidden rounded-full border border-stroke px-4 py-3 text-sm text-muted md:inline-flex"
            variants={fadeUp(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            Private sessions · Single-artist focus · Healed-aftercare support
          </motion.div>
        </div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {portfolio.map((piece, index) => (
            <motion.article
              key={piece.title}
              variants={revealCard}
              className="group relative overflow-hidden rounded-3xl border border-stroke bg-surface/80 shadow-card"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={piece.image}
                  alt={piece.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs uppercase tracking-wide text-bone/80">
                  {piece.style}
                </div>
              </div>
              <div className="flex flex-col gap-3 p-5">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted">
                  <span>{piece.artist}</span>
                  <span className="h-1 w-1 rounded-full bg-accent/60" />
                  <span>{`No.${(index + 1).toString().padStart(2, "0")}`}</span>
                </div>
                <h3 className="font-display text-xl text-bone">{piece.title}</h3>
                <p className="text-sm text-muted">{piece.description}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
