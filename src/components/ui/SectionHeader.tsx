import { motion } from "framer-motion";
import { fadeUp, viewport } from "@/lib/motion";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  headingTag?: "h1" | "h2";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  headingTag = "h2",
}: SectionHeaderProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "";
  const HeadingTag = headingTag;

  return (
    <motion.div
      variants={fadeUp(0.05)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={`max-w-2xl space-y-4 ${alignment}`}
    >
      <p className="eyebrow">{eyebrow}</p>
      <HeadingTag className="section-title">{title}</HeadingTag>
      <p className="section-copy">{description}</p>
    </motion.div>
  );
}
