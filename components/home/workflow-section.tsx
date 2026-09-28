import { workflowPhases } from "@/lib/site-config";
import { SectionHeading } from "./section-heading";
import { GetInTouchButton } from "@/components/contact/contact-drawer";
import { LineBreaker } from "@/components/ui/line-breaker";
import { Reveal } from "@/components/ui/reveal";

/**
 * The execution framework as an editorial index: a sticky brief on the left,
 * and the four phases on the right, each with an oversized light numeral that
 * turns green on hover.
 */
export function WorkflowSection() {
  return (
    <section id="workflow" aria-labelledby="workflow-heading" className="relative z-[1] scroll-mt-24 bg-paper py-24 lg:py-36">
      <div className="shell grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="workflow-heading"
            eyebrow="Our Workflow"
            title="From first sketch to secure launch."
            description="A structured four-phase framework. You see working software early and stay in the loop at every step."
          />
          <Reveal delay={0.18} className="mt-10">
            <GetInTouchButton tone="outline">Plan your build</GetInTouchButton>
          </Reveal>
        </div>

        <ol>
          <LineBreaker />
          {workflowPhases.map((phase, i) => (
            <li key={phase.phase}>
              <Reveal delay={i * 0.05} className="group grid gap-6 py-10 sm:grid-cols-[7rem_1fr] sm:gap-10 lg:py-12">
                <span
                  aria-hidden="true"
                  className="font-sans text-[4.5rem] leading-none font-light text-hairline transition-colors duration-500 group-hover:text-brand md:text-[5.875rem]"
                >
                  0{i + 1}
                </span>
                <div>
                  <p className="text-base text-brand-deep">{phase.phase}</p>
                  <h3 className="mt-2 text-[1.75rem] leading-tight font-medium text-ink">{phase.title}</h3>
                  <p className="mt-4 max-w-xl text-base leading-6 text-muted-foreground">{phase.body}</p>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Deliverables">
                    {phase.deliverables.map((d) => (
                      <li
                        key={d}
                        className="rounded-full border border-hairline px-3 py-1 text-sm text-muted-foreground transition-colors duration-300 group-hover:border-muted-foreground"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <LineBreaker />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
