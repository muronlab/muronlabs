import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const pillVariants = cva(
  "group inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold uppercase tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        solid: "bg-foreground text-background hover:opacity-85",
        accent: "bg-brand text-brand-foreground hover:opacity-90",
        outline: "border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground hover:text-background",
        ghost: "text-foreground hover:bg-foreground/5",
      },
    },
    defaultVariants: { variant: "solid" },
  },
);

interface PillButtonProps extends VariantProps<typeof pillVariants> {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Show the trailing arrow that nudges on hover. */
  arrow?: boolean;
  external?: boolean;
}

/**
 * Pill-shaped call to action used across the site. Renders a Next.js Link for
 * internal hrefs and a plain anchor for external ones.
 */
export function PillButton({ href, children, variant, className, arrow = false, external = false }: PillButtonProps) {
  const content = (
    <>
      {children}
      {arrow ? (
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      ) : null}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cn(pillVariants({ variant }), className)}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(pillVariants({ variant }), className)}>
      {content}
    </Link>
  );
}
