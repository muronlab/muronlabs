"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Travel distance in px before settling. */
  y?: number;
  className?: string;
  /** Render as a different element (e.g. "li", "article"). */
  as?: "div" | "li" | "article" | "section" | "span";
}

/**
 * Lightweight scroll-reveal wrapper. Fades and lifts content into view once.
 * Honours `prefers-reduced-motion` by rendering content statically.
 */
export function Reveal({ children, delay = 0, y = 18, className, as = "div" }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  if (reduceMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
