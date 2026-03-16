import { motion } from "framer-motion";
import { MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeUp, viewport } from "@/lib/motion";

const aboutImage =
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80";

export function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={fadeUp(0.08)}
          className="relative overflow-hidden rounded-[2rem] border border-white/8 shadow-card"
        >
          <img src={aboutImage} alt="Signature Tattooz studio" className="h-[36rem] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="eyebrow">Studio mood</p>
            <p className="mt-2 max-w-sm text-sm leading-7 text-bone/85">
              A welcoming atmosphere with privacy, calm pacing, and the discipline of a safe,
              sanitary setup.
            </p>
          </div>
        </motion.div>

        <div className="space-y-8">
          <SectionHeader
            eyebrow="About Signature Tattooz"
            title="Custom work rooted in craft, comfort, and evolving artistry."
            description="Signature Tattooz provides unique and custom work and is one of the best rated tattoo shops in Hoshiarpur (PB). Led by Nitin Gautam, the studio combines traditional tattooing roots with a constant drive to learn, refine, and appreciate the art form at a higher level."
          />

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp(0.1)}
            className="max-w-2xl text-sm leading-8 text-muted"
          >
            The experience is built around high quality service, client collaboration, private
            comfort, and a safe and sanitary environment. Every session is approached with care so
            the final design feels personal, wearable, and original to the person carrying it.
          </motion.p>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: MapPin,
                title: "Hoshiarpur (PB)",
                text: "A focused private station built for one-on-one work.",
              },
              {
                icon: ShieldCheck,
                title: "Safe & sanitary",
                text: "Clean process standards with comfort and trust at the center.",
              },
              {
                icon: Sparkles,
                title: "Nitin Gautam",
                text: "Expert Tattooist and Digital Artist shaping each concept carefully.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                variants={fadeUp(0.12)}
                className="panel p-5"
              >
                <item.icon className="h-5 w-5 text-accentMuted" />
                <h3 className="mt-4 font-display text-3xl leading-none text-bone">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
