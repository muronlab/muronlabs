import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { GradientArt } from "@/components/visuals/gradient-art";

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  /** Tightens the heading width for long-form (legal) pages. */
  narrow?: boolean;
  /** Shows the gradient strip beneath the title. */
  art?: boolean;
  className?: string;
}

/**
 * Shared hero for inner pages — a white sheet with a centred pill, title and
 * lead, optionally closed by a banner of gradient tiles.
 */
export function PageHero({ eyebrow, title, description, narrow = false, art = false, className }: PageHeroProps) {
  return (
    <section className={cn("px-2 pt-[4.5rem]", className)}>
      <div className="sheet overflow-hidden">
        <div className={cn("mx-auto flex flex-col items-center px-6 pt-20 pb-14 text-center lg:pt-28 lg:pb-16", narrow ? "max-w-[38rem]" : "max-w-[46rem]")}>
          <Reveal immediate delay={0.15}>
            <Eyebrow tone="chip">{eyebrow}</Eyebrow>
          </Reveal>
          <Reveal immediate lcp delay={0.25}>
            <h1 className="display mt-6 text-[2.75rem] text-balance text-ink sm:text-[3.5rem] lg:text-[4.25rem]">{title}</h1>
          </Reveal>
          {description ? (
            <Reveal immediate delay={0.35}>
              <p className="mx-auto mt-6 max-w-[32rem] text-[17px] leading-7 text-pretty text-muted-foreground">{description}</p>
            </Reveal>
          ) : null}
        </div>
        {art ? <GradientArt variant="strip" className="mx-2 mb-2 h-48 sm:h-64 lg:h-[26rem]" delay={0.3} /> : null}
      </div>
    </section>
  );
}
