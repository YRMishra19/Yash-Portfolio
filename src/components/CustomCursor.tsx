import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const INTERACTIVE_SELECTOR = "a, button, input, textarea, select, [role='button'], .cursor-hover";

/**
 * A small dot that tracks the pointer exactly, with a larger ring that
 * eases toward it a beat behind - the classic "precision cursor" look.
 * The ring grows and switches to the accent color over links/buttons.
 * Desktop (fine-pointer) only, and fully disabled under
 * prefers-reduced-motion.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("custom-cursor-active");

    let mouseX = -100;
    let mouseY = -100;
    let ringX = mouseX;
    let ringY = mouseY;
    let hovering = false;
    let visible = false;
    let raf = 0;

    const setHover = (next: boolean) => {
      if (next === hovering) return;
      hovering = next;
      ring.style.width = hovering ? "52px" : "32px";
      ring.style.height = hovering ? "52px" : "32px";
      ring.style.borderColor = hovering ? "var(--color-accent)" : "var(--color-fg-muted)";
      ring.style.opacity = hovering ? "1" : "0.65";
      dot.style.opacity = hovering ? "0" : "1";
    };

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.visibility = "visible";
        ring.style.visibility = "visible";
      }
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      setHover(!!(e.target as Element | null)?.closest(INTERACTIVE_SELECTOR));
    };

    const onLeaveWindow = () => {
      visible = false;
      dot.style.visibility = "hidden";
      ring.style.visibility = "hidden";
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      cancelAnimationFrame(raf);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block h-[6px] w-[6px] rounded-full bg-accent invisible transition-opacity duration-150"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block rounded-full border invisible transition-[width,height,border-color,opacity] duration-200 ease-out"
        style={{ width: "32px", height: "32px", borderColor: "var(--color-fg-muted)", opacity: 0.65 }}
      />
    </>
  );
}
