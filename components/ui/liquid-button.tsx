import Link from "next/link";
import { cn } from "@/lib/utils";

type Tone = "light" | "outline" | "ink";

const labelTone: Record<Tone, string> = {
  light: "border-white/70 text-white group-hover:bg-white/15",
  outline: "border-hairline text-muted-foreground group-hover:border-ink group-hover:text-ink",
  ink: "border-ink bg-ink text-white",
};

const beadTone: Record<Tone, string> = {
  light: "border-white/70 text-white",
  outline: "border-hairline text-ink group-hover:border-ink",
  ink: "border-brand bg-brand text-ink",
};

interface LiquidButtonBaseProps {
  children: React.ReactNode;
  tone?: Tone;
  /** "hover" hides the arrow bead until hover; "always" keeps it docked. */
  bead?: "hover" | "always";
  className?: string;
  "aria-label"?: string;
}

type LiquidButtonProps = LiquidButtonBaseProps &
  (
    | { href: string; external?: boolean; onClick?: never; type?: never; disabled?: never }
    | { href?: never; external?: never; onClick?: () => void; type?: "button" | "submit"; disabled?: boolean }
  );

/** Long, thin arrow matching the hairline type. */
function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 12" fill="none" aria-hidden="true" className={cn("h-3 w-5", className)}>
      <path d="M0 6h22m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

/**
 * The site's call to action: a pill label with a round arrow "bead" beside
 * it. Both shapes sit under the shared goo filter (`<GooFilter />`), so when
 * the bead slides out from behind the pill on hover, filled variants melt
 * together like liquid. The arrow inside swaps on hover.
 *
 * Renders a Next.js Link, an external anchor, or a button.
 */
export function LiquidButton(props: LiquidButtonProps) {
  const { children, tone = "outline", bead = "hover", className } = props;

  const inner = (
    <>
      <span
        className={cn(
          "liquid-label relative z-10 inline-flex items-center whitespace-nowrap rounded-[3rem] border px-7 py-4 text-base leading-none",
          labelTone[tone],
        )}
      >
        {children}
      </span>
      <span
        className={cn(
          "liquid-bead relative ml-[0.45rem] inline-flex size-[3.25rem] shrink-0 items-center justify-center overflow-hidden rounded-full border",
          beadTone[tone],
        )}
        style={bead === "always" ? { transform: "none", opacity: 1 } : undefined}
      >
        <Arrow className="liquid-arrow absolute" />
        <Arrow className="liquid-arrow-next absolute" />
      </span>
    </>
  );

  const shared = cn(
    "liquid-btn group relative inline-flex items-stretch rounded-[3rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand",
    className,
  );
  const style = { filter: "url(#goo)" };

  if (props.href !== undefined) {
    if (props.external) {
      return (
        <a href={props.href} target="_blank" rel="noopener noreferrer" className={shared} style={style} aria-label={props["aria-label"]}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={props.href} className={shared} style={style} aria-label={props["aria-label"]}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={cn(shared, "cursor-pointer disabled:opacity-60")}
      style={style}
      aria-label={props["aria-label"]}
    >
      {inner}
    </button>
  );
}

/**
 * The goo filter referenced by every LiquidButton. Blur + alpha threshold
 * fuses nearby filled shapes; the source is then laid back on top so text and
 * hairlines stay crisp. Rendered once in the root layout.
 */
export function GooFilter() {
  return (
    <svg width="0" height="0" aria-hidden="true" className="absolute" style={{ colorInterpolationFilters: "sRGB" }}>
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" result="atop" />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>
  );
}
