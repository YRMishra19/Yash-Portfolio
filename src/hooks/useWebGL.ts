import { useEffect, useState } from "react";

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export type WebGLInfo = {
  /** WebGL is available and the visitor has not asked for reduced motion. */
  enabled: boolean;
  /** Narrow screen - scenes use fewer particles and a portrait layout. */
  mobile: boolean;
  /** Fine pointer (mouse) - enables cursor parallax. */
  finePointer: boolean;
};

function read(): WebGLInfo {
  if (typeof window === "undefined") return { enabled: false, mobile: false, finePointer: false };
  return {
    enabled: !window.matchMedia("(prefers-reduced-motion: reduce)").matches && hasWebGL(),
    mobile: window.matchMedia("(max-width: 767px)").matches,
    finePointer: window.matchMedia("(pointer: fine)").matches,
  };
}

export function useWebGL(): WebGLInfo {
  // Read synchronously so the very first render already has the final layout
  // (scroll-linked sections measure their height once on mount).
  const [info, setInfo] = useState<WebGLInfo>(read);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 767px)");
    const update = () => setInfo(read());
    reduce.addEventListener("change", update);
    narrow.addEventListener("change", update);
    return () => {
      reduce.removeEventListener("change", update);
      narrow.removeEventListener("change", update);
    };
  }, []);

  return info;
}
