"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * One block of colour: position and size as percentages. `g` picks a `.g-*`
 * gradient; `bg` (when set) is a custom gradient that takes its place.
 */
interface Tile {
  x: number;
  y: number;
  w: number;
  h: number;
  g: number;
  bg?: string;
}

/** Shorthand for the long, multi-stop horizontal gradients of the `band` layout. */
const lg = (...stops: string[]) => `linear-gradient(90deg, ${stops.join(", ")})`;

/**
 * Tile layouts. `mosaic` is the tall column that frames the hero; `strip` is
 * the wide banner under page titles; `bars` the vertical stack on the dark
 * call-out; `stack` a compact square for cards.
 */
const LAYOUTS: Record<"mosaic" | "mosaicRight" | "strip" | "band" | "bars" | "stack", Tile[]> = {
  /*
    The closing call-out band: five rows of long bands, each blending coral,
    pink, purple and lavender along its length. Colours sampled from the
    reference. Rows: 0–25%, 25–42%, 42–70%, 70–91%, 91–100%.
  */
  strip: [], // derived from `band` below
  band: [
    { x: 0, y: 0, w: 30.5, h: 25, g: 0, bg: lg("#fb8885", "#fb8fc8 40%", "#cf75e6 70%", "#9e5ef2") },
    { x: 30.5, y: 0, w: 69.5, h: 25, g: 0, bg: lg("#fa796d", "#fa819a 15%", "#fc9ecf 30%", "#f9b2e9 45%", "#b065ed 75%", "#a060f2") },
    { x: 0, y: 25, w: 30.5, h: 17, g: 0, bg: lg("#fb877e", "#fa7eaf 60%", "#f588dd") },
    { x: 30.5, y: 25, w: 39, h: 17, g: 0, bg: lg("#fa7b72", "#fa82bb 25%", "#d47ce6 50%", "#9650f0 80%", "#9d5cf2") },
    { x: 69.5, y: 25, w: 30.5, h: 17, g: 0, bg: lg("#fa827b", "#fb8fc9 30%", "#c383ef 70%", "#c8a2f7") },
    { x: 0, y: 42, w: 30.5, h: 49, g: 0, bg: lg("#944df0", "#af5be9 20%", "#f884da 50%", "#fa7f96 75%", "#fb8076") },
    { x: 30.5, y: 42, w: 39, h: 28, g: 0, bg: lg("#fa7b71", "#fb88bd 30%", "#d581e6 50%", "#c196f6 80%", "#b889f5") },
    { x: 69.5, y: 42, w: 30.5, h: 28, g: 0, bg: lg("#f8a6e5", "#fa8ec2 30%", "#fb8397 65%", "#fb8078") },
    { x: 30.5, y: 70, w: 69.5, h: 21, g: 0, bg: lg("#9d5cf1", "#9651f0 10%", "#d57ee6 35%", "#f689dc 55%", "#fa8296 80%", "#fa857d") },
    { x: 0, y: 91, w: 69.5, h: 9, g: 0, bg: lg("#fc978f", "#fb8bb7 25%", "#f081dc 45%", "#a664f0 75%", "#9f5ff2") },
    { x: 69.5, y: 91, w: 30.5, h: 9, g: 0, bg: lg("#fb8881", "#fb8bc6 35%", "#b564ea 70%", "#9a57f1") },
  ],
  mosaic: [
    { x: 0, y: 0, w: 100, h: 17, g: 1 },
    { x: 0, y: 17, w: 62, h: 18, g: 2 },
    { x: 0, y: 35, w: 20, h: 6, g: 3 },
    { x: 0, y: 41, w: 33, h: 10, g: 1 },
    { x: 0, y: 51, w: 23, h: 4, g: 5 },
    { x: 0, y: 55, w: 48, h: 20, g: 4 },
    { x: 0, y: 75, w: 73, h: 8, g: 6 },
    { x: 0, y: 83, w: 100, h: 17, g: 2 },
  ],
  /* The right-hand column: anchored to the right edge, with its own colours. */
  mosaicRight: [
    { x: 0, y: 0, w: 100, h: 17, g: 7 },
    { x: 0, y: 17, w: 73, h: 7, g: 5 },
    { x: 0, y: 24, w: 48, h: 20, g: 1 },
    { x: 0, y: 44, w: 23, h: 4, g: 3 },
    { x: 0, y: 48, w: 33, h: 10, g: 1 },
    { x: 0, y: 58, w: 20, h: 6, g: 3 },
    { x: 0, y: 65, w: 62, h: 18, g: 12 },
    { x: 0, y: 83, w: 100, h: 17, g: 16 },
  ],
  bars: [
    { x: 0, y: 0, w: 15, h: 100, g: 10 },
    { x: 15, y: 8, w: 17, h: 92, g: 9 },
    { x: 32, y: 0, w: 16, h: 60, g: 13 },
    { x: 32, y: 60, w: 16, h: 40, g: 10 },
    { x: 48, y: 15, w: 15, h: 85, g: 14 },
    { x: 63, y: 0, w: 16, h: 45, g: 9 },
    { x: 63, y: 45, w: 16, h: 55, g: 13 },
    { x: 79, y: 10, w: 21, h: 90, g: 10 },
  ],
  stack: [
    { x: 0, y: 0, w: 100, h: 20, g: 1 },
    { x: 0, y: 20, w: 62, h: 22, g: 2 },
    { x: 62, y: 20, w: 38, h: 22, g: 12 },
    { x: 0, y: 42, w: 30, h: 16, g: 3 },
    { x: 30, y: 42, w: 70, h: 16, g: 4 },
    { x: 0, y: 58, w: 100, h: 20, g: 7 },
    { x: 0, y: 78, w: 45, h: 22, g: 6 },
    { x: 45, y: 78, w: 55, h: 22, g: 16 },
  ],
};

