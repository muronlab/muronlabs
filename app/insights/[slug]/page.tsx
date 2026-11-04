import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { PostCard } from "@/components/insights/post-card";
import { Chip } from "@/components/ui/chip";
import { Reveal } from "@/components/ui/reveal";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, buildPageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { formatInsightDate, getInsight, insights } from "@/lib/insights";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** Prebuild every post at build time. */
export function generateStaticParams() {
  return insights.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) return {};
  return buildPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/insights/${post.slug}`,
    article: { publishedTime: post.date, authors: [`${siteConfig.name} ${post.author.name}`], tags: post.tags },
  });
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) notFound();

  const dark = post.tone === "dark";
  const more = insights.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <main className="flex flex-1 flex-col">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
            { name: post.title, path: `/insights/${post.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            dateModified: post.date,
            inLanguage: siteConfig.locale.replace("_", "-"),
            keywords: post.tags.join(", "),
            articleSection: post.tags[0],
            image: absoluteUrl("/opengraph-image"),
            author: { "@type": "Organization", name: `${siteConfig.name} ${post.author.name}`, url: siteConfig.url },
            publisher: { "@id": `${siteConfig.url}/#organization` },
            mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/insights/${post.slug}`) },
          },
        ]}
      />

      <article className="px-6 pt-32 lg:pt-40">
        <header className="mx-auto max-w-[46rem]">
          <Reveal immediate delay={0.05}>
            <Link href="/insights" className="group inline-flex items-center gap-2 text-[14px] font-medium text-muted-foreground transition-colors hover:text-ink">
              <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={1.75} />
              All insights
            </Link>
          </Reveal>
          <Reveal immediate delay={0.12}>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Topics">
              {post.tags.map((t) => (
                <li key={t}>
                  <Chip className="bg-surface">{t}</Chip>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal immediate lcp delay={0.2}>
            <h1 className="display mt-6 text-[2.5rem] text-balance text-ink sm:text-[3rem] lg:text-[3.5rem]">{post.title}</h1>
          </Reveal>
          <Reveal immediate delay={0.28}>
            <p className="mt-6 text-[18px] leading-7 text-pretty text-muted-foreground">{post.excerpt}</p>
            <p className="mt-6 text-[14px] text-muted-foreground">
              <span className="font-medium text-ink">{post.author.name}</span> · {post.author.role} ·{" "}
              <time dateTime={post.date}>{formatInsightDate(post.date)}</time> · {post.readTime}
            </p>
          </Reveal>
        </header>

        <Reveal immediate delay={0.34} className="mx-auto mt-12 max-w-[64rem]">
          <div className={cn("relative flex aspect-[21/9] flex-col justify-between overflow-hidden rounded-md", dark ? "bg-ink-2" : "bg-sky")}>
            <p className={cn("display max-w-[12ch] p-8 text-[2rem] sm:text-[3rem]", dark ? "text-white" : "text-ink")}>{post.cover}</p>
            <div aria-hidden="true" className="cover-band grain relative h-[14%] min-h-10" />
          </div>
        </Reveal>

        <div className="sheet mx-auto mt-2 max-w-[64rem] px-6 py-12 sm:px-12 lg:py-16">
          <div className="mx-auto max-w-[40rem] space-y-10">
            {post.sections.map((s) => (
              <Reveal as="section" key={s.heading}>
                <h2 className="display text-[1.75rem] text-ink">{s.heading}</h2>
                {s.paragraphs.map((p, i) => (
                  <p key={i} className="mt-4 text-[17px] leading-7 text-ink/80">
                    {p}
                  </p>
                ))}
              </Reveal>
            ))}
          </div>
        </div>
      </article>

      <section aria-labelledby="more-heading" className="px-6 pt-24 lg:pt-32">
        <div className="mx-auto max-w-[80rem] lg:px-12">
          <h2 id="more-heading" className="display text-[2rem] text-ink lg:text-[2.5rem]">
            More insights
          </h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {more.map((p) => (
              <li key={p.slug}>
                <PostCard post={p} className="h-full" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
