import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { fadeUp, viewport } from "@/lib/motion";

const bannerImage =
  "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1800&q=80";

export function BookingCTA() {
  return (
    <section className="relative py-24">
      <div className="section-shell">
        <motion.div
          variants={fadeUp(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/10"
        >
          <img src={bannerImage} alt="Tattoo booking banner" className="h-[28rem] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/70" />
          <div className="absolute inset-0 flex items-center">
            <div className="section-shell w-full">
              <div className="max-w-2xl space-y-6">
                <p className="eyebrow">Booking CTA</p>
                <h2 className="font-display text-5xl leading-none text-bone sm:text-6xl">
                  Ready to start your next piece?
                </h2>
                <p className="max-w-xl text-sm leading-8 text-muted">
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
