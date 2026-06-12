"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

interface ScrollRevealTextProps {
  /** The paragraph copy to reveal word-by-word. */
  text: string;
  className?: string;
  /** Opacity of words before they are revealed (the "gray" resting state). */
  baseOpacity?: number;
}

/**
 * Scroll-linked text reveal. As the paragraph travels through the viewport,
 * each word transitions from a faded resting state to full, solid colour —
 * producing a premium "the copy fills in as you read" effect.
 *
 * Theme-safe: it animates opacity over `currentColor`, so a faded word reads as
 * gray and a revealed word reads as the real text colour in both light and dark
 * modes. Honours `prefers-reduced-motion` by rendering static, fully-revealed
 * copy.
 */
export function ScrollRevealText({ text, className, baseOpacity = 0.15 }: ScrollRevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    // Begin filling once the block enters the lower viewport; finish as it
    // passes the upper-middle, so the reveal tracks the natural reading line.
    offset: ["start 0.85", "end 0.55"],
  });

  const words = text.split(" ");

  if (reduceMotion) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <React.Fragment key={i}>
            <Word progress={scrollYProgress} range={[start, end]} baseOpacity={baseOpacity}>
              {word}
            </Word>
            {i < words.length - 1 ? " " : ""}
          </React.Fragment>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  baseOpacity,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  baseOpacity: number;
}) {
  const opacity = useTransform(progress, range, [baseOpacity, 1]);
  return (
    <motion.span className={cn("inline-block", "will-change-[opacity]")} style={{ opacity }}>
      {children}
    </motion.span>
  );
}
