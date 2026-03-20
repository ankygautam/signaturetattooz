import { motion } from "framer-motion";
import { SiteVisuals } from "@/admin/types/content";
import { defaultSiteVisuals } from "@/data/cms-defaults";
import { usePublicSingletonDocument } from "@/firebase/public-content";
import { fadeUp, viewport } from "@/lib/motion";

export function About() {
  const visuals = usePublicSingletonDocument<SiteVisuals>(
    "cms",
    "siteVisuals",
    defaultSiteVisuals,
  );

  return (
    <section id="about" className="section-surface surface-ivory relative py-24">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="space-y-7">
          <div className="space-y-4">
            <p className="eyebrow">About Signature Tattooz</p>
            <h2 className="section-title">
              A Better Rated Tattoo Shop With A More Personal Process.
            </h2>
          </div>

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp(0.06)}
            className="section-copy max-w-xl"
          >
            Signature Tattooz provides unique and custom work and is one of the best rated tattoo
            shops in Hoshiarpur (PB). The studio focuses on high quality service, custom artwork,
            collaboration, comfort, privacy, and a safe sanitary environment.
          </motion.p>

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp(0.1)}
            className="section-copy max-w-xl"
          >
            Nitin Gautam leads the studio as an Expert Tattooist and Digital Artist, constantly
            evolving through new methods while staying grounded in traditional tattooing roots.
          </motion.p>

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp(0.15)}
            className="section-copy max-w-xl"
          >
            The atmosphere is welcoming, the station is private and comfortable, and each tattoo is
            shaped through conversation so the final work feels original rather than repeated. From
            concept to execution, the studio is built around trust, clarity, and clean standards.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={fadeUp(0.08)}
          className="theme-image-frame noise-mask relative overflow-hidden rounded-[2rem] border"
        >
          <img
            src={visuals.aboutImage}
            alt="Tattoo artwork detail"
            className="h-[38rem] w-full object-cover"
          />
          <div className="theme-image-overlay absolute inset-0" />
        </motion.div>
      </div>
    </section>
  );
}
