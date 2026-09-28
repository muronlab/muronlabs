import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { footerColumns, homeCopy, primaryCta, siteConfig, socialItems } from "@/lib/site-config";
import { Wordmark } from "@/components/navigation/wordmark";
import { LiquidButton } from "@/components/ui/liquid-button";
import { Reveal } from "@/components/ui/reveal";
import { CircleMotif } from "@/components/visuals/circle-motif";

/**
 * Closing band on every page: a "Let's Connect" invitation beside the green
 * orb, then a frosted bar carrying the wordmark, tagline and link columns.
 */
export function SiteFooter() {
  const year = 2026;
  const connectColumn = {
    heading: "Connect",
    links: [...socialItems, { label: "Email", href: `mailto:${siteConfig.contact.email}` }],
  };

  return (
    <footer className="relative z-[1] overflow-hidden bg-paper">
      {/* Orb + orbit rings */}
      <CircleMotif className="absolute -right-[27%] -bottom-[6%] size-[28rem] sm:size-[38rem] md:-right-[17%] md:-bottom-[12%] md:size-[50rem]" />
      <div aria-hidden="true" className="orbit-dots absolute top-16 -left-[12%] size-[30em] md:-left-[5%] md:size-[40em]" />

      <div className="shell relative z-[3] pt-24 pb-40 md:pt-[125px] md:pb-56">
        <Reveal>
          <p className="text-2xl font-normal text-brand-deep">{homeCopy.connect.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-8 max-w-[70vw] text-4xl leading-[1.15] font-medium text-ink sm:text-5xl md:mt-10 md:max-w-[50vw] lg:text-6xl">
            {homeCopy.connect.title}
          </h2>
        </Reveal>
        <Reveal delay={0.12} className="mt-10 flex flex-wrap items-center gap-6">
          <LiquidButton href={primaryCta.href} tone="outline">
            {homeCopy.connect.button}
          </LiquidButton>
          <a href={`mailto:${siteConfig.contact.email}`} className="link-underline text-muted-foreground hover:text-ink">
            {siteConfig.contact.email}
          </a>
        </Reveal>
      </div>

      <div className="relative z-10 bg-white/35 backdrop-blur-[4px] md:bg-white/20">
        <div className="shell flex flex-col gap-10 py-10 md:py-20 lg:flex-row lg:gap-0">
          <div className="lg:pr-32">
            <Link href="/" aria-label={`${siteConfig.name} home`} className="inline-block text-ink">
              <Wordmark />
            </Link>
            <p className="mt-3 max-w-[474px] text-[1.625rem] leading-8 text-ink">{siteConfig.tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:flex lg:gap-0">
            {[...footerColumns, connectColumn].map((column) => (
              <nav key={column.heading} aria-label={column.heading} className="flex flex-col gap-5 lg:pr-20 xl:pr-28">
                <h2 className="text-sm font-medium tracking-[2px] text-ink uppercase">{column.heading}</h2>
                {column.links.map((link) =>
                  link.href.startsWith("http") || link.href.startsWith("mailto") ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-base text-ink/70 transition-colors hover:text-brand-deep"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-base text-ink/70 transition-colors hover:text-brand-deep"
                    >
                      {link.label}
                    </Link>
                  ),
                )}
              </nav>
            ))}
          </div>
        </div>

        <div className="shell flex flex-col gap-3 border-t border-hairline/70 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <a href="#top" className="group inline-flex items-center gap-2 transition-colors hover:text-ink">
            Back to top
            <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  );
}
