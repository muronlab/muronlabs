"use client";

import { useRef, type ReactNode } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface LazyVisualProps {
  /** The WebGL visual. Only rendered — so only imported — once near the viewport. */
  children: ReactNode;
  /** Static stand-in used before mount and for `prefers-reduced-motion`. */
  fallback: ReactNode;
  className?: string;
}

/**
 * Gate for the heavy canvas visuals: keeps a WebGL context and its render loop
 * from existing until the panel is close to the viewport, and swaps in a static
 * stand-in for visitors who prefer reduced motion.
 */
export function LazyVisual({ children, fallback, className }: LazyVisualProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "240px" });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className={cn("absolute inset-0", className)}>
      {inView && !reduceMotion ? children : fallback}
    </div>
  );
}
