"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

/**
 * Base idle window between re-strikes, in seconds, before the text's own
 * reading time is added. Page and section titles carry the effect; everything
 * beneath them idles far longer, so a screen full of labels never strobes.
 */
const REPEAT_BASE = {
  primary: [3, 5.5],
  secondary: [8, 14],
} as const;

export type FlickerPace = keyof typeof REPEAT_BASE;

/**
 * Seconds of quiet added per character. Prose reads at roughly 17 characters a
 * second, so this leaves about half again as long as it takes to read the line
 * — a long heading gets a noticeably longer rest than a two-word label.
 */
const SECONDS_PER_CHAR = 0.09;

/** Past this the line is being skimmed, not read; stops very long copy stalling. */
const MAX_CHARS = 90;

/** The interval window for a given pace and text length. */
export function repeatWindow(pace: FlickerPace, chars: number) {
  const [min, max] = REPEAT_BASE[pace];
  const reading = Math.min(chars, MAX_CHARS) * SECONDS_PER_CHAR;
  return [min + reading, max + reading] as const;
}

/**
 * Drives the repeat rhythm of the flicker effect: counts a cycle at a random
 * interval for as long as the element is on screen, and stops dead when it
 * isn't. The interval is drawn fresh each cycle, so nothing on the page ever
 * flickers in lockstep.
 */
export function useFlickerLoop<T extends HTMLElement>(
  pace: FlickerPace,
  enabled: boolean,
  chars: number,
) {
  const ref = useRef<T>(null);
  const inView = useInView(ref);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!enabled || !inView) return;

    const [min, max] = repeatWindow(pace, chars);

    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const wait = min + Math.random() * (max - min);
      timer = setTimeout(() => {
        setCycle((c) => c + 1);
        schedule();
      }, wait * 1000);
    };

    schedule();
    return () => clearTimeout(timer);
  }, [enabled, inView, pace, chars]);

  return { ref, cycle, inView };
}
