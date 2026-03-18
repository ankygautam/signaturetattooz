import { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function AdminTextarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn("input-shell min-h-[8rem] resize-y", props.className)} />;
}
