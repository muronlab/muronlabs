"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * A 1px hairline that draws itself left-to-right as it scrolls into view —
 * the divider used between every editorial row.
 */
export function LineBreaker({ className, delay = 0 }: { className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={cn("h-px origin-left bg-muted-foreground/70", className)}
      initial={reduceMotion ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.2, delay, ease: [0.77, 0, 0.18, 1] }}
    />
  );
}
