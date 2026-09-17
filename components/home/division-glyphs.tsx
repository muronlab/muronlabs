import { cn } from "@/lib/utils";

interface DivisionGlyphProps {
  /** Index of the division group, 0-based. */
  index: number;
  className?: string;
}

const base = {
  viewBox: "0 0 200 150",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/**
 * Muron Dev — a stack of layers compiling: each tier's lines write themselves
 * in turn, with a connector threading the whole build together.
 */
function DevGlyph({ className }: { className?: string }) {
  const tiers = [18, 62, 106];
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path className="icon-flow" d="M22 32 V120" strokeOpacity={0.5} />
      {tiers.map((y, i) => (
        <g key={y}>
          <rect x="34" y={y} width="148" height="32" rx="7" strokeOpacity={0.45} />
          <path
            className={cn("glyph-draw", i === 1 && "icon-delay-1", i === 2 && "icon-delay-2")}
            pathLength={1}
            d={`M50 ${y + 12} H${110 + i * 22}`}
          />
          <path
            className={cn("glyph-draw", i === 0 && "icon-delay-1", i === 1 && "icon-delay-2")}
            pathLength={1}
            d={`M50 ${y + 21} H${86 + i * 14}`}
            strokeOpacity={0.55}
          />
          <circle
            className={cn("icon-pulse", i === 1 && "icon-delay-1", i === 2 && "icon-delay-2")}
            cx="22"
            cy={y + 16}
            r="3.5"
            fill="currentColor"
            stroke="none"
          />
        </g>
      ))}
    </svg>
  );
}

/**
 * Muron AI — a small network firing: signals travel the links while the nodes
 * answer in sequence.
 */
function AiGlyph({ className }: { className?: string }) {
  const inputs = [28, 75, 122];
  const hidden = [50, 100];
  return (
    <svg {...base} className={className} aria-hidden="true">
      <g className="icon-flow" strokeOpacity={0.45}>
        {inputs.map((y) => hidden.map((hy) => <path key={`${y}-${hy}`} d={`M34 ${y} L100 ${hy}`} />))}
        {hidden.map((hy) => (
          <path key={hy} d={`M100 ${hy} L166 75`} />
        ))}
      </g>
      {inputs.map((y, i) => (
        <circle
          key={y}
          className={cn("icon-pulse", i === 1 && "icon-delay-1", i === 2 && "icon-delay-2")}
          cx="30"
          cy={y}
          r="4"
          fill="currentColor"
          stroke="none"
        />
      ))}
      {hidden.map((y, i) => (
        <circle
          key={y}
          className={cn("icon-pulse", i === 0 ? "icon-delay-1" : "icon-delay-2")}
          cx="100"
          cy={y}
          r="5"
          fill="currentColor"
          stroke="none"
        />
      ))}
      <circle className="icon-breathe" cx="170" cy="75" r="9" />
    </svg>
  );
}

/**
 * Muron Arts — a curve under the pen: the path redraws itself while its control
 * handles hold the shape.
 */
function ArtsGlyph({ className }: { className?: string }) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <g strokeOpacity={0.4}>
        <path d="M30 118 L72 34" strokeDasharray="4 5" />
        <path d="M170 38 L128 126" strokeDasharray="4 5" />
      </g>
      <path className="glyph-draw" pathLength={1} d="M30 118 C72 34, 128 126, 170 38" strokeWidth={2} />
      <rect className="icon-pulse" x="67" y="29" width="10" height="10" rx="2" strokeOpacity={0.8} />
      <rect className="icon-pulse icon-delay-2" x="123" y="121" width="10" height="10" rx="2" strokeOpacity={0.8} />
      <circle cx="30" cy="118" r="4.5" fill="currentColor" stroke="none" />
      <circle className="icon-breathe" cx="170" cy="38" r="4.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const glyphs = [DevGlyph, AiGlyph, ArtsGlyph];

/** Animated mark for a capability division. Pure SVG and CSS — no client JS. */
export function DivisionGlyph({ index, className }: DivisionGlyphProps) {
  const Glyph = glyphs[index % glyphs.length];
  return <Glyph className={cn("w-full", className)} />;
}
