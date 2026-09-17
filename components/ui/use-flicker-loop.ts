"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

/**
 * Idle re-strike cadences, in seconds. Each instance picks a fresh wait inside
 * its window every cycle, so nothing on the page ever flickers in lockstep.
 * Page and section titles carry the effect; everything beneath them idles far
 * longer, so a screen full of labels never strobes.
 */
export const REPEAT_WINDOW = {
  primary: [2, 4.5],
  secondary: [9, 17],
} as const;

export type FlickerPace = keyof typeof REPEAT_WINDOW;

/**
 * Drives the repeat rhythm shared by the flicker effects: counts a cycle at a
 * random interval for as long as the element is on screen, and stops dead when
 * it isn't. Callers decide what a cycle means — remounting a canvas effect, or
 * replaying a CSS strike.
 */
export function useFlickerLoop<T extends HTMLElement>(pace: FlickerPace, enabled: boolean) {
  const ref = useRef<T>(null);
  const inView = useInView(ref);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!enabled || !inView) return;

    const [min, max] = REPEAT_WINDOW[pace];

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
  }, [enabled, inView, pace]);

  return { ref, cycle, inView };
}
