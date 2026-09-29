import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/home/section-heading";
import { DistinctionSection } from "@/components/home/distinction-section";
import { CtaSection } from "@/components/home/cta-section";
import { Reveal } from "@/components/ui/reveal";
import { LineBreaker } from "@/components/ui/line-breaker";
import { FlowGradient, type FlowPalette } from "@/components/visuals/flow-gradient";
import { JsonLd } from "@/components/json-ld";
import { buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { divisions, siteConfig } from "@/lib/site-config";

export const metadata = buildPageMetadata({
  title: "About",
  description:
    "Muronlabs is a multidisciplinary technology studio housing engineering, agentic AI and digital artistry under one coordinated roof.",
  path: "/studio",
});

const divisionPalette: FlowPalette[] = ["dev", "ai", "arts"];

const principles = [
  { title: "Understand first", body: "We map the objective, the data and the constraints before choosing a single tool." },
  { title: "Show, then build", body: "Real prototypes come before production code, so decisions are made on something you can touch." },
  { title: "Own the outcome", body: "Clean, documented code you fully own — and a team that stays on call after launch." },
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
        glow
        eyebrow="About"
        title="One studio. Three disciplines. Zero friction."
        description="Muronlabs is an elite multidisciplinary technology studio. We unify high-performance software engineering, intelligent agentic AI and immersive digital artistry into a singular, seamless ecosystem — so the creative brain, the core infrastructure and the automation layer ship as one coordinated team."
      />

      {/* 01 — the craft, stated over the flow gradient */}
      <section aria-label="The craft" className="relative z-[1] bg-paper pb-24 lg:pb-36">
        <div className="shell">
          <Reveal>
            <div data-flow-root className="relative min-h-[26rem] overflow-hidden rounded-[20px] lg:min-h-[36rem]">
              <FlowGradient />
              <div className="absolute inset-0 bg-black/15" />
              <div className="relative flex min-h-[26rem] flex-col justify-end p-8 lg:min-h-[36rem] lg:p-16">
                <p className="text-lg font-medium text-white/75 lg:text-2xl">The Craft</p>
                <p className="mt-4 max-w-4xl font-display text-3xl leading-[1.2] text-white lg:text-[3.25rem]">
                  {siteConfig.tagline}
                </p>
              </div>
            </div>
          </Reveal>

          <ul className="mt-16 grid gap-10 md:grid-cols-3 lg:mt-24">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.08}>
                <LineBreaker />
                <p className="mt-6 text-base text-brand-deep">/0{i + 1}</p>
                <h3 className="mt-2 text-[1.75rem] leading-tight font-medium text-ink">{p.title}</h3>
                <p className="mt-3 text-base leading-6 text-muted-foreground">{p.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 02 — the divisions */}
      <section aria-labelledby="divisions-heading" className="relative z-[1] bg-paper py-24 lg:py-36">
        <div className="shell">
          <SectionHeading
            id="divisions-heading"
            index="02"
            eyebrow="The Divisions"
            title="Three specialist divisions. One coordinated roof."
          />

          <div className="mt-16">
            <LineBreaker />
            {divisions.map((division, i) => (
              <article key={division.id} id={division.id} className="scroll-mt-28">
                <Reveal
                  delay={i * 0.06}
                  className="group grid gap-8 py-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)_14rem] lg:items-start lg:gap-16 lg:py-16"
                >
                  <div>
                    <p className="text-base text-brand-deep">/{division.index}</p>
                    <h3 className="mt-2 text-4xl leading-tight font-medium text-ink lg:text-5xl">{division.name}</h3>
                    <p className="mt-3 text-base font-semibold text-muted-foreground">{division.tagline}</p>
                  </div>

                  <div>
                    <p className="text-lg leading-7 text-muted-foreground">{division.body}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {division.focus.map((area) => (
                        <li
                          key={area}
                          className="rounded-full border border-hairline px-3 py-1 text-sm text-muted-foreground transition-colors duration-300 group-hover:border-muted-foreground"
                        >
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    data-flow-root
                    className="relative hidden aspect-[3/4] overflow-hidden rounded-[20px] rounded-bl-[60px] lg:block"
                  >
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                      <FlowGradient palette={divisionPalette[i]} resolution={0.35} interactive={false} />
                    </div>
                    <span className="absolute bottom-4 left-5 font-pixel text-3xl leading-none text-white">{division.mark}</span>
                  </div>
                </Reveal>
                <LineBreaker />
              </article>
            ))}
          </div>
        </div>
      </section>

      <DistinctionSection index="03" />
      <CtaSection />

      <SiteFooter />
    </main>
  );
}
