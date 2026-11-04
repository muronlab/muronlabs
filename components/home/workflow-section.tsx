import { homeCopy, workflowPhases } from "@/lib/site-config";
import { PhaseAccordion } from "./phase-accordion";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PillButton } from "@/components/ui/pill-button";
import { Reveal } from "@/components/ui/reveal";
import { SplitWords } from "@/components/motion/split-words";

/**
 * The execution framework on a charcoal panel: statement and call to action
 * up top, the four phases as a horizontal accordion beneath.
 */
export function WorkflowSection() {
  const { workflow } = homeCopy;

  return (
    <section id="workflow" aria-labelledby="workflow-heading" className="scroll-mt-20 px-6">
      <div className="rounded-md bg-ink-2 px-5 py-12 text-white sm:px-10 lg:px-12 lg:py-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <Eyebrow tone="dark">{workflow.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="workflow-heading" className="display mt-6 max-w-[34rem] text-[2.5rem] text-balance sm:text-[3rem] lg:text-[3.5rem]">
                <SplitWords text={workflow.title} />
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-[22rem] text-[15px] leading-6 text-white/80">{workflow.intro}</p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <PillButton href="/contact" tone="white">
              {workflow.cta}
            </PillButton>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-12 lg:mt-14">
          <PhaseAccordion phases={workflowPhases} />
        </Reveal>
      </div>
    </section>
  );
}
