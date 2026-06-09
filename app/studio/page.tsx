import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { DistinctionSection } from "@/components/home/distinction-section";
import { CtaSection } from "@/components/home/cta-section";
import { Reveal } from "@/components/ui/reveal";
import { divisions } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Muronlabs is a multidisciplinary technology studio housing engineering, agentic AI and digital artistry under one coordinated roof.",
  alternates: { canonical: "/studio" },
};

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero
        glow
        eyebrow="About"
        title={<>One studio. Three disciplines. Zero friction.</>}
        description="Muronlabs is an elite multidisciplinary technology studio. We unify high-performance software engineering, intelligent agentic AI and immersive digital artistry into a singular, seamless ecosystem — so the creative brain, the core infrastructure and the automation layer ship as one coordinated team."
      />

      <section aria-labelledby="divisions-heading" className="border-t border-border px-6 py-24 md:px-10 lg:py-32">
        <div className="mx-auto w-full max-w-7xl">
          <h2
            id="divisions-heading"
            className="mb-12 font-mono text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground"
          >
            [ The Divisions ]
          </h2>
          <div className="grid gap-12 md:grid-cols-3">
            {divisions.map((division, i) => (
              <Reveal key={division.id} delay={i * 0.08} className="space-y-3 border-t border-foreground pt-6">
                <span className="font-mono text-sm text-brand">[{division.index}]</span>
                <h3 className="text-2xl font-bold tracking-tight text-foreground">{division.name}</h3>
                <p className="text-sm font-semibold uppercase tracking-wide text-foreground/70">{division.tagline}</p>
                <p className="text-base leading-relaxed text-muted-foreground">{division.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <DistinctionSection />
      <CtaSection />

      <SiteFooter />
    </main>
  );
}
