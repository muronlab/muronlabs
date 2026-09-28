import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sweepVariants = cva(
  [
    "group relative isolate inline-flex h-12 w-fit items-center overflow-hidden whitespace-nowrap",
    "px-5 font-mono text-[0.68rem] font-medium uppercase tracking-[0.18em]",
    "transition-colors duration-500 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
    // The fill is a pseudo-element that wipes in from the left edge on hover,
    // so the label stays put while the colour arrives underneath it.
    "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:origin-left",
    "before:scale-x-0 before:transition-transform before:duration-500 before:ease-out",
    "hover:before:scale-x-100",
    "motion-reduce:transition-none motion-reduce:before:transition-none",
  ].join(" "),
  {
    variants: {
      variant: {
        /** On a light panel: dark button, brand wipe. */
        solid:
          "bg-foreground text-background before:bg-brand hover:text-brand-foreground focus-visible:ring-offset-background",
        /** On the inverted panel: light button, brand wipe. */
        invert:
          "bg-background text-foreground before:bg-brand hover:text-brand-foreground focus-visible:ring-offset-foreground",
        /** Hairline outline, for secondary placement. */
        outline:
          "border border-current/25 text-current before:bg-current hover:text-background focus-visible:ring-offset-background",
      },
    },
    defaultVariants: { variant: "solid" },
  },
);

interface SweepButtonProps extends VariantProps<typeof sweepVariants> {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  "aria-label"?: string;
}

/**
 * Squared-off call to action: a mono label with a long trailing arrow and a
 * colour wipe that runs in from the left on hover. Used in the sticky column of
 * the editorial split sections, where the rounded `PillButton` would soften
 * edges that are deliberately hard.
 */
export function SweepButton({
  href,
  children,
  variant,
  className,
  external = false,
  ...rest
}: SweepButtonProps) {
  const content = (
    <span className="relative z-10 flex w-full min-w-0 items-center justify-between gap-10">
      {children}
      <svg
        viewBox="0 0 16 16"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="size-[1.1em] shrink-0 transition-transform duration-500 ease-out group-hover:translate-x-1"
      >
        <path d="M0.75 8h14.1M7.8 0.9 14.9 8l-7.1 7.1" />
      </svg>
    </span>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(sweepVariants({ variant }), className)}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(sweepVariants({ variant }), className)} {...rest}>
      {content}
    </Link>
  );
}
