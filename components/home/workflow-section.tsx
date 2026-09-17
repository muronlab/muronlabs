import { workflowPhases } from "@/lib/site-config";
import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/ui/reveal";
import { FlickerText } from "@/components/ui/flicker-text";

/**
 * The execution framework — a numbered sequence showing how a raw idea becomes
 * a secure, deployed product. Rendered as a connected timeline.
 */
export function WorkflowSection() {
  return (
    <section
      id="workflow"
      aria-labelledby="workflow-heading"
      className="scroll-mt-24 border-t border-border px-6 py-24 md:px-10 lg:py-32"
    >
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          index="03"
          eyebrow="Our Workflow"
          title="From raw idea to deployed product."
          description="A structured sequence that takes the guesswork out of how we build, test and ship."
        />

        <ol className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2">
          {workflowPhases.map((phase, i) => {
            const step = i + 1;
            const progress = Math.round((step / workflowPhases.length) * 100);
            return (
              <Reveal
                key={phase.phase}
                as="li"
                delay={(i % 2) * 0.08}
                className="group relative flex flex-col gap-4 overflow-hidden bg-background p-8 transition-colors duration-300 hover:bg-foreground/2 lg:p-10"
              >
                {/* Oversized faded step watermark */}
                <span className="pointer-events-none absolute -right-1 -top-5 font-mono text-7xl font-bold text-foreground/[0.04] transition-colors duration-300 group-hover:text-brand/10 lg:text-8xl">
                  {String(step).padStart(2, "0")}
                </span>

                <div className="flex items-center gap-4">
                  <span className="flex size-10 items-center justify-center rounded-full border border-border font-mono text-sm font-medium text-foreground transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-brand-foreground">
                    {String(step).padStart(2, "0")}
                  </span>
                  <FlickerText
                    as="p"
                    text={phase.phase}
                    variant="tube"
                    inline
                    className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground"
                  />
                </div>
                <FlickerText
                  as="h3"
                  text={phase.title}
                  delay={(i % 2) * 0.08}
                  className="text-xl font-bold tracking-tight text-foreground lg:text-2xl"
                />
                <p className="text-base leading-relaxed text-muted-foreground">{phase.body}</p>

                {/* Cumulative progress through the workflow */}
                <div className="mt-auto pt-6">
                  <div className="flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground/70">
                    <span>Step {step} / {workflowPhases.length}</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-border">
                    <div
                      className="h-full rounded-full bg-brand transition-[width] duration-700 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
