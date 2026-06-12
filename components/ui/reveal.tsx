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
 * Lightweight scroll-reveal wrapper. As content enters view it fades and lifts
 * in, then resolves from desaturated grey to full colour — so coloured accents
 * (brand numbers, gradients, dots, imagery) bloom into their real colour. The
 * colour bloom runs a touch slower than the fade so the grey→colour transition
 * stays visible after the block has settled.
 *
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
      initial={{ opacity: 0, y, filter: "grayscale(1)" }}
      whileInView={{ opacity: 1, y: 0, filter: "grayscale(0)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
        filter: { duration: 1.1, delay: delay + 0.1, ease: "easeOut" },
      }}
    >
      {children}
    </Component>
  );
}
