"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/**
 * A thin brand-gradient bar along the bottom of the navbar that fills as the
 * page scrolls. Spring-smoothed so it glides rather than ticks.
 */
export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[linear-gradient(90deg,#934bf0,#fa7fd8_55%,#fa7465)]"
      style={{ scaleX: reduceMotion ? scrollYProgress : scaleX }}
    />
  );
}
