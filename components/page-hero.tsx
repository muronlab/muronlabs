import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { FlickerText } from "@/components/ui/flicker-text";

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  /** Tightens the heading width for long-form (legal) pages. */
  narrow?: boolean;
  /** Adds the soft brand radial glow used by the home landing CTA band. */
  glow?: boolean;
  className?: string;
}

/**
 * Shared hero for inner pages — monospace bracket eyebrow, large display title
 * and a faded engineering-grid backdrop. Keeps page headers consistent.
 */
export function PageHero({ eyebrow, title, description, narrow = false, glow = false, className }: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden px-6 pt-40 pb-16 md:px-10 lg:pb-24", className)}>
      <div className="pointer-events-none absolute inset-0 bg-grid mask-radial-fade opacity-40" />
      {glow ? (
        <>
          <div
            className="pointer-events-none absolute left-1/2 top-0 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--brand), transparent 70%)" }}
          />
          {/* Coloured film grain, faded at the edges so it gathers around the glow */}
          <div className="pointer-events-none absolute inset-0 mask-radial-fade">
            <div className="noise-brand absolute inset-0 opacity-40 mix-blend-multiply dark:mix-blend-screen" />
          </div>
        </>
      ) : null}
      <div className={cn("relative z-10 mx-auto w-full", narrow ? "max-w-3xl" : "max-w-7xl")}>
        <Reveal>
          <FlickerText
            as="p"
            text={`[ ${eyebrow} ]`}
            variant="tube"
            inline
            className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand"
          />
        </Reveal>
        <Reveal delay={0.05}>
          {typeof title === "string" ? (
            <FlickerText
              as="h1"
              text={title}
              pace="primary"
              delay={0.1}
              className={cn(
                "mt-6 text-balance text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground sm:text-6xl lg:text-7xl",
                narrow ? "max-w-3xl" : "max-w-4xl",
              )}
            />
          ) : (
            <h1
              className={cn(
                "mt-6 text-balance text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground sm:text-6xl lg:text-7xl",
                narrow ? "max-w-3xl" : "max-w-4xl",
              )}
            >
              {title}
            </h1>
          )}
        </Reveal>
        {description ? (
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
