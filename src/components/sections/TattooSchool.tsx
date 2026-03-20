import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { submitPublicInquiry } from "@/firebase/submissions";
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
      "Focus on hygiene, safe workflow, skin handling, guest communication, and the discipline required inside a studio.",
  },
];

const learningJourneyStages = [
  {
    stage: "Stage 01",
    photoLabel: "Student archive",
    heading: "Stencil Preparation & Placement",
    image:
      "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=1200&q=80",
    text:
      "Students begin by learning how to prepare, position, and apply stencils with accuracy and intention. This stage helps them understand body flow, placement, symmetry, and how a design should sit naturally on the skin before tattooing begins.",
  },
  {
    stage: "Stage 02",
    photoLabel: "Practice session",
    heading: "Technique Development on Practice Skin",
    image:
      "https://images.unsplash.com/photo-1542727365-19732a80dcfd?auto=format&fit=crop&w=1400&q=80",
    text:
      "Before moving into live tattoo work, students build their technical foundation on practice skin. This is where they develop line control, shading consistency, saturation, hand stability, and the confidence needed to strengthen their tattooing technique.",
  },
  {
    stage: "Stage 03",
    photoLabel: "Live learning",
    heading: "Real Tattoo Application",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
    text:
      "As students progress, they begin applying their knowledge in real tattooing environments under guidance and professional standards. This stage reflects the transition from training to practical execution, where design, technique, hygiene, and client awareness come together.",
  },
] as const;

