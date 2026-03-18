import { cn } from "@/lib/utils";

export function AdminToggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "flex items-center justify-between rounded-[1.25rem] border px-4 py-3 text-left transition",
        checked ? "border-accentMuted/50 bg-accentMuted/10" : "border-white/10 bg-white/[0.02]",
      )}
    >
      <span className="text-sm text-bone">{label}</span>
      <span
        className={cn(
          "inline-flex h-6 w-11 items-center rounded-full p-1 transition",
          checked ? "bg-accentMuted" : "bg-white/10",
        )}
      >
        <span
          className={cn(
            "h-4 w-4 rounded-full bg-background transition",
            checked ? "translate-x-5" : "translate-x-0",
          )}
        />
      </span>
    </button>
  );
}
