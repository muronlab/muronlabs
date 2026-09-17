import { cn } from "@/lib/utils";

interface DistinctionIconProps {
  /** Index of the distinction, 0-based. */
  index: number;
  className?: string;
}

const base = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/**
 * Three flows folding into one hub — the unified execution model. The feed
 * lines run continuously toward the centre, which answers with a pulse.
 */
function UnifiedIcon({ className }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <g className="icon-flow" strokeOpacity={0.75}>
        <path d="M13 10 H26 a4 4 0 0 1 4 4 V19" />
        <path d="M13 24 H29" />
        <path d="M13 38 H26 a4 4 0 0 0 4 -4 V29" />
      </g>
      <circle className="icon-pulse" cx="9.5" cy="10" r="2.5" fill="currentColor" stroke="none" />
      <circle className="icon-pulse icon-delay-1" cx="9.5" cy="24" r="2.5" fill="currentColor" stroke="none" />
      <circle className="icon-pulse icon-delay-2" cx="9.5" cy="38" r="2.5" fill="currentColor" stroke="none" />
      <rect className="icon-breathe" x="30" y="19" width="10" height="10" rx="2.5" />
    </svg>
  );
}

/**
 * A meter under load — the dial fills and the needle sweeps, then settles.
 */
function PerformanceIcon({ className }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M9 33 A15 15 0 0 1 39 33" strokeOpacity={0.25} />
      <path className="icon-sweep" d="M9 33 A15 15 0 0 1 39 33" />
      <g className="icon-needle">
        <path d="M24 33 L32 24" />
      </g>
      <circle cx="24" cy="33" r="2.5" fill="currentColor" stroke="none" />
      <path className="icon-flow icon-delay-1" d="M14 40 H34" strokeOpacity={0.4} />
    </svg>
  );
}

/**
 * A shield being swept — security checked continuously, not signed off once.
 */
function SecurityIcon({ className }: { className?: string }) {
  const shield = "M24 7 L38 12 V25 c0 8.5 -6.5 13 -14 16 c-7.5 -3 -14 -7.5 -14 -16 V12 Z";
  return (
    <svg {...base} className={className} aria-hidden="true">
      <defs>
        <clipPath id="distinction-shield">
          <path d={shield} />
        </clipPath>
      </defs>
      <path d={shield} />
      <g clipPath="url(#distinction-shield)">
        <path className="icon-scan" d="M6 24 H42" strokeOpacity={0.55} />
      </g>
      <path className="icon-draw" d="M18 24 l4.5 4.5 L31 20" />
    </svg>
  );
}

const icons = [UnifiedIcon, PerformanceIcon, SecurityIcon];

/** Animated mark for a distinction card. Pure SVG and CSS — no client JS. */
export function DistinctionIcon({ index, className }: DistinctionIconProps) {
  const Icon = icons[index % icons.length];
  return <Icon className={cn("size-6", className)} />;
}
