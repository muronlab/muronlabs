import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { CtaSection } from "@/components/home/cta-section";
import { SectionHeading } from "@/components/home/section-heading";
import { Chip } from "@/components/ui/chip";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { ArtPanel } from "@/components/visuals/art-panel";
import { GradientArt } from "@/components/visuals/gradient-art";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { divisions, siteConfig } from "@/lib/site-config";

export const metadata = buildPageMetadata({
  title: "Ecosystem",
  description:
    "Muron Dev, Muron AI & Data and Muron Arts: software engineering, AI agents, workflow automation, data science — including neuroscience data — and product design under one roof.",
  path: "/ecosystem",
});

/** How the divisions combine on real engagements. */
const combos = [
  {
    title: "AI-powered product launch",
    body: "Muron Arts designs the experience, Muron Dev builds the platform, and Muron AI & Data adds the agents and analytics that make it smart from day one.",
    teams: ["Muron Arts", "Muron Dev", "Muron AI & Data"],
  },
  {
    title: "Operations automation programme",
    body: "We map the busywork, automate the workflows, connect your tools and put an AI agent on the repetitive requests — with dashboards to prove the hours saved.",
    teams: ["Muron AI & Data", "Muron Dev"],
  },
  {
    title: "Research data platform",
    body: "Reproducible pipelines for EEG, fMRI and behavioural data, a curated BIDS archive, and a clear interface your researchers actually enjoy using.",
    teams: ["Muron AI & Data", "Muron Dev", "Muron Arts"],
  },
];

export default function EcosystemPage() {
  return (
    <main className="flex flex-1 flex-col">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Ecosystem", path: "/ecosystem" },
          ]),
          ...divisions.map((d) => ({
            "@context": "https://schema.org",
            "@type": "Service",
            name: d.name,
            description: d.body,
            provider: { "@id": `${siteConfig.url}/#organization` },
            url: absoluteUrl(`/ecosystem#${d.id}`),
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: `${d.name} services`,
              itemListElement: d.services.map((s) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: s.title, description: s.body },
              })),
            },
          })),
        ]}
      />

      <PageHero
        art
        eyebrow="Our ecosystem"
        title="Three divisions. One coordinated team."
        description="Software engineering, AI agents and automation, data science — including neuroscience data — and product design. Engage one squad for a focused build, or the whole ecosystem end to end."
      />

      {/* Overview: one card per division, jumping to its detail section. */}
      <section aria-label="Divisions at a glance" className="px-6 pt-2">
        <ul className="grid gap-2 md:grid-cols-3">
          {divisions.map((d, i) => (
            <Reveal as="li" key={d.id} delay={i * 0.08}>
              <Link href={`#${d.id}`} className="sheet group flex h-full flex-col p-2">
                <ArtPanel kind={d.art} className="aspect-[4/3]" />
                <div className="flex flex-1 flex-col p-5 pt-6">
                  <p className="text-[13px] font-medium text-muted-foreground">
                    <span className="text-ink">/{d.index}</span> {d.mark}
                  </p>
                  <h2 className="display mt-3 text-[1.75rem] text-ink">{d.name}</h2>
                  <p className="mt-2 text-[15px] leading-6 text-muted-foreground">{d.tagline}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-8 text-[14px] font-medium text-ink">
                    {d.services.length} services
                    <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" strokeWidth={1.75} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Each division in detail. */}
      {divisions.map((d, i) => {
        const dark = i === 1;
        return (
          <section key={d.id} id={d.id} aria-labelledby={`${d.id}-heading`} className="scroll-mt-24 px-6 pt-20 lg:pt-28">
            <div className={dark ? "rounded-md bg-ink-2 p-2 text-white" : ""}>
              <div className={dark ? "px-4 pt-8 pb-4 sm:px-8 lg:px-10 lg:pt-12" : ""}>
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-14">
                  {/* Sticky intro */}
                  <div className="lg:sticky lg:top-28 lg:self-start">
                    <Reveal>
                      <Eyebrow tone={dark ? "dark" : "surface"}>
                        /{d.index} {d.name}
                      </Eyebrow>
                    </Reveal>
                    <Reveal delay={0.08}>
                      <h2 id={`${d.id}-heading`} className={`display mt-6 text-[2.25rem] text-balance lg:text-[2.75rem] ${dark ? "text-white" : "text-ink"}`}>
                        {d.headline}
                      </h2>
                    </Reveal>
                    <Reveal delay={0.14}>
                      <p className={`mt-6 text-[15px] leading-6 ${dark ? "text-white/75" : "text-muted-foreground"}`}>{d.body}</p>
                    </Reveal>
                    <Reveal delay={0.2}>
                      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Focus areas">
                        {d.focus.map((f) => (
                          <li key={f}>
                            <Chip tone={dark ? "dark" : "light"} className={dark ? "" : "bg-surface"}>
                              {f}
                            </Chip>
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                    <Reveal delay={0.24} className="mt-8 hidden lg:block">
                      {dark ? (
                        <GradientArt variant="stack" className="aspect-[4/3] w-full rounded-[4px]" />
                      ) : (
                        <ArtPanel kind={d.art} className="aspect-[4/3] w-full" />
                      )}
                    </Reveal>
                  </div>

                  {/* Services */}
                  <ul className="grid gap-2 sm:grid-cols-2" aria-label={`${d.name} services`}>
                    {d.services.map((s, j) => (
                      <Reveal
                        as="li"
                        key={s.title}
                        delay={(j % 2) * 0.06}
                        className={`flex min-h-[17rem] flex-col justify-between rounded-[4px] p-7 ${dark ? "border border-white/[0.06] bg-ink-3" : "sheet"}`}
                      >
                        <div>
                          <span className={`text-[13px] font-medium ${dark ? "text-white/50" : "text-muted-foreground"}`}>
                            {String(j + 1).padStart(2, "0")}
                          </span>
                          <h3 className={`display mt-3 text-[1.5rem] ${dark ? "text-white" : "text-ink"}`}>{s.title}</h3>
                          <p className={`mt-3 text-[15px] leading-6 ${dark ? "text-white/70" : "text-muted-foreground"}`}>{s.body}</p>
                        </div>
                        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Typical outputs">
                          {s.outputs.map((o) => (
                            <li key={o}>
                              <Chip tone={dark ? "dark" : "light"}>{o}</Chip>
                            </li>
                          ))}
                        </ul>
                      </Reveal>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* How they fit together. */}
      <section aria-labelledby="combos-heading" className="py-20 lg:py-28">
        <div className="shell">
          <SectionHeading
            id="combos-heading"
            eyebrow="Working together"
            title="Better together. One team, no hand-offs."
            description="Most engagements pull in more than one division. Here is how that usually looks."
          />
          <ul className="mt-14 grid gap-2 md:grid-cols-3">
            {combos.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 0.08} className="sheet flex min-h-[18rem] flex-col justify-between p-8">
                <div>
                  <h3 className="display text-[1.5rem] text-ink">{c.title}</h3>
                  <p className="mt-3 text-[15px] leading-6 text-muted-foreground">{c.body}</p>
                </div>
                <ul className="mt-8 flex flex-wrap gap-2" aria-label="Divisions involved">
                  {c.teams.map((t) => (
                    <li key={t}>
                      <Chip>{t}</Chip>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection lines={["Not sure which squad you need?", "Start with a conversation."]} body="Tell us what you’re building or what slows your team down. We’ll suggest the right mix — and say so if one division is enough." />

      <SiteFooter />
    </main>
  );
}
