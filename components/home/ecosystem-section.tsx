import { divisions, homeCopy } from "@/lib/site-config";
import { SectionHeading } from "./section-heading";
import { ServiceTabs } from "./service-tabs";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Chip } from "@/components/ui/chip";
import { Reveal } from "@/components/ui/reveal";
import { ArtPanel } from "@/components/visuals/art-panel";
import { StaggerList, StaggerItem } from "@/components/motion/stagger-list";

/**
 * The three divisions as stacked service cards: copy on the left, an abstract
 * gradient illustration on the right, and a sticky index on the far left that
 * tracks the card in view.
 */
export function EcosystemSection() {
  const { ecosystem } = homeCopy;

  return (
    <section id="ecosystem" aria-labelledby="ecosystem-heading" className="scroll-mt-24 py-20 lg:py-28">
      <div className="shell">
        <SectionHeading id="ecosystem-heading" eyebrow={ecosystem.eyebrow} title={ecosystem.title} description={ecosystem.intro} />

        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-[14rem_1fr] lg:gap-10">
          <ServiceTabs items={divisions.map((d) => ({ id: d.id, label: d.name }))} />

          <div className="flex flex-col gap-3">
            {divisions.map((division, i) => (
              <Reveal as="article" key={division.id} delay={i * 0.05} className="scroll-mt-28">
                <div id={division.id} className="sheet grid gap-4 p-3 md:grid-cols-2">
                  <div className="flex flex-col justify-between p-5 pt-6 md:p-8">
                    <div>
                      <p className="text-[13px] font-medium text-muted-foreground">
                        <span className="text-ink">/{division.index}</span> {division.name}
                      </p>
                      <h3 className="display mt-4 max-w-[22rem] text-[1.75rem] text-balance text-ink lg:text-[2rem]">{division.headline}</h3>
                      <p className="mt-4 max-w-[24rem] text-[15px] leading-6 text-muted-foreground">{division.body}</p>
                      <StaggerList className="mt-6 flex flex-wrap gap-2" aria-label="Focus areas">
                        {division.focus.slice(0, 3).map((area) => (
                          <StaggerItem key={area}>
                            <Chip>{area}</Chip>
                          </StaggerItem>
                        ))}
                      </StaggerList>
                    </div>
                    <ArrowLink href={`/ecosystem#${division.id}`} className="mt-14 md:mt-20">
                      {division.cta}
                    </ArrowLink>
                  </div>
                  <ArtPanel kind={division.art} className="order-first aspect-square md:order-none md:aspect-auto md:min-h-[32rem]" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
