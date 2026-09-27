import { cn } from "../lib/utils";

/**
 * An infinite horizontal scroller. The item list is duplicated once so the
 * track can loop seamlessly from -50% back to 0. Purely decorative (the same
 * content is already presented accessibly elsewhere), so it's hidden from
 * assistive tech. Speed/direction respects the sitewide
 * prefers-reduced-motion rule in index.css, which freezes all animations.
 */
export function Marquee({
  items,
  direction = "left",
  duration = 34,
  className,
}: {
  items: string[];
  direction?: "left" | "right";
  duration?: number;
  className?: string;
}) {
  const track = [...items, ...items];

  return (
    <div className={cn("overflow-hidden", className)} aria-hidden="true">
      <div
        className="flex w-max items-center gap-10 animate-marquee"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {track.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10 shrink-0">
            <span className="font-display text-xl md:text-2xl text-fg/90 whitespace-nowrap">{item}</span>
            <span className="h-1.5 w-1.5 rotate-45 bg-accent shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
