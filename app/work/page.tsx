import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { FlickerText } from "@/components/ui/flicker-text";
import { buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Work",
  description: "Selected work from the Muronlabs studio — products, platforms and brands we've shipped.",
  path: "/work",
});

const projects = [
  { name: "Atlas", discipline: "Fintech platform", year: "2026", summary: "A consumer payments app rebuilt from the rails up." },
  { name: "Tideline", discipline: "Marketplace", year: "2025", summary: "Two-sided marketplace connecting makers and buyers." },
  { name: "Northwind", discipline: "Brand & web", year: "2025", summary: "Identity and site for a climate-tech venture." },
  { name: "Cobalt", discipline: "Design system", year: "2024", summary: "A multi-brand design system spanning web and native." },
  { name: "Harbour", discipline: "Logistics dashboard", year: "2024", summary: "Operations tooling for a regional freight network." },
];

export default function WorkPage() {
  return (
    <main className="flex flex-1 flex-col">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />
      <section className="px-6 pt-40 pb-20 md:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <FlickerText
            as="p"
            text="Selected work"
            variant="tube"
            inline
            className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
          />
          <FlickerText
            as="h1"
            text="Things we’ve shipped."
            pace="primary"
            delay={0.1}
            className="max-w-3xl text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground sm:text-7xl"
          />
        </div>
      </section>

      <section className="px-6 pb-24 md:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <ul className="divide-y divide-border border-y border-border">
            {projects.map((p) => (
              <li key={p.name} className="group py-10">
                <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between">
                  <FlickerText
                    as="h2"
                    text={p.name}
                    className="text-3xl font-bold uppercase tracking-tight text-foreground sm:text-5xl"
                  />
                  <div className="flex items-baseline gap-6 text-sm text-muted-foreground">
                    <span>{p.discipline}</span>
                    <span>{p.year}</span>
                  </div>
                </div>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">{p.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
