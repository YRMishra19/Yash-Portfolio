import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Play, Volume2 } from "lucide-react";
import { profile } from "../data/profile";
import { socialLinks } from "../data/social";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { Button } from "../components/Button";
import { Container } from "../components/Container";

const INTRO_VIDEO = "/media/yash-intro.mp4";
const INTRO_POSTER = "/media/yash-intro-poster.webp";
const FADE_MASK = {
  WebkitMaskImage:
    "linear-gradient(to bottom, #000 80%, transparent 100%), linear-gradient(to right, transparent 0%, #000 14%, #000 86%, transparent 100%)",
  WebkitMaskComposite: "source-in",
  maskImage:
    "linear-gradient(to bottom, #000 80%, transparent 100%), linear-gradient(to right, transparent 0%, #000 14%, #000 86%, transparent 100%)",
  maskComposite: "intersect",
} as const;

const HERO_STATS = [
  { value: "4+", label: "years in BI & analytics" },
  { value: "20+", label: "properties, sole analyst" },
  { value: "$1.15M", label: "forecast model built" },
];

const HERO_LINKS = ["LinkedIn", "GitHub", "YouTube", "Y-PROC"];

export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    return () => {
      video?.pause();
    };
  }, []);

  const toggleIntro = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.muted = false;
      void video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const links = HERO_LINKS.map((name) => socialLinks.find((s) => s.name === name)).filter(
    (s): s is (typeof socialLinks)[number] => Boolean(s),
  );

  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden bg-bg pt-28 sm:pt-32"
      aria-label="Introduction"
    >
      {/* Giant faded monogram behind everything */}
      <div
        className="pointer-events-none absolute inset-0 flex select-none items-end justify-center overflow-hidden pb-[14%] sm:pb-[10%] lg:items-center lg:pb-0"
        aria-hidden="true"
      >
        <span className="translate-y-[2%] font-sans text-[46vw] font-extrabold leading-none tracking-[-0.07em] text-bg-elevated sm:text-[40vw] lg:translate-x-[6%] lg:text-[34vw]">
          YRM
        </span>
      </div>

      <Container className="relative w-full">
        <div className="grid items-end gap-6 lg:min-h-[calc(100svh-8rem)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-4">
          {/* Text column */}
          <div className="self-center pb-4 lg:pb-16">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.25em] text-fg-muted"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Business · Analytics · AI/ML
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-[clamp(2.5rem,7.2vw,5.6rem)] leading-[0.98] tracking-[-0.03em] text-fg"
            >
              <span className="block font-sans font-extrabold">Business Data Analyst</span>
              <span className="block font-display italic font-normal">&amp; Entrepreneur.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="mt-7 max-w-md text-base leading-relaxed text-fg-muted md:text-lg"
            >
              I'm {profile.name} - I build modern data platforms, products, and practical AI/ML systems that people can
              trust.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <Button href="#projects" variant="primary" className="w-full sm:w-auto">
                Explore work
                <ArrowDown className="h-4 w-4 -rotate-90" aria-hidden="true" />
              </Button>
              <Button href="#contact" variant="outline" className="w-full sm:w-auto">
                Let's talk
              </Button>
              <Button href={profile.resumeUrl} variant="outline" download className="w-full sm:w-auto">
                Download Resume
              </Button>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              {links.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.14em] text-fg transition-colors hover:text-accent"
                  >
                    {s.name}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </motion.ul>

            <motion.dl
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-border-strong pt-6"
            >
              {HERO_STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-display text-3xl leading-none text-fg sm:text-4xl">{stat.value}</dt>
                  <dd className="mt-2 text-[0.7rem] uppercase leading-snug tracking-[0.12em] text-fg-muted">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Figure column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative order-first mx-auto w-full max-w-[420px] sm:max-w-[520px] lg:order-none lg:max-w-none"
          >
            <video
              ref={videoRef}
              src={INTRO_VIDEO}
              poster={INTRO_POSTER}
              preload="metadata"
              playsInline
              aria-label={`${profile.name} introducing himself`}
              className="relative mx-auto block aspect-[9/16] h-auto w-full max-w-[260px] select-none object-cover mix-blend-multiply sm:max-w-[340px] lg:max-h-[calc(100svh-7rem)] lg:w-auto lg:max-w-none"
              style={FADE_MASK}
              onEnded={() => {
                setPlaying(false);
                if (videoRef.current) videoRef.current.currentTime = 0;
              }}
              onPause={() => setPlaying(false)}
              onPlay={() => setPlaying(true)}
            />

            {/* Sound button */}
            <div className="absolute right-[4%] top-[2%] z-20 flex items-center gap-3 sm:right-[6%] sm:top-[6%]">
              <span
                className="hidden rounded-full bg-bg-card/90 px-3 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-fg shadow-sm backdrop-blur sm:inline-block"
                aria-hidden="true"
              >
                {playing ? "Playing - tap to pause" : "Watch my intro"}
              </span>
              <button
                type="button"
                onClick={toggleIntro}
                aria-pressed={playing}
                aria-label={playing ? "Pause my video introduction" : "Play my video introduction with sound"}
                title="Play intro with sound"
                className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-fg/85 text-white shadow-lg transition-transform duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {!playing && !prefersReducedMotion && (
                  <span
                    className="absolute inset-0 animate-ping rounded-full border border-fg/40"
                    aria-hidden="true"
                  />
                )}
                {playing ? (
                  <Volume2 className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" />
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </Container>

      <motion.a
        href="#story"
        aria-label="Scroll to next section"
        className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 text-fg-subtle transition-colors hover:text-accent lg:block"
        animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="h-5 w-5" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
