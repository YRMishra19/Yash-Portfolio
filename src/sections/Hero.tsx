import { motion } from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";
import { profile } from "../data/profile";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { PortraitImage } from "../components/PortraitImage";

export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center overflow-hidden film-grain pt-28 pb-14 sm:pt-32 sm:pb-20"
      aria-label="Introduction"
    >
      {/* Cinematic animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-bg" />
        <motion.div
          className="absolute -top-1/3 -right-1/4 h-[60rem] w-[60rem] rounded-full bg-accent/[0.08] blur-[120px]"
          animate={prefersReducedMotion ? undefined : { x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-1/3 -left-1/4 h-[50rem] w-[50rem] rounded-full bg-accent/[0.05] blur-[120px]"
          animate={prefersReducedMotion ? undefined : { x: [0, -30, 0], y: [0, -20, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Horizontal data-stream lines */}
        <div className="absolute inset-0 flex flex-col justify-evenly opacity-[0.05]" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-px w-full bg-gradient-to-r from-transparent via-fg to-transparent" />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />
      </div>

      <Container className="w-full">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 sm:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="order-first lg:order-2 w-full max-w-[220px] sm:max-w-[300px] lg:max-w-[420px] xl:max-w-[480px] mx-auto lg:mx-0"
          >
            <PortraitImage src={profile.portraitPrimary} alt={`Portrait of ${profile.name}`} />
          </motion.div>

          <div className="lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-fg-muted border border-border rounded-full px-4 py-2 mb-8"
            >
              <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              {profile.locationShort} · Open to opportunities
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display leading-[0.95] whitespace-nowrap text-[clamp(1.9rem,7.4vw,6.5rem)] lg:text-[clamp(2.5rem,5.2vw,6.5rem)]"
            >
              {profile.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="mt-6 text-lg md:text-xl text-accent font-medium"
            >
              {profile.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.36 }}
              className="mt-5 max-w-xl text-fg-muted text-base md:text-lg leading-relaxed text-balance"
            >
              {profile.heroStatement}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.44 }}
              className="mt-10 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <Button href="#projects" variant="primary" className="w-full sm:w-auto">
                View My Work
              </Button>
              <Button href="#contact" variant="primary" className="w-full sm:w-auto">
                Let's Connect
              </Button>
              <Button href={profile.resumeUrl} variant="primary" download className="w-full sm:w-auto">
                Download Resume
              </Button>
            </motion.div>
          </div>
        </div>
      </Container>

      <motion.a
        href="#story"
        aria-label="Scroll to next section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-fg-subtle hover:text-accent transition-colors"
        animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="h-5 w-5" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
