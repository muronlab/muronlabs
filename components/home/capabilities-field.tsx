"use client";

import dynamic from "next/dynamic";
import { LazyVisual } from "@/components/ui/lazy-visual";

/** Brand violet drifting to white at the hot end of each streak. */
const FIELD_COLOR = "#9B8CFF";
const FIELD_HOT = "#FFFFFF";

/** Static stand-in: the same sweep of light, painted with gradients. */
function FieldFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 opacity-70"
      style={{
        background: `radial-gradient(60% 120% at 18% 50%, ${FIELD_COLOR}55 0%, transparent 70%), radial-gradient(40% 90% at 72% 40%, ${FIELD_HOT}22 0%, transparent 75%)`,
      }}
    />
  );
}

const GlowingParticles = dynamic(
  () => import("@/components/originkit/ui/glowing-particles"),
  { ssr: false, loading: () => <FieldFallback /> },
);

/**
 * Particle streak field behind the capability index header. Additive blending
 * means it only reads on a dark surface, which is why the band it fills is dark
 * rather than following the section background.
 */
export function CapabilitiesField() {
  return (
    <LazyVisual fallback={<FieldFallback />}>
      <GlowingParticles
        color={FIELD_COLOR}
        hot={FIELD_HOT}
        density={13}
        streak={9}
        speed={16}
        size={4}
        rim={20}
        haze={26}
        spin={14}
        direction="right"
        sizePercent={92}
        style={{ minWidth: 0, minHeight: 0 }}
      />
    </LazyVisual>
  );
}
