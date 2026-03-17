import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeUp, viewport } from "@/lib/motion";

const schoolImage =
  "https://images.unsplash.com/photo-1542727365-19732a80dcfd?auto=format&fit=crop&w=1400&q=80";

export function TattooSchool() {
  return (
    <section id="tattoo-school" className="relative py-24">
      <div className="section-shell grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-7">
          <SectionHeader
            eyebrow="Tattoo School"
            title="Learn The Art. Build The Discipline. Create With Confidence."
            description="At Signature Tattooz, Tattoo School is built for aspiring artists who want more than just theory. We focus on the real foundation of tattooing — hygiene, machine knowledge, skin understanding, design flow, stencil placement, needle control, and professional studio practice."
          />

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp(0.08)}
            className="max-w-xl text-sm leading-8 text-muted"
          >
            Whether you are just starting out or looking to sharpen your skills, our training is
            designed to help you grow with proper guidance in a creative studio environment. You
            will learn the mindset, patience, and technical precision it takes to become a
            confident tattoo artist.
          </motion.p>

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp(0.12)}
            className="max-w-xl text-sm leading-8 text-muted"
          >
            This is not just about making tattoos look good. It is about learning how to work
            safely, professionally, and with purpose.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={fadeUp(0.1)}
          className="noise-mask relative overflow-hidden border border-white/10"
        >
          <img
            src={schoolImage}
            alt="Tattoo machine and studio practice"
            className="h-[38rem] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="eyebrow">Training focus</p>
            <p className="mt-3 max-w-sm text-sm leading-7 text-bone/85">
              Hygiene, machines, stencil placement, skin understanding, needle control, and
              professional studio discipline.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
