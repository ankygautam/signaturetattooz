import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function StatCard({
  title,
  value,
  helper,
  icon: Icon,
  className,
}: {
  title: string;
  value: string;
  helper: string;
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "panel relative overflow-hidden rounded-[1.75rem] p-6 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-accentMuted/50 before:to-transparent",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-muted">{title}</p>
          <p className="mt-5 font-display text-6xl uppercase leading-none text-bone">{value}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-accentMuted">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-6 text-sm leading-7 text-muted">{helper}</p>
    </motion.div>
  );
}
