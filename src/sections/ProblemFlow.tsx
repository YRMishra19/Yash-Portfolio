import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Container } from "../components/Container";
import { SectionHeading } from "../components/SectionHeading";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const STEPS = [
  { label: "Problem", detail: "A business question with no clear answer yet." },
  { label: "Data", detail: "Pull it from wherever it actually lives." },
  { label: "Insight", detail: "Find the pattern that matters, not just the one that's visible." },
  { label: "Automation", detail: "Remove the manual work standing between insight and action." },
  { label: "Decision", detail: "Hand stakeholders something they can act on immediately." },
  { label: "Impact", detail: "Measure whether the decision actually moved the number." },
];

export function ProblemFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.4"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="how-i-think" ref={ref} className="py-28 md:py-36" aria-label="How I solve problems">
      <Container>
        <SectionHeading
          index="03"
          eyebrow="How I Think"
          title="How I solve problems"
          align="center"
          description="The same six-step loop, whether it's a hotel's OTA performance or a client's ad funnel."
        />

        <div className="relative mt-20">
          <div className="hidden md:block absolute top-5 left-0 right-0 h-px bg-border" aria-hidden="true" />
          <motion.div
            className="hidden md:block absolute top-5 left-0 h-px bg-accent origin-left"
            style={prefersReducedMotion ? { scaleX: 1 } : { scaleX: lineScale, right: 0 }}
            aria-hidden="true"
          />

          <ol className="grid gap-10 md:grid-cols-6 md:gap-4">
            {STEPS.map((step, index) => (
              <li key={step.label} className="relative flex flex-col items-center text-center md:items-center">
                <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-bg border border-accent text-accent font-display text-sm">
                  {index + 1}
                </span>
                <p className="mt-4 font-display text-lg text-fg">{step.label}</p>
                <p className="mt-2 text-xs text-fg-subtle leading-relaxed max-w-[11rem]">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
