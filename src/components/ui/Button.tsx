import { clsx } from "clsx";
import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  const styles: Record<Variant, string> = {
    primary:
      "bg-accent text-bone border border-accent px-5 py-3 rounded-full shadow-glow hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200",
    ghost:
      "border border-stroke text-bone/80 hover:text-bone hover:border-accent px-5 py-3 rounded-full backdrop-blur-sm transition-all duration-200",
  };

  return (
    <button className={clsx("inline-flex items-center gap-2 text-sm uppercase tracking-wide", styles[variant], className)} {...props}>
      {children}
    </button>
  );
}
