"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import FuzzyText from "@/components/originkit/ui/text-noise";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

/** Row-shift amplitude (px) of the hover noise. Small — this is a 24px mark. */
const FUZZ_RANGE = 10;
/**
 * FuzzyText pads its canvas by `fuzzRange + 20`px and starts drawing 5px in.
 * Cancelling that with a negative inline margin keeps the canvas glyphs on the
 * exact same horizontal grid as the DOM letters they replace.
 */
const FUZZ_INSET = FUZZ_RANGE + 25;

interface Snapshot {
  color: string;
  /** Vertical nudge that lands the canvas cap-height on the DOM text baseline. */
  offsetY: number;
  font: {
    fontFamily: string;
    fontWeight: number;
    fontSize: string;
    letterSpacing: number;
  };
}

/**
 * Reads the live typography off the rendered wordmark so the canvas copy
 * matches whatever size/colour the mark currently inherits, and measures the
 * baseline offset between a CSS line box and a canvas cap-height draw.
 */
function readSnapshot(el: HTMLElement, sample: string): Snapshot {
  const cs = window.getComputedStyle(el);
  const fontFamily = cs.fontFamily || "sans-serif";
  const fontWeight = Number.parseInt(cs.fontWeight, 10) || 800;
  const fontSize = cs.fontSize || "24px";
  const spacing = Number.parseFloat(cs.letterSpacing);

  let offsetY = 0;
  const ctx = document.createElement("canvas").getContext("2d");
  if (ctx) {
    ctx.font = `${fontWeight} ${fontSize} ${fontFamily}`;
    const m = ctx.measureText(sample);
    const ascent = m.fontBoundingBoxAscent;
    const descent = m.fontBoundingBoxDescent;
    const capAscent = m.actualBoundingBoxAscent;
    if (ascent && descent && capAscent) {
      const lineHeight = Number.parseFloat(cs.lineHeight) || ascent + descent;
      const baseline = (lineHeight - (ascent + descent)) / 2 + ascent;
      offsetY = baseline - capAscent;
    }
  }

  return {
    color: cs.color || "#0a0a0a",
    offsetY,
    font: {
      fontFamily,
      fontWeight,
      fontSize,
      letterSpacing: Number.isNaN(spacing) ? 0 : spacing,
    },
  };
}

function FuzzPart({ text, snapshot }: { text: string; snapshot: Snapshot }) {
  if (!text) return null;

  return (
    <span
      className="wordmark-fuzz-part"
      style={{ marginInline: -FUZZ_INSET, marginTop: snapshot.offsetY }}
    >
      <FuzzyText
        text={text.toUpperCase()}
        font={snapshot.font}
        color={snapshot.color}
        baseIntensity={4}
        hoverIntensity={4}
        fuzzRange={FUZZ_RANGE}
        fps={30}
      />
    </span>
  );
}

interface WordmarkProps {
  className?: string;
  /**
   * Swap the letters for a canvas "text noise" copy while the pointer is over
   * the mark. Opt-in — the footer mark stays static.
   */
  fuzzOnHover?: boolean;
}

/**
 * Brand wordmark — renders `siteConfig.wordmark.text` with the letter at
 * `dotIndex` swapped for the accent dot (e.g. MUR●N). Colour is inherited.
 *
 * With `fuzzOnHover`, hovering cross-fades the letters into a scan-line noise
 * rendering of the same text. The canvas only mounts while hovered (plus a
 * short exit fade), so nothing animates in the header at rest.
 */
export function Wordmark({ className, fuzzOnHover = false }: WordmarkProps) {
  const { text, dotIndex } = siteConfig.wordmark;
  const before = text.slice(0, dotIndex);
  const after = text.slice(dotIndex + 1);

  const hostRef = useRef<HTMLSpanElement>(null);
  const exitRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [active, setActive] = useState(false);

  const reduceMotion = useReducedMotion();
  const enabled = fuzzOnHover && !reduceMotion;

  useEffect(() => () => clearTimeout(exitRef.current), []);

  const handleEnter = () => {
    if (!hostRef.current) return;
    clearTimeout(exitRef.current);
    setSnapshot(readSnapshot(hostRef.current, text));
    setActive(true);
  };

  const handleLeave = () => {
    clearTimeout(exitRef.current);
    setActive(false);
    // Outlives the fade-out so the canvas never pops away mid-transition.
    exitRef.current = setTimeout(() => setSnapshot(null), 240);
  };

  return (
    <span
      ref={hostRef}
      className={cn("wordmark", className)}
      aria-label={siteConfig.name}
      data-fuzz={active || undefined}
      onPointerEnter={enabled ? handleEnter : undefined}
      onPointerLeave={enabled ? handleLeave : undefined}
    >
      <span className="wordmark-letters" aria-hidden="true">
        {before}
      </span>
      <span className="wordmark-dot" aria-hidden="true" />
      <span className="wordmark-letters" aria-hidden="true">
        {after}
      </span>

      {snapshot ? (
        <span className="wordmark-fuzz" aria-hidden="true">
          <FuzzPart text={before} snapshot={snapshot} />
          <span className="wordmark-dot" />
          <FuzzPart text={after} snapshot={snapshot} />
        </span>
      ) : null}
    </span>
  );
}
