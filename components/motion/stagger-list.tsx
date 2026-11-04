"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const list: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.15, staggerChildren: 0.06 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 380, damping: 24 } },
};

/**
 * A list whose items pop in one after another the first time it scrolls into
 * view — used for tag chips. Pair with `StaggerItem` for each `<li>`.
 */
export function StaggerList({ children, className, ...rest }: { children: ReactNode; className?: string; "aria-label"?: string }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <ul className={className} {...rest}>{children}</ul>;
  return (
    <motion.ul className={className} variants={list} initial="hidden" whileInView="show" viewport={{ once: true, margin: "0px 0px -8% 0px" }} {...rest}>
      {children}
    </motion.ul>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <li className={className}>{children}</li>;
  return (
    <motion.li className={className} variants={item}>
      {children}
    </motion.li>
  );
}
