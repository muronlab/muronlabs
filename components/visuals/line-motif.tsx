"use client";

import { motion, useReducedMotion, type Transition } from "motion/react";
import { cn } from "@/lib/utils";

type Kind = "venn" | "rings" | "orbit" | "dots";

const VIEW = { once: true, margin: "0px 0px -15% 0px" } as const;
const EASE: Transition["ease"] = [0.65, 0, 0.35, 1];

/**
 * Thin line drawings used on the light "why" cards. Inherits `currentColor`.
 * As the card scrolls into view the strokes draw themselves in one after
 * another, then the solid dots and hatching settle in.
 */
export function LineMotif({ kind, className }: { kind: Kind; className?: string }) {
  const reduceMotion = useReducedMotion();
  const shared = { fill: "none", stroke: "currentColor", strokeWidth: 1.25, vectorEffect: "non-scaling-stroke" as const };

  /** A stroke that draws in; `i` staggers it after the previous ones. */
  const draw = (i: number) =>
    reduceMotion
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: VIEW,
          transition: { pathLength: { duration: 1.1, delay: 0.15 + i * 0.2, ease: EASE }, opacity: { duration: 0.2, delay: 0.15 + i * 0.2 } },
        };
  /** A filled shape that pops in after the strokes. */
  const pop = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { scale: 0, opacity: 0 },
          whileInView: { scale: 1, opacity: 1 },
          viewport: VIEW,
          transition: { type: "spring" as const, stiffness: 260, damping: 16, delay },
        };
  /** A fill (hatching, dashed ring) that fades in. */
  const fade = (delay: number) =>
    reduceMotion
      ? {}
      : { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: VIEW, transition: { duration: 0.6, delay } };

  return (
    <svg viewBox="0 0 160 110" aria-hidden="true" className={cn("h-24 w-auto overflow-visible", className)}>
      <defs>
        <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M0 3h6" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      {kind === "venn" ? (
        <>
          <motion.circle cx="60" cy="55" r="40" {...shared} {...draw(0)} />
          <motion.circle cx="100" cy="55" r="40" {...shared} {...draw(1)} />
          <motion.path d="M80 20.4a40 40 0 0 1 0 69.2a40 40 0 0 1 0-69.2z" fill="url(#hatch)" {...fade(1.2)} />
        </>
      ) : null}
      {kind === "rings" ? (
        <>
          <motion.circle cx="80" cy="55" r="46" {...shared} {...draw(0)} />
          <motion.circle cx="80" cy="55" r="32" {...shared} {...draw(1)} />
          <motion.circle cx="80" cy="55" r="18" {...shared} {...draw(2)} />
          <motion.circle cx="80" cy="55" r="5" fill="currentColor" style={{ originX: "80px", originY: "55px" }} {...pop(1.3)} />
        </>
      ) : null}
      {kind === "orbit" ? (
        <>
          {/* The dashed orbit fades in and turns once into place (dashes can't draw). */}
          <motion.circle
            cx="80"
            cy="55"
            r="44"
            {...shared}
            strokeDasharray="3 5"
            style={{ originX: "80px", originY: "55px" }}
            {...(reduceMotion
              ? {}
              : {
                  initial: { opacity: 0, rotate: -120 },
                  whileInView: { opacity: 1, rotate: 0 },
                  viewport: VIEW,
                  transition: { duration: 1.4, delay: 0.15, ease: EASE },
                })}
          />
          <motion.circle cx="80" cy="55" r="22" {...shared} {...draw(1)} />
          <motion.circle cx="124" cy="55" r="5" fill="currentColor" {...pop(1.1)} />
          <motion.circle cx="80" cy="55" r="3" fill="currentColor" {...pop(1.25)} />
        </>
      ) : null}
      {kind === "dots" ? (
        <>
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => (
              <motion.circle
                key={`${r}${c}`}
                cx={44 + c * 36}
                cy={19 + r * 36}
                r={r === 1 && c === 1 ? 10 : 4}
                {...shared}
                {...draw((r + c) * 0.5)}
              />
            )),
          )}
          <motion.circle cx="80" cy="55" r="10" fill="url(#hatch)" {...fade(1.3)} />
        </>
      ) : null}
    </svg>
  );
}
