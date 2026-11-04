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

      <section className="px-6 pt-2">
        <div className="sheet mx-auto px-6 py-12 sm:px-12 lg:py-16">
          <div className="mx-auto max-w-[40rem]">
            <p className="text-[12px] font-medium tracking-[0.12em] text-muted-foreground uppercase">Last updated: {lastUpdated}</p>
            <p className="mt-6 text-[17px] leading-7 text-pretty text-muted-foreground">{intro}</p>

            <div className="mt-12 space-y-10">
              {sections.map((section, i) => (
                <section key={section.heading} className="space-y-3 border-t border-hairline pt-8">
                  <h2 className="flex items-baseline gap-3 text-[1.375rem] font-medium text-ink">
                    <span className="text-[13px] text-muted-foreground">/0{i + 1}</span>
                    {section.heading}
                  </h2>
                  {section.body.map((paragraph, j) => (
                    <p key={j} className="text-[15px] leading-6 text-muted-foreground">
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
