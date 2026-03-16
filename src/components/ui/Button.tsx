import { clsx } from "clsx";
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
} from "react";

type Variant = "primary" | "ghost" | "secondary";
type Size = "md" | "lg";

type SharedProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type AnchorProps = SharedProps &
  DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = SharedProps &
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    href?: never;
  };

type ButtonProps = AnchorProps | NativeButtonProps;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const styles: Record<Variant, string> = {
    primary:
      "border border-accent bg-accent text-bone shadow-glow hover:-translate-y-0.5 hover:bg-accent/90",
    ghost:
      "border border-white/12 bg-white/[0.03] text-bone/90 hover:-translate-y-0.5 hover:border-accentMuted hover:text-bone",
    secondary:
      "border border-accentMuted/60 bg-accentMuted/10 text-bone hover:-translate-y-0.5 hover:bg-accentMuted/20",
  };
  const sizes: Record<Size, string> = {
    md: "px-5 py-3 text-xs tracking-[0.24em]",
    lg: "px-6 py-3.5 text-sm tracking-[0.24em]",
  };
  const base =
    "inline-flex items-center justify-center rounded-full uppercase transition-all duration-300";

  if ("href" in props) {
    const anchorProps = props as AnchorProps;

    return (
      <a className={clsx(base, sizes[size], styles[variant], className)} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = props as NativeButtonProps;

  return (
    <button className={clsx(base, sizes[size], styles[variant], className)} {...buttonProps}>
      {children}
    </button>
  );
}
