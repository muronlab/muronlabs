import { cn } from "@/lib/utils";
import type { ArtKind } from "@/lib/site-config";

/** Four gradient quadrants — the shared core of every panel. */
function GradientQuad({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 grid-rows-2 overflow-hidden", className)}>
      <div className="tile grain relative g-11" style={{ ["--delay" as string]: "0s" }} />
      <div className="tile grain relative g-15" style={{ ["--delay" as string]: "2s" }} />
      <div className="tile grain relative g-3" style={{ ["--delay" as string]: "4s" }} />
      <div className="tile grain relative g-16" style={{ ["--delay" as string]: "1s" }} />
    </div>
  );
}

function Marker({ className, glyph = "+" }: { className?: string; glyph?: "+" | "×" }) {
  return (
    <span aria-hidden="true" className={cn("absolute select-none text-[22px] leading-none text-[#c3cad0]", className)}>
      {glyph}
    </span>
  );
}

interface ArtPanelProps {
  kind: ArtKind;
  className?: string;
}

/**
 * The illustration beside each division: a pale panel with faint construction
 * lines and a gradient figure at the centre — a square on a grid, a diamond
 * between two grey diamonds, or an orb inside orbiting rings.
 */
export function ArtPanel({ kind, className }: ArtPanelProps) {
  return (
    <div aria-hidden="true" className={cn("relative overflow-hidden rounded-[4px] bg-art", className)}>
      {kind === "grid" ? (
        <>
          <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgb(0_0_0/0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgb(0_0_0/0.045)_1px,transparent_1px)] [background-size:25%_25%] [background-position:-1px_-1px]" />
          <div className="absolute left-[25%] top-[2%] size-[22%] bg-art-2" />
          <div className="absolute left-[2%] top-[27%] size-[22%] bg-art-2" />
          <div className="absolute left-[76%] top-[51%] size-[22%] bg-art-2" />
          <div className="absolute left-[50%] top-[76%] size-[22%] bg-art-2" />
          <GradientQuad className="absolute left-1/2 top-1/2 size-[46%] -translate-x-1/2 -translate-y-1/2" />
          <Marker className="left-[calc(27%-11px)] top-[calc(27%-11px)]" />
          <Marker className="left-[calc(73%-11px)] top-[calc(27%-11px)]" />
          <Marker className="left-[calc(27%-11px)] top-[calc(73%-11px)]" />
          <Marker className="left-[calc(73%-11px)] top-[calc(73%-11px)]" />
          <Marker className="left-[calc(50%-11px)] top-[calc(27%-11px)]" />
          <Marker className="left-[calc(50%-11px)] top-[calc(73%-11px)]" />
          <Marker className="left-[calc(27%-11px)] top-[calc(50%-11px)]" />
          <Marker className="left-[calc(73%-11px)] top-[calc(50%-11px)]" />
        </>
      ) : null}

      {kind === "diamond" ? (
        <>
          <div className="absolute left-1/2 top-1/2 h-px w-full -translate-x-1/2 bg-black/5" />
          <div className="absolute left-1/2 top-1/2 h-full w-px -translate-x-1/2 -translate-y-1/2 bg-black/5" />
          <div className="absolute left-[-6%] top-1/2 size-[46%] -translate-y-1/2 rotate-45 bg-art-2/80" />
          <div className="absolute right-[-6%] top-1/2 size-[46%] -translate-y-1/2 rotate-45 bg-art-2/80" />
          <div className="absolute left-1/2 top-1/2 size-[62%] -translate-x-1/2 -translate-y-1/2 rotate-45 border border-black/5" />
          <GradientQuad className="absolute left-1/2 top-1/2 size-[38%] -translate-x-1/2 -translate-y-1/2 rotate-45" />
          <Marker glyph="×" className="left-[calc(50%-7px)] top-[calc(19%-11px)]" />
          <Marker glyph="×" className="left-[calc(50%-7px)] top-[calc(81%-11px)]" />
          <Marker glyph="×" className="left-[calc(19%-7px)] top-[calc(50%-11px)]" />
          <Marker glyph="×" className="left-[calc(81%-7px)] top-[calc(50%-11px)]" />
        </>
      ) : null}

      {kind === "wave" ? (
        <>
          {/* Faint signal traces, like stacked EEG channels. */}
          <svg viewBox="0 0 400 400" preserveAspectRatio="none" className="absolute inset-0 size-full text-black/[0.07]">
            {[60, 120, 180, 220, 280, 340].map((y, i) => (
              <path
                key={y}
                d={`M0 ${y} C 50 ${y - 18 - i * 2}, 90 ${y + 18}, 140 ${y} S 230 ${y - 22}, 280 ${y} S 360 ${y + 16}, 400 ${y}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
          <div className="absolute left-1/2 top-1/2 h-[76%] w-px -translate-x-1/2 -translate-y-1/2 bg-black/5" />
          {/* Gradient "brain" core: two hemispheres. */}
          <div className="absolute left-1/2 top-1/2 flex h-[44%] w-[62%] -translate-x-1/2 -translate-y-1/2 gap-[3%]">
            <div className="grid flex-1 grid-cols-2 grid-rows-2 overflow-hidden rounded-l-full">
              <div className="tile grain relative g-11" />
              <div className="tile grain relative g-15" style={{ ["--delay" as string]: "2s" }} />
              <div className="tile grain relative g-3" style={{ ["--delay" as string]: "4s" }} />
              <div className="tile grain relative g-16" style={{ ["--delay" as string]: "1s" }} />
            </div>
            <div className="grid flex-1 grid-cols-2 grid-rows-2 overflow-hidden rounded-r-full">
              <div className="tile grain relative g-16" style={{ ["--delay" as string]: "3s" }} />
              <div className="tile grain relative g-11" style={{ ["--delay" as string]: "1s" }} />
              <div className="tile grain relative g-15" />
              <div className="tile grain relative g-3" style={{ ["--delay" as string]: "5s" }} />
            </div>
          </div>
          <span className="absolute left-[calc(19%-5px)] top-[calc(50%-5px)] size-2.5 rounded-full bg-[#c3cad0]" />
          <span className="absolute left-[calc(81%-5px)] top-[calc(50%-5px)] size-2.5 rounded-full bg-[#c3cad0]" />
        </>
      ) : null}

      {kind === "orb" ? (
        <>
          <div className="absolute left-[-30%] top-1/2 size-[90%] -translate-y-1/2 rounded-full border border-black/5 bg-art-2/40" />
          <div className="absolute right-[-30%] top-1/2 size-[90%] -translate-y-1/2 rounded-full border border-black/5 bg-art-2/40" />
          <div className="absolute left-1/2 top-[-40%] size-[90%] -translate-x-1/2 rounded-full border border-black/5" />
          <div className="absolute left-1/2 top-1/2 size-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/5" />
          <GradientQuad className="absolute left-1/2 top-1/2 size-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full" />
          <span className="absolute left-[calc(36%-5px)] top-[calc(22%-5px)] size-2.5 rounded-full bg-[#c3cad0]" />
          <span className="absolute left-[calc(64%-5px)] top-[calc(22%-5px)] size-2.5 rounded-full bg-[#c3cad0]" />
          <span className="absolute left-[calc(36%-5px)] top-[calc(78%-5px)] size-2.5 rounded-full bg-[#c3cad0]" />
          <span className="absolute left-[calc(64%-5px)] top-[calc(78%-5px)] size-2.5 rounded-full bg-[#c3cad0]" />
        </>
      ) : null}
    </div>
  );
}
