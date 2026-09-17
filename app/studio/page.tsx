import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/home/section-heading";
import { DistinctionSection } from "@/components/home/distinction-section";
import { CtaSection } from "@/components/home/cta-section";
import { Reveal } from "@/components/ui/reveal";
import { JsonLd } from "@/components/json-ld";
import { EmberVisual, EMBER_SURFACE } from "@/components/ember-visual";
import { FlickerText } from "@/components/ui/flicker-text";
import { cn } from "@/lib/utils";
import { buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { divisions, siteConfig } from "@/lib/site-config";

export const metadata = buildPageMetadata({
  title: "About",
  description:
    "Muronlabs is a multidisciplinary technology studio housing engineering, agentic AI and digital artistry under one coordinated roof.",
  path: "/studio",
});

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

      {/* 01 — the craft, carried by the husk rather than by more prose. */}
      <section aria-label="The craft" className="border-t border-border px-6 py-24 md:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-7xl">
          <SectionHeading index="01" eyebrow="The Craft" title={siteConfig.tagline} />

          <Reveal className="mt-16 overflow-hidden rounded-3xl border border-border">
            <div
              className="relative min-h-[380px] sm:min-h-[460px] lg:min-h-[560px]"
              style={{ background: EMBER_SURFACE }}
            >
              <EmberVisual />
              <FlickerText
                as="p"
                text="Move across to disturb"
                variant="tube"
                delay={0.4}
                inline
                className="pointer-events-none absolute bottom-6 left-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 02 — the divisions, as an editorial index rather than three columns
          of loose text. */}
      <section
        aria-label="The divisions"
        className="border-t border-border bg-foreground/2 px-6 py-24 md:px-10 lg:py-32"
      >
        <div className="mx-auto w-full max-w-7xl">
          <SectionHeading
            index="02"
            eyebrow="The Divisions"
            title="Three specialist divisions. One coordinated roof."
          />

          <div className="mt-16 border-t border-border">
            {divisions.map((division, i) => (
              <Reveal
                key={division.id}
                as="article"
                delay={i * 0.08}
                className="group relative grid gap-8 border-b border-border py-12 transition-colors duration-300 hover:bg-background lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-20 lg:py-16"
              >
                {/* Accent rule that draws itself across the row on hover. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-0 top-0 h-px w-0 transition-all duration-700 ease-out group-hover:w-full",
                    division.accent,
                  )}
                />

                <div className="flex items-start gap-5">
                  <span className="pt-2 font-mono text-sm text-brand">[{division.index}]</span>
                  <div>
                    <FlickerText
                      as="h3"
                      text={division.name}
                      gradient={division.gradientStops}
                      variant="tube"
                      delay={i * 0.08}
                      className={cn(
                        "text-3xl font-bold tracking-tight lg:text-4xl",
                        division.gradientStops ? undefined : "text-foreground",
                      )}
                    />
                    <FlickerText
                      as="p"
                      text={division.tagline}
                      variant="tube"
                      delay={0.2 + i * 0.08}
                      className="mt-3 text-sm font-semibold uppercase tracking-wide text-foreground/70"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-base leading-relaxed text-muted-foreground">{division.body}</p>

                  <ul className="mt-7 flex flex-wrap gap-2">
                    {division.focus.map((area) => (
                      <li
                        key={area}
                        className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground transition-colors duration-300 group-hover:border-foreground/20"
                      >
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
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
