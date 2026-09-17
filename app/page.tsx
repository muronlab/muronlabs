import Prism from "@/components/Prism";
import { PillButton } from "@/components/ui/pill-button";
import { Reveal } from "@/components/ui/reveal";
import { FlickerText } from "@/components/ui/flicker-text";
import { FlickerBlock } from "@/components/ui/flicker-block";
import { CapabilityTicker } from "@/components/home/capability-ticker";
import { EcosystemSection } from "@/components/home/ecosystem-section";
import { CapabilitiesSection } from "@/components/home/capabilities-section";
import { WorkflowSection } from "@/components/home/workflow-section";
import { DistinctionSection } from "@/components/home/distinction-section";
import { FaqSection } from "@/components/home/faq-section";
import { CtaSection } from "@/components/home/cta-section";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { faqPageJsonLd } from "@/lib/seo";
import { primaryCta } from "@/lib/site-config";

const heroPillars = [
  { index: "01", label: "Engineering" },
  { index: "02", label: "Agentic AI" },
  { index: "03", label: "Digital Artistry" },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      {/* FAQ rich-result data, mirroring the on-page FaqSection */}
      <JsonLd data={faqPageJsonLd()} />

      {/* Hero — above the fold */}
      <section className="relative flex min-h-svh flex-col overflow-hidden px-6 pt-32 pb-10 md:px-10">
        {/* Prism animated WebGL background */}
        <div className="absolute inset-0">
          <Prism
            height={3.5}
            baseWidth={5.5}
            animationType="rotate"
            glow={1}
            noise={0.5}
            transparent
            scale={3.6}
            hueShift={0}
            colorFrequency={1}
            hoverStrength={2}
            inertia={0.05}
            bloom={1}
            timeScale={0.5}
            suspendWhenOffscreen
          />
        </div>
        {/* Legibility overlays: soft wash + grid texture that fades at the edges */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-background/30 via-background/45 to-background/70" />
        <div className="pointer-events-none absolute inset-0 bg-grid mask-radial-fade opacity-60" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center py-16 text-center">
          <Reveal>
            <FlickerText
              as="p"
              text="[ Multidisciplinary Technology Studio ]"
              variant="tube"
              inline
              className="font-mono text-[0.6rem] font-medium uppercase tracking-widest text-foreground/70 sm:text-xs sm:tracking-[0.18em]"
            />
          </Reveal>
          <Reveal delay={0.05}>
            {/* Two-tone, two-line headline — struck as a block so the brand
                colour and the line break survive. */}
            <FlickerBlock pace="primary">
              <h1 className="mx-auto mt-6 max-w-5xl text-balance text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl sm:leading-[0.92] md:text-6xl lg:text-8xl">
                Engineering with precision.
                <span className="block text-brand">Designing with soul.</span>
              </h1>
            </FlickerBlock>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-8 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Muronlabs is an elite multidisciplinary technology studio. We unify high-performance software
              engineering, intelligent agentic AI, and immersive digital artistry into a singular, seamless
              ecosystem.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <PillButton href={primaryCta.href} variant="accent" arrow>
                Engage the Studio
              </PillButton>
              <PillButton href="/#workflow" variant="outline">
                View Our Frameworks
              </PillButton>
            </div>
          </Reveal>
        </div>

        {/* Foot of hero: discipline index */}
        <Reveal
          delay={0.24}
          className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 border-t border-border/60 pt-6 sm:grid-cols-3"
        >
          {heroPillars.map((pillar) => (
            <div key={pillar.index} className="flex items-center justify-center gap-3 sm:justify-start">
              <span className="font-mono text-sm text-brand">/{pillar.index}</span>
              <span className="text-sm font-semibold uppercase tracking-wide text-foreground">{pillar.label}</span>
            </div>
          ))}
        </Reveal>
      </section>

      <CapabilityTicker />

      <EcosystemSection />
      <CapabilitiesSection />
      <WorkflowSection />
      <DistinctionSection />
      <FaqSection />
      <CtaSection />

      <SiteFooter />
    </main>
  );
}
