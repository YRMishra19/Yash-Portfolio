import { useMotionValue, useMotionValueEvent, useInView, useScroll } from "framer-motion";
import { lazy, Suspense, useCallback, useRef } from "react";
import { useWebGL } from "../hooks/useWebGL";

const ConvergenceScene = lazy(() => import("../components/three/ConvergenceScene"));

const WORDS = [
  { label: "DATA", color: "#33d6b4", range: [0.08, 0.26] as const },
  { label: "BUSINESS", color: "#f3c76b", range: [0.26, 0.44] as const },
  { label: "AI", color: "#8fd0ff", range: [0.44, 0.62] as const },
];

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

export function StoryIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const { enabled, mobile, finePointer } = useWebGL();
  const inView = useInView(sectionRef, { margin: "200px 0px 200px 0px" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const still = useMotionValue(1);
  const progress = enabled ? scrollYProgress : still;

  // Scroll-linked text is written straight to the elements (no per-frame React renders).
  const introRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const crossRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const subRef = useRef<HTMLParagraphElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  const apply = useCallback(
    (p: number) => {
      const intro = seg(p, 0, 0.08);
      if (introRef.current) {
        introRef.current.style.opacity = String(0.14 + 0.86 * intro);
        introRef.current.style.transform = `translateY(${26 * (1 - intro)}px)`;
      }
      WORDS.forEach((w, i) => {
        const t = seg(p, w.range[0], w.range[1]);
        const el = wordRefs.current[i];
        if (el) {
          el.style.opacity = String(0.14 + 0.86 * t);
          el.style.transform = `translateY(${26 * (1 - t)}px) scale(${0.94 + 0.06 * t})`;
          el.style.filter = `blur(${(10 * (1 - t)).toFixed(2)}px)`;
          el.style.textShadow = `0 0 ${(38 * t).toFixed(1)}px ${w.color}${Math.round(0x88 * t).toString(16).padStart(2, "0")}`;
        }
        const x = crossRefs.current[i];
        if (x) x.style.opacity = String(seg(p, w.range[1] - 0.04, w.range[1]));
      });
      const sub = seg(p, 0.66, 0.84);
      if (subRef.current) {
        subRef.current.style.opacity = String(0.14 + 0.86 * sub);
        subRef.current.style.transform = `translateY(${26 * (1 - sub)}px)`;
        subRef.current.style.filter = `blur(${(10 * (1 - sub)).toFixed(2)}px)`;
      }
      if (cueRef.current) cueRef.current.style.opacity = String(1 - seg(p, 0, 0.07));
    },
    [],
  );

  useMotionValueEvent(progress, "change", apply);

  return (
    <section
      id="story"
      ref={sectionRef}
      aria-label="Professional philosophy"
      className={`relative bg-[radial-gradient(ellipse_at_50%_52%,#10302a_0%,#08150f_55%,#040a08_100%)] text-white ${enabled ? "h-[300vh]" : "min-h-svh"}`}
    >
      <div className={enabled ? "sticky top-0 h-svh overflow-hidden" : "relative min-h-svh overflow-hidden"}>
        {enabled && (
          <div className="absolute inset-0" aria-hidden="true">
            <Suspense fallback={null}>
              <ConvergenceScene progress={progress} mobile={mobile} finePointer={finePointer} active={inView} />
            </Suspense>
          </div>
        )}

        {/* Vignette keeps the scene cinematic and the text legible */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(2,6,5,0.65)_100%)]"
        />

        <div className="relative z-10 mx-auto flex h-svh min-h-[34rem] max-w-6xl flex-col justify-between px-6 pb-12 pt-28 text-center md:pb-16 md:pt-32">
          <div ref={introRef} style={enabled ? { opacity: 0.14 } : undefined}>
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.4em] text-white/55 md:text-xs">Where I build</p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-white/90 sm:text-4xl md:text-5xl">
              Building at the intersection of
            </h2>
          </div>

          <div>
            <h2 className="sr-only">Data, Business and AI</h2>
            <div
              aria-hidden="true"
              className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-display text-[2.6rem] leading-none sm:text-6xl md:gap-x-8 md:text-7xl lg:text-8xl"
            >
              {WORDS.map((w, i) => (
                <span key={w.label} className="inline-flex items-center gap-4 md:gap-8">
                  <span
                    ref={(el) => {
                      wordRefs.current[i] = el;
                    }}
                    className="inline-block"
                    style={{ color: w.color, opacity: enabled ? 0.14 : 1 }}
                  >
                    {w.label}
                  </span>
                  {i < WORDS.length - 1 && (
                    <span
                      ref={(el) => {
                        crossRefs.current[i] = el;
                      }}
                      className="text-2xl text-white/35 sm:text-4xl md:text-5xl"
                      style={{ opacity: enabled ? 0 : 1 }}
                    >
                      ×
                    </span>
                  )}
                </span>
              ))}
            </div>
            <p
              ref={subRef}
              style={enabled ? { opacity: 0.14 } : undefined}
              className="mx-auto mt-8 max-w-2xl text-balance text-base leading-relaxed text-white/70 md:mt-10 md:text-lg"
            >
              Every dashboard I build, every report I automate, and every product I ship starts with the same
              question: what decision does this actually change?
            </p>
            {enabled && (
              <div ref={cueRef} className="mt-8 flex flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.35em] text-white/40" aria-hidden="true">
                Scroll
                <span className="h-8 w-px bg-gradient-to-b from-white/50 to-transparent" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Soft edges blend the dark stage into the cream page above and below */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-bg to-transparent md:h-32" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16 bg-gradient-to-t from-bg to-transparent md:h-24" />
    </section>
  );
}
