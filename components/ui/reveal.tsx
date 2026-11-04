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
  /** Play immediately on mount instead of waiting for the viewport. */
  immediate?: boolean;
}

/**
 * Scroll-reveal wrapper: content fades and lifts in as it enters view, with a
 * long, soft ease. Under `prefers-reduced-motion` the same element is rendered
 * (so server and client markup match) and the transition is instant.
 */
export function Reveal({ children, delay = 0, y = 24, className, as = "div", immediate = false }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];
  const target = { opacity: 1, y: 0 };

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      {...(immediate ? { animate: target } : { whileInView: target })}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
