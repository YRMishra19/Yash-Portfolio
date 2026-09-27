import type { ReactNode } from "react";
import { cn } from "../lib/utils";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("section-shell", className)}>{children}</div>;
}
