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
      "border border-[#93593b] bg-[#93593b] text-[#f8efe6] shadow-[0_18px_45px_rgba(147,89,59,0.24)] hover:-translate-y-0.5 hover:border-[#844f35] hover:bg-[#844f35]",
    ghost:
      "border border-white/12 bg-white/[0.03] text-bone/90 hover:-translate-y-0.5 hover:border-[#93593b]/70 hover:bg-[#93593b]/12 hover:text-bone",
    secondary:
      "border border-[#93593b] bg-[#93593b] text-[#f8efe6] shadow-[0_18px_45px_rgba(147,89,59,0.24)] hover:-translate-y-0.5 hover:border-[#844f35] hover:bg-[#844f35]",
  };
  const sizes: Record<Size, string> = {
    md: "px-5 py-3 text-xs tracking-[0.24em]",
    lg: "px-6 py-3.5 text-sm tracking-[0.24em]",
  };
  const base =
    "inline-flex items-center justify-center rounded-full uppercase transition-all duration-300 disabled:pointer-events-none disabled:opacity-60";

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
