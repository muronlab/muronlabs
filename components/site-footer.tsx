import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { footerColumns, footerTagline, siteConfig, socialItems } from "@/lib/site-config";
import { Wordmark } from "@/components/navigation/wordmark";

export function SiteFooter() {
  const year = 2026;

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      <div className="mx-auto w-full max-w-7xl px-6 pt-16 pb-8 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1.6fr_repeat(3,1fr)]">
          <div className="space-y-5">
            <Link href="/" aria-label={`${siteConfig.name} home`} className="inline-block text-2xl text-foreground">
              <Wordmark />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{footerTagline}</p>
            <ul className="flex gap-5 pt-1">
              {socialItems.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline font-mono text-xs uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.heading} aria-label={column.heading} className="space-y-4">
              <h2 className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                [ {column.heading} ]
              </h2>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={`${column.heading}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="link-underline text-sm text-foreground transition-colors hover:text-muted-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono uppercase tracking-wide">
            {siteConfig.name} © {year}. All rights reserved.
          </p>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 font-mono uppercase tracking-wide transition-colors hover:text-foreground"
          >
            Back to top
            <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Oversized brand watermark */}
      <div aria-hidden="true" className="select-none px-6 md:px-10">
        <p className="mx-auto w-full max-w-7xl text-balance text-[18vw] font-extrabold uppercase leading-none tracking-tighter text-foreground/4 lg:text-[14rem]">
          {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
