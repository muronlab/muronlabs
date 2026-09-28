import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/ui/reveal";
import { CircleMotif } from "@/components/visuals/circle-motif";
import { JsonLd } from "@/components/json-ld";
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

      <section className="relative z-[1] overflow-hidden bg-paper pt-40 pb-24 lg:pt-52 lg:pb-36">
        {/* Orb on the right, a faint dotted orbit top-left */}
        <CircleMotif className="absolute top-[22rem] -right-[30%] size-[70vw] sm:-right-[20%] sm:size-[50vw] lg:top-[12rem] lg:-right-[8%] lg:size-[42vw]" />
        <div aria-hidden="true" className="orbit-dots absolute -top-[12rem] -left-[10rem] size-[30rem]" />

        <div className="shell relative z-10">
          <Reveal>
            <h1 className="max-w-[62rem] text-5xl leading-[1.1] font-normal text-balance text-ink sm:text-6xl lg:text-[5.25rem]">
              Things we’ve shipped, and what comes next
            </h1>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-8 max-w-[36rem] text-lg leading-relaxed text-muted-foreground lg:text-xl">
              Products, platforms and brands built across our three divisions — engineered to scale, designed to be
              used.
            </p>
          </Reveal>

          <div className="mt-20 lg:mt-28 lg:max-w-[65%]">
            <Reveal>
              <h2 className="text-2xl font-normal text-brand lg:text-[1.75rem]">Selected Work</h2>
            </Reveal>

            <ul className="mt-6">
              {projects.map((p, i) => (
                <Reveal as="li" key={p.name} delay={i * 0.05}>
                  <div className="group grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 border-b border-hairline py-7 transition-colors duration-300 hover:border-brand sm:grid-cols-[minmax(0,1fr)_12rem_6rem] sm:items-baseline">
                    <div>
                      <p className="text-xl text-muted-foreground transition-colors duration-300 group-hover:text-ink">{p.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground/80">{p.summary}</p>
                    </div>
                    <p className="hidden text-xl text-muted-foreground sm:block">{p.discipline}</p>
                    <p className="text-xl text-muted-foreground">{p.year}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Closing line, as on the reference events page */}
      <section className="relative z-[1] bg-paper pb-12 lg:pb-20">
        <div className="shell flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <Reveal>
            <p className="max-w-[22rem] text-lg leading-relaxed text-muted-foreground lg:text-xl">
              Every product here started as a conversation with a team like yours.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="text-5xl leading-none font-normal text-ink lg:text-[5.25rem]">Yours could be next.</p>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
