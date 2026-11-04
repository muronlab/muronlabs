"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Pixels travelled across the element's pass through the viewport. Negative moves up. */
  distance?: number;
  /**
   * "pass" (default): measured across the whole pass through the viewport.
   * "leave": starts at 0 while the element sits at the top of the page, for
   * heroes that must not shift on first load.
   */
  range?: "pass" | "leave";
}

/**
 * Drifts its content vertically as the page scrolls past, spring-smoothed.
 * Static under reduced motion.
 */
export function Parallax({ children, className, distance = -60, range = "pass" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: range === "leave" ? ["start start", "end start"] : ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [0, distance]);
  const y = useSpring(raw, { stiffness: 90, damping: 24, mass: 0.5 });

  return (
    <motion.div ref={ref} className={cn(className)} style={reduceMotion ? undefined : { y }}>
      {children}
    </motion.div>
  );
}
