"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface CountUpProps {
  value: number;
  suffix?: string;
  decimals?: number;
  className?: string;
  suffixClassName?: string;
}

/** A headline number that counts up from zero once it scrolls into view. */
export function CountUp({ value, suffix = "", decimals = 0, className, suffixClassName }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(v),
    });
    return () => controls.stop();
  }, [inView, value, reduceMotion]);

  // Under reduced motion the final value shows straight away.
  const shown = reduceMotion ? value : n;

  return (
    <span ref={ref} className={cn("inline-flex items-baseline tabular-nums", className)}>
      {shown.toFixed(decimals)}
      {suffix ? <span className={cn("ml-1", suffixClassName)}>{suffix}</span> : null}
    </span>
  );
}
