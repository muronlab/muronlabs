import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { CapabilityTicker } from "@/components/home/capability-ticker";
import { DistinctionSection } from "@/components/home/distinction-section";
import { CtaSection } from "@/components/home/cta-section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Chip } from "@/components/ui/chip";
import { Reveal } from "@/components/ui/reveal";
import { ArtPanel } from "@/components/visuals/art-panel";
import { JsonLd } from "@/components/json-ld";
import { buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { divisions, siteConfig } from "@/lib/site-config";
import { SplitWords } from "@/components/motion/split-words";

export const metadata = buildPageMetadata({
  title: "About Us | Technology Studio in Sri Lanka",
  description:
    "Meet Muronlabs: one studio for software engineering, AI & data, and product design. How we work, what we believe, and the three divisions behind it.",
  path: "/studio",
});

const principles = [
  { title: "Understand first.", body: "We map the objective, the data and the constraints before choosing a single tool." },
  { title: "Show, then build.", body: "Real prototypes come before production code, so decisions are made on something you can touch." },
  { title: "Own the outcome.", body: "Clean, documented code you fully own — and a team that stays on call after launch." },
];

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/studio" },
        ])}
      />
      <PageHero
        art
        eyebrow="About Muronlabs"
        title="One studio. Three disciplines. Zero friction."
        description="An elite multidisciplinary technology studio: software engineering, AI & data science and digital artistry shipping as one coordinated team."
      />

      <CapabilityTicker />

      <DistinctionSection
        eyebrow="What we believe"
        title="Four standards we don’t bend, even when it’s inconvenient."
        body={null}
      />

      {/* Our story */}
      <section aria-labelledby="story-heading" className="px-6">
        <div className="sheet px-6 py-12 sm:px-12 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <Reveal>
              <Eyebrow tone="chip">Our story</Eyebrow>
            </Reveal>
            <div>
              <Reveal delay={0.08}>
                <h2 id="story-heading" className="display text-[2.25rem] text-balance text-ink sm:text-[2.75rem] lg:text-[3rem]">
                  <SplitWords text="We started Muronlabs so products could ship as one coordinated whole." />
                </h2>
              </Reveal>
              <Reveal delay={0.16} className="mt-8 grid gap-6 text-[15px] leading-6 text-muted-foreground md:grid-cols-2">
                <p>{siteConfig.description}</p>
                <p>
                  The creative brain, the core infrastructure and the automation layer sit at the same table from day one — so the
                  product you see in the first prototype is the product that reaches production. Built in Sri Lanka, designed for the
                  world.
                </p>
              </Reveal>
            </div>
          </div>

          <ul className="mt-12 grid gap-2 md:grid-cols-3 lg:mt-16">
            {principles.map((p, i) => (
              <Reveal as="li" lift key={p.title} delay={i * 0.08} className="flex min-h-[14rem] flex-col justify-between rounded-[4px] bg-canvas p-7">
                <span className="text-[13px] font-medium text-muted-foreground">/0{i + 1}</span>
                <div>
                  <h3 className="display text-[1.5rem] text-ink">{p.title}</h3>
                  <p className="mt-3 text-[15px] leading-6 text-muted-foreground">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* The divisions */}
      <section aria-labelledby="divisions-heading" className="py-20 lg:py-28">
        <div className="shell">
          <div className="mx-auto flex max-w-[44rem] flex-col items-center text-center">
            <Reveal>
              <Eyebrow>The divisions</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="divisions-heading" className="display mt-6 text-[2.5rem] text-balance text-ink sm:text-[3rem] lg:text-[3.5rem]">
                <SplitWords text="Three specialist divisions. One coordinated roof." />
              </h2>
            </Reveal>
          </div>

          <div className="mt-14 flex flex-col gap-3">
            {divisions.map((division, i) => (
              <Reveal as="article" key={division.id} delay={i * 0.05} className="scroll-mt-28">
                <div id={division.id} className="sheet grid gap-4 p-3 lg:grid-cols-[1fr_1fr_22rem]">
                  <div className="p-5 pt-6 md:p-8">
                    <p className="text-[13px] font-medium text-muted-foreground">
                      <span className="text-ink">/{division.index}</span> {division.mark}
                    </p>
                    <h3 className="display mt-4 text-[2rem] text-ink lg:text-[2.5rem]">{division.name}</h3>
                    <p className="mt-3 text-[15px] font-medium text-ink/80">{division.tagline}</p>
                  </div>
                  <div className="flex flex-col justify-between p-5 pt-0 md:p-8 md:pt-0 lg:pt-8">
                    <p className="text-[15px] leading-6 text-muted-foreground">{division.body}</p>
                    <ul className="mt-6 flex flex-wrap gap-2" aria-label="Focus areas">
                      {division.focus.map((area) => (
                        <li key={area}>
                          <Chip>{area}</Chip>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ArtPanel kind={division.art} className="order-first aspect-[4/3] lg:order-none lg:aspect-auto lg:min-h-[22rem]" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />

      <SiteFooter />
    </main>
  );
}
