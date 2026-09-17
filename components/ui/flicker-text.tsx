"use client";

import type { CSSProperties } from "react";
import { useReducedMotion } from "motion/react";
import FlickerSource from "@/components/originkit/ui/flickertext";
import { useFlickerLoop, type FlickerPace } from "@/components/ui/use-flicker-loop";
import { cn } from "@/lib/utils";

type FlickerTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

/**
 * The Originkit component styles its element inline, so every typographic
 * property is handed back to the wrapper (and therefore to Tailwind) by
 * inheriting it. Colour is deliberately absent — the component owns that.
 */
const INHERIT: CSSProperties = {
  margin: 0,
  padding: 0,
  fontFamily: "inherit",
  fontSize: "inherit",
  fontWeight: "inherit",
  fontStyle: "inherit",
  lineHeight: "inherit",
  letterSpacing: "inherit",
  textTransform: "inherit",
  textAlign: "inherit",
  textWrap: "inherit",
};

interface Gradient {
  from: string;
  to: string;
  angle?: number;
}

type FlickerVariant = "letters" | "tube";

/**
 * Flicker timings. `letters` drops one or two glyphs at a time — a faulty-panel
 * shimmer that keeps long headings readable. `tube` cuts the whole word in and
 * out like a strip light striking, which suits short mono labels.
 */
function config(variant: FlickerVariant, duration: number, delay: number) {
  const shared = {
    position: "above",
    replay: "no",
    restState: "filled",
    delay,
    showStroke: false,
    strokePosition: "start",
    strokeCount: 1,
    strokeColor: "#ffffff",
    strokeWidth: 1.5,
    shakeEnabled: false,
    shakeWidth: 10,
    shakeSpeed: 10,
    letterFlickerMode: "opacity",
    letterFlickerOpacity: 20,
    letterFlickerIntensity: 13,
  };

  if (variant === "tube") {
    return {
      ...shared,
      ease: { type: "tween", duration, ease: "easeIn" },
      flickerCount: 4,
      wordFlickerEnabled: true,
      letterFlickerEnabled: false,
    };
  }

  return {
    ...shared,
    ease: { type: "tween", duration, ease: "easeOut" },
    flickerCount: 6,
    wordFlickerEnabled: false,
    letterFlickerEnabled: true,
  };
}

interface FlickerTextProps {
  text: string;
  /** Put on the wrapper, for `aria-labelledby` targets. */
  id?: string;
  /** Rendered tag. The effect only supports headings and paragraphs. */
  as?: FlickerTag;
  /** Typography and colour classes. Applied to the wrapper; the text inherits. */
  className?: string;
  /** Two-stop fill. Tailwind gradient classes can't be used — the element paints itself. */
  gradient?: Gradient;
  variant?: FlickerVariant;
  /** Seconds to wait after the text scrolls into view. */
  delay?: number;
  /** Replay the flicker when the pointer enters (after the entrance has run). */
  onHover?: boolean;
  /**
   * Keep striking at random intervals for as long as the text is on screen,
   * rather than flickering once on the way in.
   */
  repeat?: boolean;
  /**
   * How often it re-strikes. `primary` is for the one heading that leads a
   * screen; everything subordinate to it should stay on the default.
   */
  pace?: FlickerPace;
  /** Shrink the wrapper to the text, for use inside a flex or inline row. */
  inline?: boolean;
}

/**
 * Wraps the Originkit flicker effect so it can be dropped in wherever a heading
 * or label already lives: Tailwind keeps control of the type, the effect only
 * drives the fill. Falls back to plain static text under `prefers-reduced-motion`.
 */
export function FlickerText({
  text,
  id,
  as = "h2",
  className,
  gradient,
  variant = "letters",
  delay = 0,
  onHover = false,
  repeat = true,
  pace = "secondary",
  inline = false,
}: FlickerTextProps) {
  const reduceMotion = useReducedMotion();
  const Tag = as;

  /**
   * The effect itself only knows how to play on entrance, so each repeat is a
   * remount: the fresh instance sees itself intersecting and strikes again.
   */
  const { ref: hostRef, cycle } = useFlickerLoop<HTMLDivElement>(pace, repeat && !reduceMotion);

  /**
   * A gradient fill is painted by the element itself and clipped to the glyphs,
   * so dimming a single letter's <span> can't show through it. Word-level
   * flicker clears the whole fill, which does. Gradients therefore always strike.
   */
  const mode: FlickerVariant = gradient ? "tube" : variant;

  const fill: CSSProperties = gradient
    ? {
        background: `linear-gradient(${gradient.angle ?? 90}deg, ${gradient.from}, ${gradient.to})`,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
      }
    : { color: "inherit" };

  return (
    <div ref={hostRef} id={id} className={cn(inline && "inline-block", className)}>
      {reduceMotion ? (
        <Tag style={{ ...INHERIT, ...fill }}>{text}</Tag>
      ) : (
        <FlickerSource
          key={cycle}
          tag={as}
          text={text}
          font={INHERIT}
          colorMode={gradient ? "gradient" : "solid"}
          fontColor="currentColor"
          gradientStart={gradient?.from}
          gradientEnd={gradient?.to}
          gradientAngle={gradient?.angle ?? 90}
          textEnterFlickerEnabled
          flicker={config(mode, mode === "tube" ? 0.9 : 1.2, cycle === 0 ? delay : 0)}
          textHoverFlickerEnabled={onHover}
          flickerHover={config(mode, mode === "tube" ? 0.6 : 0.8, 0)}
          imageEnterFlickerEnabled={false}
          imageHoverFlickerEnabled={false}
        />
      )}
    </div>
  );
}
