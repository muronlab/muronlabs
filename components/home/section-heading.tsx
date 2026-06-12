import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { ScrollRevealText } from "@/components/ui/scroll-reveal-text";

interface SectionHeadingProps {
  /** Short index/label shown in the monospace bracket eyebrow, e.g. "01". */
  index?: string;
  /** Small uppercase eyebrow label above the title. */
  eyebrow: string;
  /** The section's visible heading. */
  title: string;
  /** Optional supporting copy beneath the title. */
  description?: string;
  className?: string;
  /** Centre-align the block (used on the homepage CTA). */
  align?: "left" | "center";
}

/**
 * Consistent section header: a monospace bracket eyebrow, a bold display title
 * and optional supporting paragraph. Animates into view.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto flex flex-col items-center text-center",
        className,
      )}
    >
      <p className="flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
        <span className="text-brand">[{index ? `${index} · ` : ""}{eyebrow}]</span>
      </p>
      <h2 className="mt-5 text-pretty text-3xl font-extrabold uppercase leading-[0.98] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <ScrollRevealText
          text={description}
          className="mt-5 max-w-2xl text-base leading-relaxed text-foreground sm:text-lg"
        />
      ) : null}
    </Reveal>
  );
}
