import { motion } from "framer-motion";
import { artists } from "@/data/artists";
import { fadeUp, revealCard, stagger, viewport } from "@/lib/motion";
import { Tag } from "../ui/Tag";
import { Button } from "../ui/Button";

export function Artists() {
  return (
    <section id="artists" className="relative bg-background py-24">
      <div className="section-shell space-y-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4">
            <Tag tone="muted">Meet the artists</Tag>
            <h2 className="font-display text-3xl text-bone md:text-4xl">Editorial-grade profiles</h2>
            <p className="max-w-2xl text-muted">
              Artist-forward presentation with dedicated suites, refined palettes, and bespoke compositions for every guest story.
            </p>
          </div>
          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="flex items-center gap-4 rounded-full border border-stroke/80 px-4 py-3 text-sm text-muted"
          >
            <span className="h-2 w-2 rounded-full bg-accent" />
            By-application only · Limited monthly bookings
          </motion.div>
        </div>

        <motion.div
          className="grid gap-7 md:grid-cols-2 xl:grid-cols-3"
          variants={stagger(0.14)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {artists.map((artist) => (
            <motion.article
              key={artist.name}
              variants={revealCard}
              className="group relative overflow-hidden rounded-3xl border border-stroke/80 bg-surface shadow-card transition hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={artist.image}
                  alt={artist.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs uppercase tracking-wide text-bone/80">
                  {artist.title}
                </span>
              </div>
              <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted">
                  <span className="text-bone">{artist.name}</span>
                  <span className="rounded-full bg-accent/80 px-3 py-1 text-[10px] text-bone/90">
                    {artist.years} yrs
                  </span>
                </div>
                <p className="text-sm text-muted">{artist.bio}</p>
                <div className="flex flex-wrap gap-2 text-xs text-bone">
                  {artist.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="rounded-full border border-stroke bg-white/5 px-3 py-1 text-muted transition group-hover:border-accent/70 group-hover:text-bone"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <a
                    href={artist.instagram}
                    className="text-sm text-accent transition hover:text-accentMuted"
                    target="_blank"
                    rel="noreferrer"
                  >
                    @ {artist.instagram.split("https://instagram.com/")[1]}
                  </a>
                  <Button
                    variant="ghost"
                    className="text-xs uppercase tracking-[0.16em]"
                    onClick={() => artist.portfolioUrl && document.querySelector(artist.portfolioUrl)?.scrollIntoView({ behavior: "smooth" })}
                  >
                    View Portfolio
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
