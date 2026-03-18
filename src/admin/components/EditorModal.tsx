import { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function EditorModal({
  open,
  title,
  subtitle,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  subtitle: string;
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-[80] flex items-end justify-center bg-black/75 p-4 backdrop-blur-sm transition md:items-center",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <div className="w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#090909] shadow-card">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-6">
          <div>
            <p className="eyebrow">{subtitle}</p>
            <h3 className="mt-3 font-display text-5xl uppercase leading-none text-bone">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-muted transition hover:border-accentMuted hover:text-bone"
            aria-label="Close editor"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
