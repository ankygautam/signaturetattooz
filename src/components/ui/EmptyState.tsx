import { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  action,
  className,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("panel flex flex-col items-start gap-4 p-8", className)}>
      <div>
        <p className="eyebrow">Nothing here yet</p>
        <h3 className="mt-4 font-display text-4xl uppercase leading-none text-bone">{title}</h3>
      </div>
      <p className="max-w-xl text-sm leading-7 text-muted">{description}</p>
      {action ?? (actionLabel && actionHref ? <Button href={actionHref}>{actionLabel}</Button> : null)}
    </div>
  );
}
