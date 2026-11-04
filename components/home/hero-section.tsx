import { Eyebrow } from "@/components/ui/eyebrow";
import { PillButton } from "@/components/ui/pill-button";
import { Reveal } from "@/components/ui/reveal";
import { GradientArt } from "@/components/visuals/gradient-art";
import { homeCopy, primaryCta } from "@/lib/site-config";

/**
 * Homepage opening: a white sheet with the statement centred and a column of
 * gradient tiles framing each side. The sheet keeps a fixed height on desktop
 * (about 745px, as on the reference) rather than filling the viewport. On
 * small screens the tiles become a band of bars beneath the copy.
 */
export function HeroSection() {
  const { hero } = homeCopy;

  return (
    <section aria-label="Introduction" className="px-2 pt-[4.5rem]">
      <div className="sheet relative flex flex-col overflow-hidden md:block md:h-[46.5rem]">
        <GradientArt variant="mosaic" className="absolute top-2 bottom-2 left-2 hidden w-[21.5%] max-w-[310px] md:block" delay={0.4} tileClassName="hero-bar" flowSeed={1} />
        <GradientArt variant="mosaicRight" mirror className="absolute top-2 right-2 bottom-2 hidden w-[21.5%] max-w-[310px] md:block" delay={0.5} tileClassName="hero-bar" flowSeed={4} />

        <div className="relative z-10 mx-auto flex h-full max-w-[56rem] flex-1 flex-col items-center justify-center px-6 pt-20 pb-14 text-center md:py-24">
          <Reveal immediate delay={0.2}>
            <Eyebrow tone="chip">{hero.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal immediate delay={0.3}>
            <h1 className="display mt-7 text-[2.75rem] text-balance text-ink sm:text-[3.5rem] lg:text-[4rem]">{hero.title}</h1>
          </Reveal>
          <Reveal immediate delay={0.42}>
            <p className="mx-auto mt-8 max-w-[32rem] text-[17px] leading-7 text-pretty text-muted-foreground">{hero.lead}</p>
          </Reveal>
          <Reveal immediate delay={0.54}>
            <PillButton href={primaryCta.href} className="mt-10" aria-label={primaryCta.ariaLabel}>
              {primaryCta.label}
            </PillButton>
          </Reveal>
        </div>

        <div className="px-2 pb-2 md:hidden">
          <GradientArt variant="bars" className="h-52 w-full" delay={0.6} tileClassName="grain-strong" />
        </div>
      </div>
    </section>
  );
}
