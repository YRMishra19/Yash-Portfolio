import { useEffect, useState } from "react";

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * True only on capable desktop browsers: a wide screen, a fine pointer, WebGL,
 * and no "reduce motion" preference. Phones and tablets get lightweight CSS
 * depth instead, so the site never lags on them.
 */
export function useCan3D(): boolean {
  const [can3D, setCan3D] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setCan3D(wide.matches && !reduce.matches && hasWebGL());
    update();
    wide.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  return can3D;
}
