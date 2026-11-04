import { SiteFooter } from "@/components/site-footer";
import { PostCard } from "@/components/insights/post-card";
import { Newsletter } from "@/components/insights/newsletter";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { insights, insightsCopy } from "@/lib/insights";

export const metadata = buildPageMetadata({
  title: "Insights | Software, AI & Data Notes",
  description:
    "Practical notes on software engineering, AI agents, automation, data pipelines and neuroscience data, from real Muronlabs projects.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": absoluteUrl("/insights#blog"),
            name: `${siteConfig.name} Insights`,
            description: insightsCopy.intro,
            url: absoluteUrl("/insights"),
            publisher: { "@id": `${siteConfig.url}/#organization` },
            blogPost: insights.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              description: p.excerpt,
              datePublished: p.date,
              url: absoluteUrl(`/insights/${p.slug}`),
            })),
          },
        ]}
      />

      {/* Header straight on the grey canvas, as on the reference. */}
      <section aria-labelledby="insights-heading" className="px-6 pt-36 pb-14 lg:pt-44 lg:pb-16">
        <div className="mx-auto flex max-w-[44rem] flex-col items-center text-center">
          <Reveal immediate delay={0.1}>
            <Eyebrow>{insightsCopy.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal immediate lcp delay={0.2}>
            <h1 id="insights-heading" className="display mt-6 text-[2.5rem] text-balance text-ink sm:text-[3rem] lg:text-[3.5rem]">
              {insightsCopy.title}
            </h1>
          </Reveal>
          <Reveal immediate delay={0.3}>
            <p className="mt-6 max-w-[30rem] text-[16px] leading-6 text-pretty text-muted-foreground">{insightsCopy.intro}</p>
          </Reveal>
        </div>
      </section>

      <section aria-label="Articles" className="px-6">
        <ul className="mx-auto grid max-w-[80rem] gap-6 md:grid-cols-2 lg:px-12">
          {insights.map((post, i) => (
            <Reveal as="li" lift key={post.slug} delay={(i % 2) * 0.08}>
              <PostCard post={post} className="h-full" />
            </Reveal>
          ))}
        </ul>
      </section>

      <div className="pt-24 lg:pt-36">
        <Newsletter />
      </div>

      <SiteFooter />
    </main>
  );
}