/*
  The wide banner under page titles: the same long, grainy bands as the
  closing call-out, flipped top-to-bottom so the two never look identical.
*/
LAYOUTS.strip = LAYOUTS.band.map((t) => ({ ...t, y: 100 - t.y - t.h }));

export type GradientArtVariant = keyof typeof LAYOUTS;

interface GradientArtProps {
  variant?: GradientArtVariant;
  /** Anchor tiles to the right edge instead of the left. */
  mirror?: boolean;
  className?: string;
  /** Extra delay before the tiles start appearing. */
  delay?: number;
  /** Extra class on every tile (e.g. "hero-bar" for the hero's flow animation). */
  tileClassName?: string;
  /**
   * When set, each tile gets its own flow/sweep timing (CSS variables read by
   * `.hero-bar`). Use a different seed per column so columns never sync.
   */
  flowSeed?: number;
}

/**
 * The site's only colour: a mosaic of grainy purple–pink–coral gradient tiles.
 * Each tile appears with a short stagger, then slowly breathes forever.
 */
export function GradientArt({ variant = "mosaic", mirror = false, className, delay = 0, tileClassName, flowSeed }: GradientArtProps) {
  const reduceMotion = useReducedMotion();
  const tiles = LAYOUTS[variant];

  return (
    <div aria-hidden="true" className={cn("relative overflow-hidden", className)}>
      {tiles.map((t, i) => {
        const style: CSSProperties = {
          top: `${t.y}%`,
          width: `${t.w}%`,
          height: `${t.h}%`,
          ["--delay" as string]: `${(i * 0.9) % 6}s`,
          ["--dur" as string]: `${8 + (i % 4) * 2}s`,
        };
        if (t.bg) style.backgroundImage = t.bg;
        if (mirror) style.right = `${t.x}%`;
        else style.left = `${t.x}%`;

        if (flowSeed !== undefined) {
          // Spread timings with a prime step so no two tiles share a phase.
          const k = (i * 5 + flowSeed * 3) % 9; // 0–8
          Object.assign(style, {
            "--flow-dur": `${6 + k}s`, // 6–14s
            "--flow-delay": `-${((i * 1.7 + flowSeed * 2.3) % 14).toFixed(2)}s`,
            "--sweep-dur": `${8 + ((i * 3 + flowSeed) % 5)}s`, // 8–12s
            "--sweep-delay": `-${((i * 2.9 + flowSeed * 1.3) % 12).toFixed(2)}s`,
          });
        }

        // A slow light pass across every bar (hero bars have their own sweep).
        const sweep = !tileClassName?.includes("hero-bar");
        if (sweep) {
          Object.assign(style, {
            "--sw-dur": `${9 + ((i * 7) % 6)}s`, // 9–14s
            "--sw-delay": `-${((i * 3.1) % 11).toFixed(2)}s`,
          });
        }

        return (
          <motion.div
            key={i}
            className={cn("tile grain absolute", t.bg ? "band-tile" : `g-${t.g}`, sweep && "tile-sweep", tileClassName)}
            // Each bar grows out from the edge it is anchored to, row by row.
            style={{ ...style, originX: mirror ? 1 : 0 }}
            initial={{ opacity: 0, scaleX: 0.15 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "0px 0px -5% 0px" }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    scaleX: { duration: 1.1, delay: delay + t.y * 0.008 + t.x * 0.004, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.5, delay: delay + t.y * 0.008 + t.x * 0.004 },
                  }
            }
          />
        );
      })}
    </div>
  );
}
