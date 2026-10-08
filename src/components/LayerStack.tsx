import { useScroll } from "framer-motion";
import { useEffect, useRef } from "react";

type Layer = { title: string; description: string };

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

/**
 * "Exploded" 3D stack: the steps start collapsed together and fan out in depth
 * as the block scrolls into view; the whole stack leans toward the pointer and
 * each layer lifts when hovered. On small screens it is a clean stacked list.
 */
export function LayerStack({ layers }: { layers: Layer[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLOListElement>(null);
  const spine = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start 92%", "center 55%"] });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const apply = (v: number) => {
      const spread = reduced ? 1 : 0.1 + 0.9 * clamp01(v);
      body.current?.style.setProperty("--spread", spread.toFixed(3));
      if (spine.current) spine.current.style.opacity = String(0.25 + 0.75 * clamp01(v));
    };
    apply(scrollYProgress.get());
    return scrollYProgress.on("change", apply);
  }, [scrollYProgress]);

  // Pointer lean (desktop only)
  useEffect(() => {
    const el = wrap.current;
    const b = body.current;
    if (!el || !b) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    let raf = 0;
    let tx = -14;
    let ty = 9;
    let cx = tx;
    let cy = ty;
    let running = false;
    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      b.style.transform = `rotateX(${cy.toFixed(2)}deg) rotateY(${cx.toFixed(2)}deg)`;
      if (Math.abs(tx - cx) > 0.02 || Math.abs(ty - cy) > 0.02) raf = requestAnimationFrame(tick);
      else running = false;
    };
    const kick = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      tx = -14 + px * 16;
      ty = 9 - py * 10;
      kick();
    };
    const leave = () => {
      tx = -14;
      ty = 9;
      kick();
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    kick();
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={wrap} className="relative md:[perspective:1500px] md:py-6">
      <ol
        ref={body}
        className="relative space-y-4 md:space-y-5 md:[transform-style:preserve-3d] md:[transform:rotateX(9deg)_rotateY(-14deg)]"
        style={{ ["--spread" as string]: 1 }}
      >
        {layers.map((layer, i) => (
          <li
            key={layer.title}
            style={{ ["--i" as string]: i }}
            className="layer-card group relative flex gap-4 rounded-2xl border border-border-strong bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-5 backdrop-blur-md [transform-style:preserve-3d]"
          >
            <span className="font-display text-4xl leading-none text-accent/90 md:text-5xl">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <p className="font-medium text-fg">{layer.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-fg-muted">{layer.description}</p>
            </div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-6 -bottom-px h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </li>
        ))}
      </ol>
      <div
        ref={spine}
        aria-hidden="true"
        className="pointer-events-none absolute -left-3 bottom-8 top-8 hidden w-px bg-gradient-to-b from-transparent via-accent/60 to-transparent md:block"
      />
    </div>
  );
}
