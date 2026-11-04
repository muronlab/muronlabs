"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

interface SplitWordsProps {
  text: string;
  className?: string;
  /** Seconds before the first word starts. */
  delay?: number;
  /** Seconds between words. */
  stagger?: number;
}

const container = (delay: number, stagger: number): Variants => ({
  hidden: {},
  show: { transition: { delayChildren: delay, staggerChildren: stagger } },
});

const word: Variants = {
  hidden: { y: "0.55em", opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 140, damping: 20, mass: 0.6 },
  },
};

/**
 * Headline text that rises word by word as it enters view (transform and
 * opacity only, so it stays cheap to draw).
 * Put it inside the heading element, e.g. `<h2><SplitWords text="…" /></h2>`,
 * so the heading keeps its semantics and full text for search engines.
 */
export function SplitWords({ text, className, delay = 0.05, stagger = 0.055 }: SplitWordsProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <span className={className}>{text}</span>;

  const words = text.split(" ");
  return (
    <motion.span
      className={cn("inline", className)}
      variants={container(delay, stagger)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block whitespace-pre">
          <motion.span className="inline-block" variants={word}>
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </motion.span>
  );
}
