import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { Tag } from "../ui/Tag";
import { fadeUp, stagger } from "@/lib/motion";

const heroImage =
  "https://images.unsplash.com/photo-1604709177225-055f99402ea3?auto=format&fit=crop&w=2000&q=80&sat=-25&blur=0";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-black"
      aria-labelledby="hero-title"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(120deg, rgba(5,5,5,0.82) 25%, rgba(9,9,9,0.75) 60%, rgba(5,5,5,0.9)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-background" />
      <div className="absolute inset-0 grid-overlay opacity-50" />

      <div className="section-shell relative flex flex-col gap-10 py-28 md:py-32 lg:py-36">
        <motion.div
          variants={fadeUp(0.08)}
          initial="hidden"
          animate="show"
          className="w-fit"
        >
          <Tag tone="accent">SignatureTattooz · Private Studio</Tag>
        </motion.div>

        <motion.div
          variants={stagger(0.18)}
          initial="hidden"
          animate="show"
          className="max-w-3xl space-y-6"
        >
          <motion.h1
            id="hero-title"
            variants={fadeUp(0.12)}
            className="font-display text-4xl leading-[1.05] text-bone sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Bespoke tattoos with the restraint and rigor of a luxury atelier.
          </motion.h1>
          <motion.p
            variants={fadeUp(0.2)}
            className="max-w-2xl text-lg text-muted md:text-xl"
          >
            A cinematic, artist-led experience—from concept ritual to healed finish. Discreet suites,
            meticulous hygiene, and pieces tailored to the contours of your story.
          </motion.p>
          <motion.div variants={fadeUp(0.28)} className="flex flex-wrap items-center gap-4">
            <Button
              onClick={() =>
                document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Gallery
            </Button>
            <Button
              variant="ghost"
              onClick={() =>
                document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Book Consultation
            </Button>
            <span className="text-xs uppercase tracking-[0.18em] text-muted">
              Edmonton · Appointment only
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
