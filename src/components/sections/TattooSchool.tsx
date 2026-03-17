import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { fadeUp, revealCard, stagger, viewport } from "@/lib/motion";

const schoolLeadImage =
  "https://images.unsplash.com/photo-1542727365-19732a80dcfd?auto=format&fit=crop&w=1400&q=80";

const studentShots = [
  {
    title: "Apprentice Practice",
    image:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Studio Observation",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Creative Discipline",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
  },
];

const modules = [
  {
    title: "Shading Control",
    description:
      "Learn depth, tone building, hand speed, and how smooth transitions are created without muddying the piece.",
  },
  {
    title: "Portrait Realism",
    description:
      "Understand facial structure, values, reference breakdown, and how realism tattoos hold clarity on skin.",
  },
  {
    title: "Line & Needle Discipline",
    description:
      "Build confidence with line consistency, stretch, hand angle, and machine movement for cleaner execution.",
  },
  {
    title: "Stencil Placement",
    description:
      "Train your eye to place designs with body flow, balance, readability, and long-term composition in mind.",
  },
  {
    title: "Machine Knowledge",
    description:
      "Work through setup, voltage feel, machine behavior, cartridge understanding, and basic troubleshooting.",
  },
  {
    title: "Professional Practice",
    description:
      "Focus on hygiene, safe workflow, skin handling, client communication, and the discipline required inside a studio.",
  },
];

export function TattooSchool() {
  return (
    <section id="tattoo-school" className="relative py-24">
      <div className="section-shell space-y-12">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
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

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={fadeUp(0.16)}
              className="border border-white/10 bg-white/[0.03] p-5"
            >
              <p className="eyebrow">Training focus</p>
              <p className="mt-3 max-w-2xl text-sm leading-8 text-muted">
                Students are trained through observation, guided practice, design correction,
                technical breakdowns, and repeat discipline. The goal is to help you understand not
                only what to do, but why it matters inside a real studio workflow.
              </p>
            </motion.div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={fadeUp(0.1)}
              className="noise-mask relative overflow-hidden border border-white/10 sm:col-span-2"
            >
              <img
                src={schoolLeadImage}
                alt="Tattoo machine and studio practice"
                className="h-[26rem] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
            </motion.div>

            {studentShots.map((student, index) => (
              <motion.div
                key={student.title}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                variants={fadeUp(0.14 + index * 0.04)}
                className="noise-mask relative overflow-hidden border border-white/10"
              >
                <img
                  src={student.image}
                  alt={student.title}
                  className="h-[18rem] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-display text-3xl uppercase leading-none text-bone">
                    {student.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="max-w-3xl">
            <p className="eyebrow">Technique modules</p>
            <h3 className="mt-4 font-display text-5xl uppercase leading-[0.88] text-bone sm:text-6xl">
              More Detail. More Technique. More Real Studio Knowledge.
            </h3>
          </div>

          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {modules.map((module) => (
              <motion.article key={module.title} variants={revealCard} className="panel p-6">
                <h4 className="font-display text-4xl uppercase leading-none text-bone">
                  {module.title}
                </h4>
                <p className="mt-4 text-sm leading-7 text-muted">{module.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
