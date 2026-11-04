import { cn } from "@/lib/utils";

type Kind = "venn" | "rings" | "orbit" | "dots";

/** Thin line drawings used on the light "why" cards. Inherits `currentColor`. */
export function LineMotif({ kind, className }: { kind: Kind; className?: string }) {
  const shared = { fill: "none", stroke: "currentColor", strokeWidth: 1.25, vectorEffect: "non-scaling-stroke" as const };

  return (
    <svg viewBox="0 0 160 110" aria-hidden="true" className={cn("h-24 w-auto", className)}>
      <defs>
        <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M0 3h6" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      {kind === "venn" ? (
        <>
          <circle cx="60" cy="55" r="40" {...shared} />
          <circle cx="100" cy="55" r="40" {...shared} />
          <path d="M80 20.4a40 40 0 0 1 0 69.2a40 40 0 0 1 0-69.2z" fill="url(#hatch)" />
        </>
      ) : null}
      {kind === "rings" ? (
        <>
          <circle cx="80" cy="55" r="46" {...shared} />
          <circle cx="80" cy="55" r="32" {...shared} />
          <circle cx="80" cy="55" r="18" {...shared} />
          <circle cx="80" cy="55" r="5" fill="currentColor" />
        </>
      ) : null}
      {kind === "orbit" ? (
        <>
          <circle cx="80" cy="55" r="44" {...shared} strokeDasharray="3 5" />
          <circle cx="80" cy="55" r="22" {...shared} />
          <circle cx="124" cy="55" r="5" fill="currentColor" />
          <circle cx="80" cy="55" r="3" fill="currentColor" />
        </>
      ) : null}
      {kind === "dots" ? (
        <>
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => (
              <circle key={`${r}${c}`} cx={44 + c * 36} cy={19 + r * 36} r={r === 1 && c === 1 ? 10 : 4} {...shared} />
            )),
          )}
          <circle cx="80" cy="55" r="10" fill="url(#hatch)" />
        </>
      ) : null}
    </svg>
  );
}
