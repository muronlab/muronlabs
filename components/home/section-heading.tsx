import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
  /** Pill tone — "surface" on the grey canvas, "chip" on white, "dark" on charcoal. */
  tone?: "surface" | "chip" | "dark";
  /** Id for the heading, for `aria-labelledby`. */
  id?: string;
  /** Tighter, left-aligned sizing for sticky side headings. */
  compact?: boolean;
}

/**
 * Section header: a pill eyebrow, a large regular-weight display title and an
 * optional grey lead paragraph. Centred by default, as on the reference.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "center",
  tone = "surface",
  id,
  compact = false,
}: SectionHeadingProps) {
  const dark = tone === "dark";

  return (
    <div className={cn(align === "center" ? "mx-auto flex max-w-[44rem] flex-col items-center text-center" : "max-w-[30rem]", className)}>
      <Reveal>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          id={id}
          className={cn(
            "display mt-6 text-balance",
            compact ? "text-[2.5rem] lg:text-[3.25rem]" : "text-[2.5rem] sm:text-[3rem] lg:text-[3.5rem]",
            dark ? "text-white" : "text-ink",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.16}>
          <p className={cn("mt-6 max-w-[30rem] text-[17px] leading-7 text-pretty", dark ? "text-white/75" : "text-muted-foreground")}>
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
