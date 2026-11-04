import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArrowLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Inverts for charcoal panels. */
  tone?: "ink" | "white";
}

/** Inline text link with a trailing arrow that nudges right on hover. */
export function ArrowLink({ href, children, className, tone = "ink" }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2.5 text-[15px] font-medium transition-colors",
        tone === "ink" ? "text-ink hover:text-ink/70" : "text-white hover:text-white/80",
        className,
      )}
    >
      {children}
      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} />
    </Link>
  );
}
