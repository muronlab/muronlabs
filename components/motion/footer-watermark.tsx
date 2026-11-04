"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * The giant faint name at the foot of the page. It rises out of the line
 * below it as the footer comes into view. Drawn via CSS (`data-watermark`)
 * so it isn't read as page text.
 */
export function FooterWatermark({ text, className }: { text: string; className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      data-watermark={text}
      className={className}
      initial={reduceMotion ? false : { y: "45%", opacity: 0 }}
      whileInView={{ y: "0%", opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -5% 0px" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
