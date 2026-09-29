import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { CircleMotif } from "@/components/visuals/circle-motif";

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  /** Tightens the heading width for long-form (legal) pages. */
  narrow?: boolean;
  /** Shows the green orb motif in the top-right corner. */
  glow?: boolean;
  className?: string;
}

/**
 * Shared hero for inner pages — green eyebrow, a large medium-weight title
 * and a grey lead, with the brand orb drifting off the top-right edge.
 */
export function PageHero({ eyebrow, title, description, narrow = false, glow = false, className }: PageHeroProps) {
  return (
    <section className={cn("relative z-[1] overflow-hidden bg-paper pt-40 pb-16 lg:pt-52 lg:pb-24", className)}>
      {glow ? (
        <>
          {/* Same treatment as the Work page: big orb right, faint orbit top-left. */}
          <CircleMotif className="absolute top-[22rem] -right-[30%] size-[70vw] sm:-right-[20%] sm:size-[50vw] lg:top-[12rem] lg:-right-[8%] lg:size-[42vw]" />
          <div aria-hidden="true" className="orbit-dots absolute -top-[12rem] -left-[10rem] size-[30rem]" />
        </>
      ) : null}

      <div className={cn("shell relative z-10")}>
        <div className={cn(narrow ? "max-w-3xl" : "max-w-[62rem]", glow && "lg:max-w-[58%]")}>
          <Reveal>
            <p className="text-xl text-brand-deep md:text-2xl">{eyebrow}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-6 font-pixel text-5xl leading-[1.1] font-normal text-balance text-ink sm:text-6xl lg:mt-8 lg:text-[5.25rem]">
              {title}
            </h1>
          </Reveal>
          {description ? (
            <Reveal delay={0.12}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground lg:text-xl">{description}</p>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
