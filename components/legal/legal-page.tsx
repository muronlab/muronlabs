import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";

export interface LegalSection {
  heading: string;
  body: string[];
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}

/**
 * Shared layout for legal pages (Privacy, Terms). Keeps typographic structure
 * consistent and the page content driven by simple data.
 */
export function LegalPage({ eyebrow, title, lastUpdated, intro, sections }: LegalPageProps) {
  return (
    <main className="flex flex-1 flex-col">
      <PageHero glow eyebrow={eyebrow} title={title} narrow />

      <section className="relative z-[1] bg-paper pb-28">
        <div className="shell">
          <div className="max-w-3xl">
          <p className="text-sm font-medium tracking-[2px] text-ink uppercase">
            Last updated: {lastUpdated}
          </p>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">{intro}</p>

          <div className="mt-14 space-y-12">
            {sections.map((section, i) => (
              <section key={section.heading} className="space-y-3 border-t border-muted-foreground/70 pt-8">
                <h2 className="flex items-baseline gap-3 text-2xl font-medium text-ink">
                  <span className="text-base text-brand-deep">/0{i + 1}</span>
                  {section.heading}
                </h2>
                {section.body.map((paragraph, j) => (
                  <p key={j} className="text-base leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
