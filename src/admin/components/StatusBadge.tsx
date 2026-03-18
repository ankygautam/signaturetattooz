import { cn } from "@/lib/utils";

const toneMap: Record<string, string> = {
  new: "border-[#8d1f32]/40 bg-[#8d1f32]/12 text-bone",
  consultation: "border-accentMuted/40 bg-accentMuted/12 text-bone",
  confirmed: "border-emerald-500/30 bg-emerald-500/10 text-emerald-100",
  completed: "border-sky-500/30 bg-sky-500/10 text-sky-100",
  replied: "border-emerald-500/30 bg-emerald-500/10 text-emerald-100",
  "in-progress": "border-accentMuted/40 bg-accentMuted/12 text-bone",
  archived: "border-white/10 bg-white/[0.04] text-muted",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-[0.64rem] uppercase tracking-[0.24em]",
        toneMap[status] ?? toneMap.archived,
      )}
    >
      {status}
    </span>
  );
}