export function TattooSchool() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    experienceLevel: "",
    learningGoal: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setSuccess(null);
    setError(null);

    try {
      await submitPublicInquiry({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        placement: "Tattoo School",
        tattooIdea: form.learningGoal.trim(),
        budget: form.experienceLevel.trim(),
        message: form.message.trim(),
      });

      setSuccess("Your tattoo school enquiry has been sent. We will reach out to you soon.");
      setForm({
        name: "",
        email: "",
        phone: "",
        experienceLevel: "",
        learningGoal: "",
        message: "",
      });
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Something went wrong while sending your enquiry. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="tattoo-school" className="section-surface surface-sand relative py-20 sm:py-24">
      <div className="section-shell space-y-10 sm:space-y-12">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
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
              className="section-copy max-w-xl"
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
              className="section-copy max-w-xl"
            >
              This is not just about making tattoos look good. It is about learning how to work
              safely, professionally, and with purpose.
            </motion.p>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={fadeUp(0.16)}
              className="theme-paper-panel border p-4 sm:p-5"
            >
              <p className="eyebrow">Training focus</p>
              <p className="section-copy mt-3 max-w-2xl">
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
                className="h-[18rem] w-full object-cover sm:h-[26rem]"
              />
              <div className="theme-image-overlay absolute inset-0" />
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
                  className="h-[14rem] w-full object-cover sm:h-[18rem]"
                />
                <div className="theme-image-overlay-soft absolute inset-0" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-display text-3xl uppercase leading-none text-bone">
                    {student.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

          <div className="space-y-8 sm:space-y-10">
          <SectionHeader
            eyebrow="Learning journey"
            title="From Stencil to Skin"
            description="See how our students build confidence, technique, and real tattoo experience through every stage of the learning process."
            align="center"
          />

          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="grid gap-5 sm:gap-6 xl:grid-cols-3"
          >
            {learningJourneyStages.map((stage) => (
              <motion.article
                key={stage.heading}
                variants={revealCard}
                className="theme-paper-panel group overflow-hidden rounded-[2rem] border transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(21,16,12,0.14)]"
              >
                <div className="relative h-[16rem] overflow-hidden sm:h-[21rem]">
                  <img
                    src={stage.image}
                    alt={stage.heading}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="theme-image-overlay-soft absolute inset-0" />
                  <div className="absolute left-5 top-5 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-white/88 backdrop-blur-sm">
                      {stage.stage}
                    </span>
                    <span className="rounded-full border border-white/12 bg-white/10 px-3 py-1 text-[0.58rem] uppercase tracking-[0.22em] text-white/78 backdrop-blur-sm">
                      {stage.photoLabel}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 p-5 sm:p-7">
                  <h3 className="theme-light-ink font-display text-[2.35rem] uppercase leading-[0.92] sm:text-[2.65rem]">
                    {stage.heading}
                  </h3>
                  <p className="theme-light-muted text-sm leading-7">
                    {stage.text}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp(0.1)}
            className="theme-paper-panel mx-auto max-w-5xl rounded-[2rem] border px-5 py-6 text-center sm:px-10 sm:py-7"
          >
            <p className="theme-light-muted text-sm leading-8 sm:text-[0.98rem]">
              Every stage of training matters. From stencil work to practice skin and live
              tattooing, our students are guided through a structured learning process designed to
              build confidence, discipline, and real-world tattoo experience.
            </p>
          </motion.div>
        </div>

        <div className="space-y-6">
          <div className="max-w-3xl">
            <p className="eyebrow">Technique modules</p>
            <h3 className="theme-light-ink mt-4 font-display text-4xl uppercase leading-[0.9] sm:text-6xl">
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
                <h4 className="theme-light-ink font-display text-3xl uppercase leading-none sm:text-4xl">
                  {module.title}
                </h4>
                <p className="theme-light-muted mt-4 text-sm leading-7">{module.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>

          <div id="school-enquiry" className="space-y-8 sm:space-y-10">
          <SectionHeader
            eyebrow="Enquiry"
            title="Ask About Tattoo School"
            description="If you want to learn in a real studio environment, send us your details and we will guide you through the training path, schedule, and next steps."
            align="center"
          />

          <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={fadeUp(0.06)}
              className="theme-paper-panel flex h-full flex-col justify-between rounded-[2rem] border p-5 sm:p-8"
            >
              <div className="space-y-6">
                <div>
                  <p className="eyebrow">Premium mentorship</p>
                  <h3 className="theme-light-ink mt-4 font-display text-4xl uppercase leading-[0.92] sm:text-6xl">
                    Learn with structure, discipline, and studio guidance.
                  </h3>
                </div>

                <p className="theme-light-muted max-w-xl text-sm leading-8">
                  This enquiry is for aspiring tattoo artists who want serious training. Share your
                  current level, what you want to improve, and we will help you understand whether
                  the program is the right fit.
                </p>

                <div className="grid gap-4">
                  {[
                    {
                      icon: Phone,
                      label: "Call",
                      value: "+91 98782 28917",
                      href: "tel:+919878228917",
                    },
                    {
                      icon: Mail,
                      label: "Email",
                      value: "signaturetattooz@gmail.com",
                      href: "mailto:signaturetattooz@gmail.com",
                    },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="panel flex items-start gap-4 p-5 transition hover:-translate-y-0.5"
                    >
                      <item.icon className="mt-1 h-5 w-5 text-accentMuted" />
                      <div>
                        <p className="meta-label">{item.label}</p>
                        <p className="theme-light-link mt-2 text-sm leading-7">{item.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="theme-light-divider mt-8 border-t pt-6">
                <p className="theme-light-muted text-sm leading-7">
                  Serious students get the best outcomes. Tell us where you are starting from and
                  what kind of tattoo work you want to grow into.
                </p>
              </div>
            </motion.div>

            <motion.form
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={fadeUp(0.1)}
              className="panel grid gap-4 rounded-[2rem] p-5 md:grid-cols-2 sm:p-8"
              onSubmit={(event) => void handleSubmit(event)}
            >
              <input
                className="input-shell"
                placeholder="Full Name"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                required
              />
              <input
                className="input-shell"
                placeholder="Email Address"
                type="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                required
              />
              <input
                className="input-shell"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                required
              />
              <input
                className="input-shell"
                placeholder="Current Level"
                value={form.experienceLevel}
                onChange={(event) =>
                  setForm((current) => ({ ...current, experienceLevel: event.target.value }))
                }
                required
              />
              <input
                className="input-shell md:col-span-2"
                placeholder="What do you want to learn?"
                value={form.learningGoal}
                onChange={(event) =>
                  setForm((current) => ({ ...current, learningGoal: event.target.value }))
                }
                required
              />
              <textarea
                className="input-shell min-h-[10rem] md:col-span-2"
                placeholder="Tell us about your background, goals, or questions"
                value={form.message}
                onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
              />
              {error ? (
                <div className="md:col-span-2 rounded-[1.25rem] border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-bone/90">
                  {error}
                </div>
              ) : null}
              {success ? (
                <div className="md:col-span-2 rounded-[1.25rem] border border-accentMuted/30 bg-accentMuted/10 px-4 py-3 text-sm text-bone/90">
                  {success}
                </div>
              ) : null}
              <div className="md:col-span-2">
                <Button type="submit" size="lg" className="w-full min-w-[14rem] sm:w-auto" disabled={submitting}>
                  {submitting ? "Sending..." : "Send Enquiry"}
                </Button>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
