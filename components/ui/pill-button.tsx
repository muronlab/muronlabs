import Link from "next/link";
import { cn } from "@/lib/utils";

type Tone = "ink" | "white" | "outline";
type Size = "sm" | "md" | "lg";

const toneClass: Record<Tone, string> = {
  ink: "bg-ink text-white hover:bg-ink-3",
  white: "bg-white text-ink hover:bg-chip",
  outline: "border border-hairline bg-transparent text-ink hover:bg-chip",
};

const sizeClass: Record<Size, string> = {
  sm: "h-10 px-5 text-[14px]",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-8 text-[16px]",
};

interface BaseProps {
  children: React.ReactNode;
  tone?: Tone;
  size?: Size;
  className?: string;
  "aria-label"?: string;
}

type PillButtonProps = BaseProps &
  (
    | { href: string; external?: boolean; onClick?: never; type?: never; disabled?: never }
    | { href?: never; external?: never; onClick?: () => void; type?: "button" | "submit"; disabled?: boolean }
  );

/**
 * The site's call to action: a solid pill. Ink on light surfaces, white on
 * charcoal panels. Renders a Next.js Link, an external anchor, or a button.
 */
export function PillButton(props: PillButtonProps) {
  const { children, tone = "ink", size = "md", className } = props;
  const shared = cn(
    "inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-full font-medium transition-[background-color,color,transform] duration-300 hover:-translate-y-px active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink disabled:pointer-events-none disabled:opacity-60",
    toneClass[tone],
    sizeClass[size],
    className,
  );

  if (props.href !== undefined) {
    if (props.external) {
      return (
        <a href={props.href} target="_blank" rel="noopener noreferrer" className={shared} aria-label={props["aria-label"]}>
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={shared} aria-label={props["aria-label"]}>
        {children}
      </Link>
    );
  }

  return (
    <button type={props.type ?? "button"} onClick={props.onClick} disabled={props.disabled} className={shared} aria-label={props["aria-label"]}>
      {children}
    </button>
  );
}
