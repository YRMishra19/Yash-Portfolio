import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Container } from "../components/Container";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const WORDS = ["DATA", "BUSINESS", "AI"];

export function StoryIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.3, 1, 1, 0.3]);

  return (
    <section id="story" ref={ref} className="relative py-32 md:py-44 overflow-hidden" aria-label="Professional philosophy">
      <Container>
        <motion.p style={prefersReducedMotion ? undefined : { opacity }} className="text-center text-fg-subtle text-sm tracking-[0.3em] uppercase mb-8">
          Where I build
        </motion.p>
        <motion.h2
          style={prefersReducedMotion ? undefined : { opacity }}
          className="font-display text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-balance"
        >
          Building at the intersection of
          <br />
          <span className="inline-flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-3">
            {WORDS.map((word, i) => (
              <span key={word} className="inline-flex items-center gap-4 md:gap-6">
                <span className={i === 1 ? "text-accent" : "text-fg"}>{word}</span>
                {i < WORDS.length - 1 && <span className="text-fg-subtle text-2xl md:text-4xl">×</span>}
              </span>
            ))}
          </span>
        </motion.h2>
        <motion.p
          style={prefersReducedMotion ? undefined : { opacity }}
          className="mt-10 text-center max-w-2xl mx-auto text-fg-muted text-base md:text-lg leading-relaxed text-balance"
        >
          Every dashboard I build, every report I automate, and every product I ship starts with the same
          question: what decision does this actually change?
        </motion.p>
      </Container>
    </section>
  );
}
