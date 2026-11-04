import { Clock, Layers, Route } from "lucide-react";
import { homeCopy, stats } from "@/lib/site-config";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ArrowLink } from "@/components/ui/arrow-link";
import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import { GradientArt } from "@/components/visuals/gradient-art";
import { SplitWords } from "@/components/motion/split-words";

const icons = { layers: Layers, route: Route, clock: Clock };

/**
 * About preview: a white sheet with the label left and the statement right,
 * then copy beside a large gradient panel; followed by the three headline
 * numbers as a row of cards.
 */
export function AboutPreview() {
  const { about } = homeCopy;

  return (
    <section aria-labelledby="about-heading" className="px-6">
      <div className="sheet px-6 py-12 sm:px-12 lg:px-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <Reveal>
            <Eyebrow tone="chip">{about.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="about-heading" className="display text-[2.25rem] text-balance text-ink sm:text-[2.75rem] lg:text-[3rem]">
              <SplitWords text={about.title} />
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-10 lg:mt-20 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <Reveal className="flex flex-col justify-between gap-10">
            <p className="max-w-[20rem] text-[15px] leading-6 text-muted-foreground">{about.body}</p>
            <ArrowLink href="/studio">{about.link}</ArrowLink>
          </Reveal>
          <Reveal delay={0.1}>
            <GradientArt variant="strip" className="aspect-[16/10] w-full rounded-[4px]" />
          </Reveal>
        </div>
      </div>

      <ul className="mt-2 grid gap-2 md:grid-cols-3" aria-label="Studio at a glance">
        {stats.map((stat, i) => {
          const Icon = icons[stat.icon];
          return (
            <Reveal as="li" lift key={stat.label} delay={i * 0.08} className="sheet flex min-h-[15rem] flex-col justify-between p-8">
              <div className="flex items-start justify-between">
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  className="display text-[4rem] leading-none text-ink"
                  suffixClassName="text-[1.5rem] text-muted-foreground"
                />
                <Icon className="size-5 text-ink" strokeWidth={1.5} />
              </div>
              <p className="max-w-[14rem] text-[15px] leading-6 text-muted-foreground">{stat.label}</p>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
