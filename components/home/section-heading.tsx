import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

interface SectionHeadingProps {
  /** Optional running-order number, shown before the eyebrow, e.g. "01". */
  index?: string;
  /** Short green eyebrow above the title. */
  eyebrow: string;
  /** The section's visible heading. */
  title: string;
  /** Optional supporting copy beneath the title. */
  description?: string;
  className?: string;
  align?: "left" | "center";
  /** Id for the heading, for `aria-labelledby`. */
  id?: string;
}

/**
 * Section header: a green eyebrow, a large medium-weight display title and an
 * optional grey lead paragraph.
 */
export function SectionHeading({ index, eyebrow, title, description, className, align = "left", id }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-4xl", align === "center" && "mx-auto flex flex-col items-center text-center", className)}>
      <Reveal>
        <p className="text-xl font-normal text-brand-deep md:text-2xl">
          {index ? <span className="mr-3 text-muted-foreground">/{index}</span> : null}
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 id={id} className="mt-6 text-4xl leading-[1.15] font-medium text-balance text-ink sm:text-5xl lg:mt-8 lg:text-6xl">
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">{description}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
