/**
 * Lightweight CSS-3D data bars for phones/tablets (no WebGL). Purely decorative.
 */
const BARS = [28, 46, 36, 62, 50];

function Bar({ h, delay, tone }: { h: number; delay: number; tone: string }) {
  const w = 12;
  const face = "absolute left-0 top-0";
  return (
    <div
      className="hero-lite-bar relative"
      style={{ width: w, height: h, transformStyle: "preserve-3d", animationDelay: `${delay}s` }}
    >
      <div className={face} style={{ width: w, height: h, background: tone, transform: `translateZ(${w / 2}px)` }} />
      <div
        className={face}
        style={{
          width: w,
          height: h,
          background: tone,
          filter: "brightness(0.78)",
          transform: `rotateY(90deg) translateZ(${w / 2}px)`,
        }}
      />
      <div
        className={face}
        style={{
          width: w,
          height: w,
          background: tone,
          filter: "brightness(1.15)",
          transform: `rotateX(90deg) translateZ(${w / 2}px)`,
          transformOrigin: "center top",
        }}
      />
    </div>
  );
}

export function HeroLite({ className = "" }: { className?: string }) {
  const tones = ["#d9c9a8", "#8fc1b4", "#12665a", "#c2ac82", "#1f9a86"];
  return (
    <div aria-hidden="true" className={`pointer-events-none ${className}`} style={{ perspective: 600 }}>
      <div className="hero-lite-stage flex items-end gap-1.5" style={{ transformStyle: "preserve-3d" }}>
        {BARS.map((h, i) => (
          <Bar key={i} h={h} delay={i * 0.18} tone={tones[i]} />
        ))}
      </div>
    </div>
  );
}
