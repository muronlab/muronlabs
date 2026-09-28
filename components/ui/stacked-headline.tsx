"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type HeadlineTag = "h1" | "h2" | "h3" | "div";

interface StackedHeadlineProps {
  /** One entry per rendered line. Each line is masked and rises on its own. */
  lines: string[];
  id?: string;
  as?: HeadlineTag;
  /** Typography and colour classes for the whole block. */
  className?: string;
  /**
   * Push alternate lines to the opposite edge, so the block reads as a stacked
   * editorial mark rather than a flush-left paragraph.
   */
  alternate?: boolean;
  delay?: number;
  /** Set when a plain-text copy of the heading is already exposed nearby. */
  "aria-hidden"?: boolean;
}

/**
 * Display heading built line by line: every line sits in its own overflow mask
 * and rises into place as the block enters view, staggered top to bottom. Lines
 * never wrap, so the caller controls the break points by splitting the text.
 *
 * Honours `prefers-reduced-motion` by rendering the lines statically.
 */
export function StackedHeadline({
  lines,
  id,
  as = "h2",
  className,
  alternate = false,
  delay = 0,
  ...rest
}: StackedHeadlineProps) {
  const Tag = as;
  const reduceMotion = useReducedMotion();

  return (
    <Tag
      id={id}
      className={cn("flex w-full min-w-0 flex-col gap-1 uppercase", className)}
      {...rest}
    >
      {lines.map((line, i) => (
        <span
          key={line}
          className={cn(
            "block w-max max-w-full overflow-hidden",
            alternate && i % 2 === 1 ? "ml-auto" : "mr-auto",
          )}
        >
          {reduceMotion ? (
            <span className="block whitespace-nowrap leading-[0.82] antialiased">{line}</span>
          ) : (
            <motion.span
              className="block whitespace-nowrap leading-[0.82] antialiased"
              initial={{ y: "110%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              transition={{ duration: 0.9, delay: delay + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
            >
              {line}
            </motion.span>
          )}
        </span>
      ))}
    </Tag>
  );
}
