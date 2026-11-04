import Link from "next/link";
import { footerColumns, homeCopy, primaryCta, siteConfig, socialItems } from "@/lib/site-config";
import { Wordmark } from "@/components/navigation/wordmark";
import { PillButton } from "@/components/ui/pill-button";
import { Reveal } from "@/components/ui/reveal";
import { GradientArt } from "@/components/visuals/gradient-art";

interface SiteFooterProps {
  /** Hide the closing call to action (e.g. on the contact page). */
  showCta?: boolean;
}

/**
 * Closing band on every page: a pale-blue call-out with a gradient strip,
 * framed by the charcoal footer that carries the wordmark, link columns, a
 * giant watermark and the legal line.
 */
export function SiteFooter({ showCta = true }: SiteFooterProps) {
  const year = 2026;
  const columns = [
    ...footerColumns,
    { heading: "Socials", links: socialItems },
  ];

  return (
    <footer className="px-2 pb-2 pt-16 lg:pt-24">
      <div className="rounded-md bg-ink-2 p-2 text-white">
        {showCta ? (
          <section aria-labelledby="final-cta" className="overflow-hidden rounded-[4px] bg-sky text-ink">
            <div className="flex flex-col gap-10 px-6 py-14 sm:px-10 lg:flex-row lg:items-start lg:justify-between lg:px-[9%] lg:pt-24 lg:pb-28">
              <Reveal>
                <h2 id="final-cta" className="display max-w-[34rem] text-[2.75rem] text-balance sm:text-[3.5rem] lg:text-[4.25rem]">
                  {homeCopy.finalCta.title}
                </h2>
              </Reveal>
              <Reveal delay={0.1} className="max-w-[20rem] lg:pt-2">
                <p className="text-[15px] leading-6 text-ink/75">{homeCopy.finalCta.body}</p>
                <PillButton href={primaryCta.href} size="sm" className="mt-6" aria-label={primaryCta.ariaLabel}>
                  {primaryCta.label}
                </PillButton>
              </Reveal>
            </div>
            <GradientArt variant="band" className="mx-2 mb-2 h-48 sm:h-60 lg:h-[19.5rem]" />
          </section>
        ) : null}

        <div className="shell pt-14 pb-6 lg:pt-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
            <div>
              <Link href="/" aria-label={`${siteConfig.name} home`} className="inline-block text-white">
                <Wordmark id="footer" className="text-[2.5rem]" />
              </Link>
              <p className="mt-4 max-w-[18rem] text-[15px] leading-6 text-white/55">{siteConfig.shortDescription}</p>
            </div>

            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:gap-20">
              {columns.map((column) => (
                <nav key={column.heading} aria-label={column.heading} className="flex flex-col gap-3">
                  <h3 className="mb-1 text-[12px] font-medium tracking-[0.12em] text-white/60 uppercase">{column.heading}</h3>
                  {column.links.map((link) =>
                    link.href.startsWith("http") ? (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[15px] text-white/85 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link key={link.label} href={link.href} className="text-[15px] text-white/85 transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    ),
                  )}
                </nav>
              ))}
            </div>
          </div>

          <div className="mt-14 overflow-hidden border-t border-white/10 pt-8">
            <div aria-hidden="true" data-watermark={siteConfig.wordmark.text} className="footer-watermark display -mb-[0.18em] text-[21vw] leading-[0.8] font-semibold tracking-[-0.06em] text-white/[0.055] select-none lg:text-[19vw]" />
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 text-[14px] text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {siteConfig.name}. Software, AI, data &amp; design studio.
            </p>
            <div className="flex gap-6">
              <Link href="/terms" className="transition-colors hover:text-white">
                Terms of Service
              </Link>
              <Link href="/privacy" className="transition-colors hover:text-white">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
