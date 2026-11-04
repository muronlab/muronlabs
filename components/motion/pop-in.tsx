"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface PopInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Starting rotation in degrees. */
  rotate?: number;
}

/** Spins and springs a small element (an icon, a badge) into place, once, as it enters view. */
export function PopIn({ children, className, delay = 0.2, rotate = -45 }: PopInProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.span
      className={className ?? "inline-flex"}
      initial={reduceMotion ? false : { scale: 0.4, rotate, opacity: 0 }}
      whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ type: "spring", stiffness: 260, damping: 15, delay }}
    >
      {children}
    </motion.span>
  );
}
