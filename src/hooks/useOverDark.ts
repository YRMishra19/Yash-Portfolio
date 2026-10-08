import { useEffect, useState } from "react";

/**
 * True while the given screen point sits over a dark section (.theme-dark or
 * the story scene), so fixed UI like the side rails can switch to light ink.
 */
export function useOverDark(side: "left" | "right"): boolean {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const x = side === "left" ? 26 : window.innerWidth - 26;
      const y = Math.round(window.innerHeight * 0.72);
      const stack = document.elementsFromPoint(x, y);
      setDark(stack.some((el) => el.classList?.contains("theme-dark") || el.id === "story"));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [side]);

  return dark;
}
