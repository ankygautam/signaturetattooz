import { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function AdminSelect(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn("input-shell appearance-none", props.className)} />;
}
