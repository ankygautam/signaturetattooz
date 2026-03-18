import { motion } from "framer-motion";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { Tag } from "../ui/Tag";
import { fadeUp, viewport } from "@/lib/motion";

const testimonials = [
  {
    quote:
      "Every detail felt considered, from the private suite to the final placement review. The finished piece looks like it was always meant to live there.",
    name: "Collector Session I",
    designation: "Fine line botanical",
    src: "https://images.unsplash.com/photo-1601121141529-7857c6624f95?auto=format&fit=crop&w=1400&q=80",
  },
  {
    quote:
      "The studio feels quiet and intentional. The design process was collaborative, and the blackwork healed with crisp edges and exactly the contrast I wanted.",
    name: "Collector Session II",
    designation: "Geometric blackwork",
    src: "https://images.unsplash.com/photo-1517230878791-4d28214057c2?auto=format&fit=crop&w=1400&q=80",
  },
  {
    quote:
      "I came in with references and left with something far more refined. The color balance, composition, and aftercare guidance were all exceptional.",
    name: "Collector Session III",
    designation: "Illustrative color",
    src: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1400&q=80",
  },
  {
    quote:
      "The session had the same polish as a luxury fitting. Calm pacing, meticulous hygiene, and a final tattoo that feels elegant from every angle.",
    name: "Collector Session IV",
    designation: "Minimal single needle",
    src: "https://images.unsplash.com/photo-1604709177225-055f99402ea3?auto=format&fit=crop&w=1400&q=80",
  },
];

export function GalleryTestimonials() {
  return (
    <section id="gallery" className="relative overflow-hidden bg-surface py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/8 via-transparent to-accentMuted/8" />
      <div className="section-shell relative space-y-10">
        <motion.div
          variants={fadeUp(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="max-w-2xl space-y-4"
        >
          <Tag tone="accent">Gallery spotlight</Tag>
          <h2 className="font-display text-3xl text-bone md:text-4xl">
            Signature pieces, told through a more intimate lens.
          </h2>
          <p className="text-muted">
            This carousel turns the gallery into a slower editorial moment, pairing collector notes
            with studio imagery and helping the work breathe between sections.
          </p>
        </motion.div>

        <div className="glass rounded-[2rem] border border-white/8">
          <AnimatedTestimonials testimonials={testimonials} autoplay />
        </div>
      </div>
    </section>
  );
}
