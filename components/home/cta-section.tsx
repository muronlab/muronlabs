import { PillButton } from "@/components/ui/pill-button";
import { Reveal } from "@/components/ui/reveal";
import { FlickerText } from "@/components/ui/flicker-text";
import { primaryCta, siteConfig } from "@/lib/site-config";

/**
 * Closing conversion band — a high-contrast dark section that points complex
 * problems toward the project engagement form. Uses the `.dark` class to invert
 * the design tokens locally.
 */
export function CtaSection() {
  return (
    <section aria-labelledby="cta-heading" className="dark relative overflow-hidden bg-background px-6 py-28 text-foreground md:px-10 lg:py-36">
      <div className="pointer-events-none absolute inset-0 bg-grid mask-radial-fade opacity-50" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--brand), transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <Reveal>
          <FlickerText
            as="p"
            text="[ Start a Project ]"
            variant="tube"
            inline
            className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand"
          />
        </Reveal>
        <Reveal delay={0.05}>
          <FlickerText
            as="h2"
            id="cta-heading"
            pace="primary"
            text="Have a complex problem? Let’s engineer the solution."
            delay={0.1}
            className="mt-6 text-balance text-3xl font-extrabold uppercase leading-[0.98] tracking-tight sm:text-5xl lg:text-6xl"
          />
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Reach out with your project details. Whether you need an immersive application interface, custom AI
            agent workflows, or a full system build, our engineers are ready to ship.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <PillButton href={primaryCta.href} variant="accent" arrow>
              {primaryCta.label}
            </PillButton>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="link-underline font-mono text-sm uppercase tracking-wide text-muted-foreground hover:text-foreground"
            >
              {siteConfig.contact.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
