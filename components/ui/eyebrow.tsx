import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  /** "surface" on the grey canvas, "chip" on white sheets, "dark" on charcoal. */
  tone?: "surface" | "chip" | "dark";
  className?: string;
  id?: string;
}

/** Section label: a small pill with a leading dot. */
export function Eyebrow({ children, tone = "surface", className, id }: EyebrowProps) {
  return (
    <span
      id={id}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[14px] font-medium leading-none",
        tone === "surface" && "bg-surface text-ink shadow-[0_1px_2px_rgb(0_0_0/0.04)]",
        tone === "chip" && "bg-chip text-ink",
        tone === "dark" && "bg-white/10 text-white",
        className,
      )}
    >
      <span aria-hidden="true" className="eyebrow-dot relative size-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}
