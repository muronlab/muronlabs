"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Travel distance in px before settling. */
  y?: number;
  className?: string;
  /** Render as a different element (e.g. "li", "article"). */
  as?: "div" | "li" | "article" | "section" | "span";
  /**
   * Play on page load instead of on scroll. Runs as a pure CSS animation, so
   * it starts at first paint rather than waiting for JavaScript.
   */
  immediate?: boolean;
  /**
   * For the page's main headline (its Largest Contentful Paint): rise into
   * place without fading, so the text counts as painted straight away.
   */
  lcp?: boolean;
  /** Spring the element up slightly on hover (for cards). */
  lift?: boolean;
}

/**
 * Reveal wrapper. Content lifts and fades in with a long, soft ease — on load
 * (`immediate`, CSS) or as it scrolls into view (default, motion). Honours
 * `prefers-reduced-motion`.
 */
export function Reveal({ children, delay = 0, y = 24, className, as = "div", immediate = false, lcp = false, lift = false }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (immediate) {
    const Tag = as;
    const style = { animationDelay: `${delay}s`, ["--reveal-y" as string]: `${y}px` } as CSSProperties;
    return (
      <Tag className={cn(lcp ? "reveal-rise" : "reveal-now", className)} style={style}>
        {children}
      </Tag>
    );
  }

  const Component = motion[as];
  const target = { opacity: 1, y: 0 };

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={target}
      whileHover={lift && !reduceMotion ? { y: -6, transition: { type: "spring", stiffness: 320, damping: 22 } } : undefined}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
