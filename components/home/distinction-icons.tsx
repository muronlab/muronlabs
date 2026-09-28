import { cn } from "@/lib/utils";

interface DistinctionIconProps {
  /** Index of the distinction, 0-based. */
  index: number;
  className?: string;
}

/**
 * One shared drawing language across the four marks: a 48-unit field, hairline
 * strokes, rounded joins, and geometry kept inside a 6–42 safe area so every
 * mark occupies the same optical weight when set at display size.
 */
const base = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/**
 * Three feeds folding into one hub — the unified execution model. The feed
 * lines run continuously toward the centre, which answers with a slow breath.
 */
function UnifiedIcon({ className }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="6" y="8" width="10" height="7.5" rx="2.5" strokeOpacity={0.55} />
      <rect x="6" y="20.25" width="10" height="7.5" rx="2.5" strokeOpacity={0.55} />
      <rect x="6" y="32.5" width="10" height="7.5" rx="2.5" strokeOpacity={0.55} />

      <g className="icon-flow" strokeOpacity={0.8}>
        <path d="M16 11.75 H22 a4 4 0 0 1 4 4 V20" />
        <path d="M16 24 H26" />
        <path d="M16 36.25 H22 a4 4 0 0 0 4 -4 V28" />
      </g>

      <rect className="icon-breathe" x="26" y="16" width="16" height="16" rx="4.5" />
      <circle className="icon-pulse" cx="34" cy="24" r="2.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * A charge arc with a bolt through it — speed treated as a budget that fills,
 * not a claim. The arc sweeps, the bolt holds the centre.
 */
function PerformanceIcon({ className }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M9 33 A15 15 0 0 1 39 33" strokeOpacity={0.2} />
      <path className="icon-sweep" d="M9 33 A15 15 0 0 1 39 33" />

      {/* Scale ticks, so the arc reads as a measure rather than decoration. */}
      <g strokeOpacity={0.3}>
        <path d="M11.4 26.2 L14.2 27.4" />
        <path d="M24 18.5 V21.6" />
        <path d="M36.6 26.2 L33.8 27.4" />
      </g>

      <path className="icon-breathe" d="M25.5 21 L19.5 30.5 H24 L22.5 37 L29 27.5 H24.5 Z" />
      <path d="M13 40.5 H35" strokeOpacity={0.35} />
    </svg>
  );
}

/**
 * A shield under a moving scan — security checked continuously, not signed off
 * once. The inner outline keeps the silhouette from reading as a flat blob.
 */
function SecurityIcon({ className }: { className?: string }) {
  const shield = "M24 6.5 L38 12 V24.5 c0 9 -6.2 13.8 -14 16.5 C16.2 38.3 10 33.5 10 24.5 V12 Z";
  return (
    <svg {...base} className={className} aria-hidden="true">
      <defs>
        <clipPath id="distinction-shield">
          <path d={shield} />
        </clipPath>
      </defs>

      <path d={shield} />
      <path
        d="M24 11 L33.5 14.7 V24.4 c0 6.2 -4.2 9.6 -9.5 11.6 C18.7 34 14.5 30.6 14.5 24.4 V14.7 Z"
        strokeOpacity={0.25}
      />

      <g clipPath="url(#distinction-shield)">
        <path className="icon-scan" d="M5 24 H43" strokeOpacity={0.5} />
      </g>

      <path className="icon-draw" d="M19 24 l3.8 3.9 L29.5 20.5" />
    </svg>
  );
}

/**
 * A curve drawn with its control handles showing — design held to the same
 * standard as the code underneath it.
 */
function CraftIcon({ className }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <g strokeOpacity={0.3}>
        <path d="M11 33.5 L17.5 26" />
        <path d="M37 14.5 L30.5 22" />
      </g>

      <path
        className="glyph-draw"
        pathLength={1}
        d="M11 33.5 C11 19.5 20 12.5 24 20.5 C28 28.5 37 23 37 14.5"
      />

      <rect x="8.25" y="30.75" width="5.5" height="5.5" rx="1.75" />
      <rect x="34.25" y="11.75" width="5.5" height="5.5" rx="1.75" />
      <circle className="icon-pulse" cx="24" cy="24" r="2.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

const icons = [UnifiedIcon, PerformanceIcon, SecurityIcon, CraftIcon];

/** Animated mark for a distinction point. Pure SVG and CSS — no client JS. */
export function DistinctionIcon({ index, className }: DistinctionIconProps) {
  const Icon = icons[index % icons.length];
  return <Icon className={cn("size-6", className)} />;
}
