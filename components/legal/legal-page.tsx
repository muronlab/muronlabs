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
      <PageHero eyebrow={eyebrow} title={title} narrow />

      <section className="px-6 pb-28 md:px-10">
        <div className="mx-auto w-full max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">{intro}</p>

          <div className="mt-14 space-y-12">
            {sections.map((section, i) => (
              <section key={section.heading} className="space-y-3 border-t border-border pt-8">
                <h2 className="flex items-baseline gap-3 text-xl font-bold tracking-tight text-foreground">
                  <span className="font-mono text-sm text-brand">0{i + 1}</span>
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
      </section>

      <SiteFooter />
    </main>
  );
}
