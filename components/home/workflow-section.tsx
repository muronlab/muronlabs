import { workflowPhases } from "@/lib/site-config";
import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/ui/reveal";

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
          {workflowPhases.map((phase, i) => (
            <Reveal
              key={phase.phase}
              as="li"
              delay={(i % 2) * 0.08}
              className="group relative flex flex-col gap-4 bg-background p-8 transition-colors duration-300 hover:bg-foreground/2 lg:p-10"
            >
              <div className="flex items-center gap-4">
                <span className="flex size-10 items-center justify-center rounded-full border border-border font-mono text-sm font-medium text-foreground transition-colors duration-300 group-hover:border-brand group-hover:text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  {phase.phase}
                </span>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-foreground lg:text-2xl">{phase.title}</h3>
              <p className="text-base leading-relaxed text-muted-foreground">{phase.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
