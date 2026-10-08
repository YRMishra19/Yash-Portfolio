import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "li";
};

export function Reveal({ children, delay = 0, y = 28, className, as = "div" }: RevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : y,
      rotateX: prefersReducedMotion ? 0 : 9,
      transformPerspective: 1000,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transformPerspective: 1000,
      transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "200px 0px", amount: 0 }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
