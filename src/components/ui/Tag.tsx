import { clsx } from "clsx";
import { HTMLAttributes } from "react";

type TagProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "accent" | "muted";
};

export function Tag({ tone = "muted", className, children, ...props }: TagProps) {
  const base =
    "inline-flex items-center rounded-full border px-3 py-1 text-xs uppercase tracking-wide";
  const tones = {
    accent: "border-accent text-accent bg-accent/10",
    muted: "border-stroke text-muted bg-white/5",
  };

  return (
    <span className={clsx(base, tones[tone], className)} {...props}>
      {children}
    </span>
  );
}
