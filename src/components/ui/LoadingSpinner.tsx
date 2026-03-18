import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function LoadingSpinner({
  label = "Loading",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 text-sm text-muted", className)}>
      <LoaderCircle className="h-4 w-4 animate-spin text-accentMuted" />
      <span>{label}</span>
    </div>
  );
}
