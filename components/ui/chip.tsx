import { cn } from "@/lib/utils";

/** Small rounded tag used for focus areas, deliverables and metadata. */
export function Chip({ children, className, tone = "light" }: { children: React.ReactNode; className?: string; tone?: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1.5 text-[13px] leading-none",
        tone === "light" ? "bg-chip text-ink" : "border border-white/15 text-white/85",
        className,
      )}
    >
      {children}
    </span>
  );
}
