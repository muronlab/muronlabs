"use client";

import type { ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { useFlickerLoop, type FlickerPace } from "@/components/ui/use-flicker-loop";

interface FlickerBlockProps {
  children: ReactNode;
  className?: string;
  /** See `FlickerText` — `primary` is for the heading that leads a screen. */
  pace?: FlickerPace;
}

/**
 * The strike effect for markup `FlickerText` can't express: anything with its
 * own elements, colours or line breaks inside, such as a two-tone headline.
 * The whole block cuts out and back rather than the glyphs being redrawn, so
 * the children keep their exact markup.
 *
 * Each strike is a remount, which is what replays the CSS animation from zero.
 */
export function FlickerBlock({ children, className, pace = "primary" }: FlickerBlockProps) {
  const reduceMotion = useReducedMotion();
  const { ref, cycle, inView } = useFlickerLoop<HTMLDivElement>(pace, !reduceMotion);

  // 0 until it has been seen, so nothing strikes offscreen.
  const strike = reduceMotion || !inView ? 0 : cycle + 1;

  return (
    <div ref={ref} className={className}>
      <div key={strike} className={strike ? "flicker-strike" : undefined}>
        {children}
      </div>
    </div>
  );
}
