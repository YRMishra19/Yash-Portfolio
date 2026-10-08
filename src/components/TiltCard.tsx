import { useRef, type ReactNode } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees. */
  max?: number;
};

/**
 * Gives a card a gentle 3D tilt and a soft light sweep that follow the pointer.
 * Only active for fine pointers (desktop) and when motion is not reduced.
 */
export function TiltCard({ children, className = "", max = 5 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const reset = useRef(0);

  const enabled = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !enabled()) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    cancelAnimationFrame(raf.current);
    window.clearTimeout(reset.current);
    raf.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(1100px) rotateX(${(0.5 - py) * max * 2}deg) rotateY(${(px - 0.5) * max * 2}deg)`;
      el.style.setProperty("--gx", `${px * 100}%`);
      el.style.setProperty("--gy", `${py * 100}%`);
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    el.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
    window.clearTimeout(reset.current);
    // Drop the transform entirely once flat so text is rasterised crisply.
    reset.current = window.setTimeout(() => {
      el.style.transform = "none";
    }, 340);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`tilt-card relative transition-transform duration-300 ease-out ${className}`}
    >
      {children}
      <span className="tilt-glare" aria-hidden="true" />
    </div>
  );
}
