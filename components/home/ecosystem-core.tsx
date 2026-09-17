"use client";

import dynamic from "next/dynamic";
import { LazyVisual } from "@/components/ui/lazy-visual";

/**
 * Palette driving the WebGL ring. Ordered to echo the division accents:
 * violet (Dev) → indigo (AI) → rose (Arts). Re-used by the legend so the
 * on-canvas colours and the labels never drift apart.
 */
export const coreColors = ["#7C5CFF", "#4F46E5", "#F43F5E"];

/**
 * Static stand-in shown before the canvas mounts and for visitors who prefer
 * reduced motion — same silhouette, no animation, no WebGL context.
 */
function CoreFallback() {
  return (
    <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
      <div
        className="aspect-square h-[58%] rounded-full opacity-60 blur-2xl"
        style={{
          background: `conic-gradient(from 210deg, ${coreColors[0]}, ${coreColors[1]}, ${coreColors[2]}, ${coreColors[0]})`,
          maskImage:
            "radial-gradient(circle, transparent 52%, black 56%, black 76%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(circle, transparent 52%, black 56%, black 76%, transparent 80%)",
        }}
      />
    </div>
  );
}

/**
 * `ssr: false` is only legal inside a Client Component, so the dynamic import
 * lives here rather than in the (server-rendered) ecosystem section. Keeping it
 * client-only also avoids shipping the shader source in the server payload.
 */
const PlasmaRing = dynamic(
  () => import("@/components/originkit/ui/plasma-ring"),
  { ssr: false, loading: () => <CoreFallback /> },
);

/**
 * The animated ecosystem "core": an orbitable plasma ring. The render loop is
 * only started once the panel is near the viewport, so the canvas never spins
 * offscreen while the rest of the homepage loads.
 */
export function EcosystemCore() {
  return (
    <LazyVisual fallback={<CoreFallback />}>
      <PlasmaRing
        background="transparent"
        colors={coreColors}
        density={110}
        speed={85}
        waveHeight={18}
        centerOpacity={28}
        scale={78}
        style={{ position: "absolute", inset: 0, minWidth: 0, minHeight: 0 }}
      />
    </LazyVisual>
  );
}
