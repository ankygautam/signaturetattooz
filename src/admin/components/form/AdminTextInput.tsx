import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function AdminTextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn("input-shell", props.className)} />;
}
