import { motion } from "framer-motion";
import { fadeUp, viewport } from "@/lib/motion";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "";

  return (
    <motion.div
      variants={fadeUp(0.05)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={`max-w-2xl space-y-4 ${alignment}`}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="font-display text-4xl leading-none text-bone sm:text-5xl">{title}</h2>
      <p className="text-sm leading-7 text-muted sm:text-base">{description}</p>
    </motion.div>
  );
}
