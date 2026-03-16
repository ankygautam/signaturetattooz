import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { Tag } from "../ui/Tag";
import { fadeUp, stagger, viewport } from "@/lib/motion";

export function Booking() {
  return (
    <section id="booking" className="relative overflow-hidden bg-surface py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-accentMuted/10" />
      <div className="section-shell relative grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="space-y-6"
        >
          <Tag tone="accent">Booking</Tag>
          <motion.h3
            variants={fadeUp(0.05)}
            className="font-display text-3xl text-bone md:text-4xl"
          >
            Ready for a bespoke piece?
          </motion.h3>
          <motion.p variants={fadeUp(0.1)} className="text-lg text-muted">
            We operate by-application to ensure every session is intentional. Share your concept,
            placement, sizing, and preferred artist to receive a curated consultation within 24 hours.
          </motion.p>
          <motion.div variants={fadeUp(0.15)} className="flex flex-wrap gap-4">
            <Button onClick={() => window.open("mailto:hello@signaturetattooz.com?subject=Booking%20Consultation", "_blank")}>
              Email the studio
            </Button>
            <Button variant="ghost" onClick={() => window.open("https://cal.com", "_blank")}>
              Schedule consult call
            </Button>
          </motion.div>
          <motion.div
            variants={fadeUp(0.2)}
            className="grid gap-4 rounded-2xl border border-stroke bg-black/50 p-5 text-sm text-muted md:grid-cols-2"
          >
            <div>
              <p className="text-bone">What to include</p>
              <ul className="mt-2 space-y-2">
                <li>• Concept & references</li>
                <li>• Size and placement</li>
                <li>• Preferred artist</li>
                <li>• Ideal dates</li>
              </ul>
            </div>
            <div>
              <p className="text-bone">Studio hours</p>
              <p className="mt-2">Tuesday – Sunday · 11:00 – 19:00</p>
              <p className="mt-1">Downtown Edmonton · Private suites</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp(0.2)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="glass rounded-3xl border border-stroke p-6 shadow-glow"
        >
          <div className="flex items-center justify-between border-b border-stroke pb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Concierge</p>
              <p className="text-lg text-bone">Same-day response</p>
            </div>
            <span className="rounded-full bg-accent/80 px-3 py-1 text-xs uppercase tracking-wide text-bone">
              Priority
            </span>
          </div>
          <div className="space-y-4 pt-4 text-muted">
            <p>We accept a limited number of projects each month to protect quality and healing timeframes.</p>
            <p className="text-bone">
              Deposit: <span className="text-accent">$250</span> applied to final session.
            </p>
            <p>Payment methods: Credit, debit, Interac e-Transfer. Complimentary aftercare kit included.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
