import { cn } from "../lib/utils";

/**
 * The site's wordmark: "Y  R  M" tracked out with a circular emblem ring
 * around the middle initial - a small badge-style flourish instead of a
 * plain text logo. Sizing is em-based so it scales cleanly with whatever
 * font-size the parent sets (see Nav.tsx).
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 md:gap-3 font-display leading-none select-none", className)}>
      <span>Y</span>
      <span className="relative inline-flex h-[1.6em] w-[1.6em] shrink-0 items-center justify-center rounded-full border-[1.5px] border-current">
        <span>R</span>
      </span>
      <span>M</span>
    </span>
  );
}
