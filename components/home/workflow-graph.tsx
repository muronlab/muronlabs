import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { FlickerText } from "@/components/ui/flicker-text";

/* ------------------------------------------------------------------ */
/* Canvas primitives                                                    */
/* ------------------------------------------------------------------ */

/**
 * Icon tile gradients, keyed by node. Written as inline gradients rather than
 * Tailwind classes because each tile is a one-off light tint of its hue.
 */
export const nodeTints = [
  "linear-gradient(140deg,#e9e3ff,#c4b5fd 55%,#a78bfa)",
  "linear-gradient(140deg,#e4e9ff,#c7d2fe 55%,#9aa8fb)",
  "linear-gradient(140deg,#ffe4e9,#fecdd3 55%,#fb9fb0)",
  "linear-gradient(140deg,#e0f2fe,#bae6fd 55%,#7dd3fc)",
  "linear-gradient(140deg,#ffedd5,#fed7aa 55%,#fdba74)",
  "linear-gradient(140deg,#dcfce7,#bbf7d0 55%,#86efac)",
] as const;

/** The join badge that sits on every connector, as on a builder canvas. */
function Join({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute z-10 flex size-6 items-center justify-center rounded-full bg-foreground text-background shadow-sm",
        className,
      )}
    >
      <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path d="M6 2.25v7.5M2.25 6h7.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/**
 * A straight run of wire between two stacked nodes. The join badge is opt-in:
 * only the wires at either end of the graph — into the first phase and out of
 * the last — carry one, so the canvas reads as one flow rather than a strip of
 * repeated affordances.
 */
export function Wire({ className, join = false }: { className?: string; join?: boolean }) {
  return (
    <div aria-hidden="true" className={cn("relative h-14", className)}>
      <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border" />
      {join ? <Join className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" /> : null}
    </div>
  );
}

/**
 * The wire fanning out of one node into the two branch columns beneath it, and
 * the same shape inverted where those columns come back together.
 *
 * Both halves are drawn with borders on a single box per column: the box runs
 * from its column's centre line out to the canvas centre, so its side border
 * is the drop and its top (or bottom) border is the crossbar. The negative
 * margin is half the column gap, which is what puts the crossbar's far end
 * exactly on the centre line.
 */
export function Fork({ direction }: { direction: "split" | "merge" }) {
  const split = direction === "split";
  return (
    <div aria-hidden="true" className="grid grid-cols-2 gap-4 sm:gap-6">
      <div className="relative h-16">
        {/* Stem to or from the node on the centre line */}
        <span
          className={cn(
            "absolute -right-2 h-1/2 w-px bg-border sm:-right-3",
            split ? "top-0" : "bottom-0",
          )}
        />
        <span
          className={cn(
            "absolute left-1/2 -right-2 border-l border-border sm:-right-3",
            split ? "bottom-0 top-1/2 rounded-tl-xl border-t" : "bottom-1/2 top-0 rounded-bl-xl border-b",
          )}
        />
      </div>
      <div className="relative h-16">
        <span
          className={cn(
            "absolute right-1/2 -left-2 border-r border-border sm:-left-3",
            split ? "bottom-0 top-1/2 rounded-tr-xl border-t" : "bottom-1/2 top-0 rounded-br-xl border-b",
          )}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Nodes                                                               */
/* ------------------------------------------------------------------ */

interface NodeProps {
  /** Breadcrumb above the title, e.g. "Phase 2 / Branch 1 / Step 1". */
  label: string;
  title: string;
  /** Index into `nodeTints`. */
  tint: number;
  /** What happens in this phase. Branch and endpoint nodes go without. */
  body?: string;
  /** Rendered as ports along the bottom edge of the card. */
  outputs?: readonly string[];
  /** Phases carry the section's headings; branch nodes are plain text. */
  heading?: boolean;
  /** Entry nodes show an import mark instead of a gradient tile. */
  entry?: boolean;
  /**
   * Branch nodes sit two to a row, so on a phone they drop the tile and the
   * menu mark and give the whole card over to the label and title.
   */
  compact?: boolean;
  className?: string;
  delay?: number;
}

/**
 * One node on the canvas: a gradient tile, the path that got us here, the step
 * itself, and — for a phase — what it produces.
 */
export function Node({
  label,
  title,
  tint,
  body,
  outputs,
  heading = false,
  entry = false,
  compact = false,
  className,
  delay = 0,
}: NodeProps) {
  return (
    <Reveal
      delay={delay}
      y={12}
      className={cn(
        "group relative rounded-xl border border-border bg-background p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-16px_rgba(0,0,0,0.25)] transition-shadow duration-300 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_14px_34px_-18px_rgba(0,0,0,0.35)] sm:p-3.5",
        className,
      )}
    >
      <div className={cn("flex items-center", compact ? "gap-2 sm:gap-3" : "gap-3")}>
        {entry ? (
          <span
            aria-hidden="true"
            className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground sm:size-9"
          >
            <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.6}>
              <path d="M10 2.5v10m0 0 3.5-3.5M10 12.5 6.5 9M3 14v2.5h14V14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        ) : (
          <span
            aria-hidden="true"
            className={cn(
              "size-8 shrink-0 rounded-lg shadow-inner sm:size-9",
              compact && "hidden sm:block",
            )}
            style={{ backgroundImage: nodeTints[tint % nodeTints.length] }}
          />
        )}

        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "font-mono uppercase tracking-[0.12em] text-muted-foreground",
              compact ? "text-[0.5rem] sm:text-[0.55rem]" : "truncate text-[0.55rem]",
            )}
          >
            {label}
          </p>
          {heading ? (
            <FlickerText
              as="h3"
              text={title}
              delay={delay}
              className="mt-0.5 text-[0.8125rem] font-bold leading-snug tracking-tight text-foreground sm:text-sm"
            />
          ) : (
            <p
              className={cn(
                "mt-0.5 font-bold leading-snug tracking-tight text-foreground",
                compact ? "text-[0.6875rem] sm:text-xs" : "text-[0.8125rem]",
              )}
            >
              {title}
            </p>
          )}
        </div>

        {/* The canvas affordance every node carries. Decorative here. */}
        <span
          aria-hidden="true"
          className={cn(
            "shrink-0 self-start pt-1 font-mono text-xs leading-none text-muted-foreground/50 transition-colors duration-300 group-hover:text-muted-foreground",
            compact && "hidden sm:block",
          )}
        >
          •••
        </span>
      </div>

      {body ? (
        <p className="mt-3 border-t border-border pt-3 text-xs leading-relaxed text-muted-foreground sm:text-[0.8125rem]">
          {body}
        </p>
      ) : null}

      {outputs?.length ? (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {outputs.map((output) => (
            <li
              key={output}
              className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-muted-foreground"
            >
              {output}
            </li>
          ))}
        </ul>
      ) : null}
    </Reveal>
  );
}
