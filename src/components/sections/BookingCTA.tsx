import { motion } from "framer-motion";
import { SiteVisuals } from "@/admin/types/content";
import { Button } from "@/components/ui/Button";
import { defaultSiteVisuals } from "@/data/cms-defaults";
import { usePublicSingletonDocument } from "@/firebase/public-content";
import { fadeUp, viewport } from "@/lib/motion";

export function BookingCTA() {
  const visuals = usePublicSingletonDocument<SiteVisuals>(
    "cms",
    "siteVisuals",
    defaultSiteVisuals,
  );

  return (
    <section className="section-surface surface-mocha relative py-24">
      <div className="section-shell">
        <motion.div
          variants={fadeUp(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/10"
        >
          <img
            src={visuals.bookingBannerImage}
            alt="Tattoo booking banner"
            className="h-[28rem] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/70" />
          <div className="absolute inset-0 flex items-center">
            <div className="section-shell w-full">
              <div className="max-w-2xl space-y-6">
                <p className="eyebrow">Booking CTA</p>
                <h2 className="section-title leading-none">
                  Ready to start your next piece?
                </h2>
                <p className="section-copy max-w-xl">
                  Bring the idea, reference, or mood. Signature Tattooz will shape it into a custom
                  concept with detail, comfort, and a process you can trust.
                </p>
                <Button href="#contact" size="lg">
                  Book Your Tattoo
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
