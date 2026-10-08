import { useEffect, useRef, type ReactNode } from "react";

type Chip = { value: string; label: string };

type Depth3DProps = {
  children: ReactNode;
  chips?: Chip[];
  /** Mirrors the tilt direction so alternating cards lean toward each other. */
  flip?: boolean;
};

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

const CHIP_POSITIONS = [
  "right-2 top-0 sm:-right-3 sm:-top-4",
  "left-2 bottom-3 sm:-left-3 sm:-bottom-5",
  "right-4 bottom-10 sm:-right-5 sm:bottom-16",
];

/**
 * Presents a screenshot as a floating 3D object: layered plates behind it,
 * a glow and ground shadow, floating metric chips in front, and a tilt that
 * responds to both scroll position and the pointer.
 */
export function Depth3D({ children, chips = [], flip = false }: Depth3DProps) {
  const stage = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stage.current;
    const obj = body.current;
    if (!el || !obj) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const dir = flip ? -1 : 1;

    const cur = { x: 8, y: -10 * dir };
    const pointer = { x: 0, y: 0, active: false };
    let raf = 0;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      pointer.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };

    const tick = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 as the object enters from the bottom, 1 as it leaves at the top
      const prog = clamp01((vh - r.top) / (vh + r.height));
      const scrollX = reduce ? 4 : 16 - prog * 26; // tips forward -> back as it passes
      const scrollY = reduce ? -6 * dir : (-16 + prog * 20) * dir;
      const targetX = scrollX + (pointer.active ? -pointer.y * 9 : 0);
      const targetY = scrollY + (pointer.active ? pointer.x * 13 : 0);
      cur.x += (targetX - cur.x) * 0.09;
      cur.y += (targetY - cur.y) * 0.09;
      obj.style.transform = `rotateX(${cur.x.toFixed(2)}deg) rotateY(${cur.y.toFixed(2)}deg)`;
      if (visible) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        cancelAnimationFrame(raf);
        if (visible) raf = requestAnimationFrame(tick);
      },
      { rootMargin: "120px 0px" },
    );
    io.observe(el);

    if (fine && !reduce) {
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
    }
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [flip]);

  return (
    <div ref={stage} className="relative w-full py-4 md:py-6" style={{ perspective: "1500px" }}>
      <div ref={body} className="relative" style={{ transformStyle: "preserve-3d", willChange: "transform" }}>
        {/* Ambient glow behind everything */}
        <div
          aria-hidden="true"
          className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-accent/30 via-transparent to-[#f3c76b]/25 blur-2xl"
          style={{ transform: "translateZ(-90px)" }}
        />
        {/* Ground shadow */}
        <div
          aria-hidden="true"
          className="absolute inset-x-[10%] -bottom-8 h-12 rounded-[50%] bg-black/30 blur-xl"
          style={{ transform: "translateZ(-70px) rotateX(70deg)" }}
        />
        {/* Stacked plates give the object real thickness */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-xl border border-border-strong bg-bg-elevated"
          style={{ transform: "translateZ(-34px) scale(0.985)" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-xl border border-border bg-bg-elevated/80"
          style={{ transform: "translateZ(-18px) scale(0.992)" }}
        />

        <div className="relative" style={{ transform: "translateZ(0)" }}>
          {children}
        </div>

        {/* Floating metric chips */}
        {chips.slice(0, 3).map((chip, i) => (
          <div
            key={chip.label}
            aria-hidden="true"
            className={`depth-chip absolute ${i === 2 ? "hidden sm:block " : ""}${CHIP_POSITIONS[i]} rounded-xl border border-border-strong bg-bg-card/95 px-3 py-2 shadow-[0_18px_40px_-14px_rgba(32,28,22,0.45)] backdrop-blur`}
            style={{ transform: `translateZ(${70 + i * 14}px)`, animationDelay: `${i * 0.7}s` }}
          >
            <p className="font-display text-xl leading-none text-accent md:text-2xl">{chip.value}</p>
            <p className="mt-1 text-[0.6rem] uppercase tracking-[0.14em] text-fg-subtle">{chip.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
