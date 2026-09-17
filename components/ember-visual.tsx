"use client";

import dynamic from "next/dynamic";
import { LazyVisual } from "@/components/ui/lazy-visual";

/** Panel surface. Shared with the section so the canvas edge is invisible. */
export const EMBER_SURFACE = "#140303";
const EMBER_GLOW = "#FF2606";
const EMBER_CORE = "#FF3B00";

/** Static stand-in: the husk's ember glow without the scene behind it. */
function EmberFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        background: `radial-gradient(45% 40% at 50% 55%, ${EMBER_CORE}66 0%, ${EMBER_GLOW}22 45%, transparent 72%), ${EMBER_SURFACE}`,
      }}
    />
  );
}

const EmberHusk = dynamic(() => import("@/components/originkit/ui/ember-husk"), {
  ssr: false,
  loading: () => <EmberFallback />,
});

/**
 * The studio showpiece: a fractured husk with a live core, which scatters and
 * settles as the pointer crosses it. Heavy (WebGL + a physics step), so it only
 * builds once the panel is near the viewport and never for reduced motion.
 */
export function EmberVisual() {
  return (
    <LazyVisual fallback={<EmberFallback />}>
      <EmberHusk
        quality="medium"
        size={3.9}
        background={{ color: EMBER_SURFACE, glowColor: EMBER_GLOW, glow: 6 }}
        core={{ color: EMBER_CORE, hotColor: "#FFC46A", intensity: 6, flow: 5 }}
        style={{ position: "absolute", inset: 0 }}
      />
    </LazyVisual>
  );
}
