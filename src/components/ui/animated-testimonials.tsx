import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export function AnimatedTestimonials({
  testimonials,
  autoplay = false,
  className,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
}) {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => index === active;

  useEffect(() => {
    if (!autoplay || testimonials.length < 2) {
      return;
    }

    const interval = window.setInterval(handleNext, 5000);
    return () => window.clearInterval(interval);
  }, [autoplay, testimonials.length]);

  const randomRotate = () => Math.floor(Math.random() * 21) - 10;

  if (!testimonials.length) {
    return null;
  }

  const activeTestimonial = testimonials[active];

  return (
    <div
      className={cn(
        "mx-auto max-w-sm px-4 py-12 md:max-w-5xl md:px-8 lg:px-12",
        className,
      )}
    >
      <div className="relative grid grid-cols-1 gap-12 md:grid-cols-[1.05fr_0.95fr] md:gap-20">
        <div>
          <div className="relative h-[26rem] w-full perspective-[1000px]">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotate(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.55,
                    scale: isActive(index) ? 1 : 0.94,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotate(),
                    zIndex: isActive(index) ? 30 : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -18, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotate(),
                  }}
                  transition={{
                    duration: 0.45,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    draggable={false}
                    className="h-full w-full rounded-[2rem] border border-white/10 object-cover object-center shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <h3 className="font-display text-3xl text-bone">{activeTestimonial.name}</h3>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-accentMuted">
              {activeTestimonial.designation}
            </p>
            <motion.p className="mt-8 text-lg leading-8 text-muted">
              {activeTestimonial.quote.split(" ").map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="group/button flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-accent/70 hover:bg-accent/10"
              aria-label="Previous gallery item"
            >
              <IconArrowLeft className="h-5 w-5 text-bone transition-transform duration-300 group-hover/button:rotate-12" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-accent/70 hover:bg-accent/10"
              aria-label="Next gallery item"
            >
              <IconArrowRight className="h-5 w-5 text-bone transition-transform duration-300 group-hover/button:-rotate-12" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
