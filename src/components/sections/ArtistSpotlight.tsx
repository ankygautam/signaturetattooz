import { motion } from "framer-motion";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { SiteVisuals } from "@/admin/types/content";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { defaultSiteVisuals } from "@/data/cms-defaults";
import { usePublicSingletonDocument } from "@/firebase/public-content";
import { fadeUp, viewport } from "@/lib/motion";

export function ArtistSpotlight() {
  const visuals = usePublicSingletonDocument<SiteVisuals>(
    "cms",
    "siteVisuals",
    defaultSiteVisuals,
  );

  return (
    <section id="artist" className="section-surface surface-linen relative py-24">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <motion.div
          variants={fadeUp(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="theme-image-frame relative overflow-hidden rounded-[2rem] border"
        >
          <img src={visuals.artistImage} alt="Nitin Gautam" className="h-[38rem] w-full object-cover" />
          <div className="theme-image-overlay-soft absolute inset-0" />
        </motion.div>

        <div className="space-y-8">
          <SectionHeader
            eyebrow="Artist spotlight"
            title="Nitin Gautam"
            description="Expert Tattooist and Digital Artist. Nitin leads Signature Tattooz with a mindset shaped by custom artwork, evolving technique, and deep appreciation for tattoo artistry in all its forms."
          />

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp(0.1)}
            className="section-copy"
          >
            His work moves across multiple tattoo genres while staying grounded in traditional
            tattooing roots. Every project is approached through conversation, design studies, and
            careful adaptation so the final tattoo feels clean, expressive, and built for the body.
          </motion.p>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              "Custom-first design approach",
              "Digital art concept strength",
              "Constantly learning new methods",
            ].map((item) => (
              <div key={item} className="panel p-5 text-sm leading-7 text-muted">
                <p className="card-title text-3xl sm:text-4xl">{item}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button href="#contact">Book With Nitin</Button>
            <a
              href="https://www.instagram.com/signaturetattooz"
              target="_blank"
              rel="noreferrer"
              className="theme-icon-link inline-flex h-11 w-11 items-center justify-center rounded-full border transition"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://www.facebook.com/nitinsignaturetattooz/"
              target="_blank"
              rel="noreferrer"
              className="theme-icon-link inline-flex h-11 w-11 items-center justify-center rounded-full border transition"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://www.youtube.com/@signaturetattooz"
              target="_blank"
              rel="noreferrer"
              className="theme-icon-link inline-flex h-11 w-11 items-center justify-center rounded-full border transition"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
