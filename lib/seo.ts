/**
 * SEO helpers — a single source of truth for per-page metadata and structured
 * data. Keeps `openGraph`, `twitter`, canonicals and JSON-LD consistent across
 * every route so social shares and rich results stay on-brand. Content values
 * come from `site-config`; edit there, not here.
 */
import type { Metadata } from "next";
import { siteConfig, socialItems, faqs, type Faq } from "@/lib/site-config";

/** Resolve a route path to its absolute URL (root collapses to the bare origin). */
export function absoluteUrl(path = "/"): string {
  return `${siteConfig.url}${path === "/" ? "" : path}`;
}

interface PageMetaInput {
  /** Page title — omit on the homepage to fall back to the layout default. */
  title?: string;
  /** Meta + social description. Falls back to the site description. */
  description?: string;
  /** Route path, e.g. "/studio". Drives the canonical and Open Graph URL. */
  path: string;
}

/**
 * Build per-page `Metadata` with matching canonical, Open Graph and Twitter
 * fields. The default social image is supplied automatically by the
 * `opengraph-image`/`twitter-image` file conventions, so it is intentionally
 * not set here.
 */
export function buildPageMetadata({ title, description, path }: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const desc = description ?? siteConfig.description;
  // The document <title> uses the "%s — Name" template; mirror it for social.
  const socialTitle = title ? `${title} — ${siteConfig.name}` : `${siteConfig.name} — ${siteConfig.tagline}`;

  return {
    title,
    description: desc,
    alternates: { canonical: path === "/" ? "/" : path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: socialTitle,
      description: desc,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: desc,
    },
  };
}

/* ------------------------------------------------------------------ */
/* Structured data (schema.org / JSON-LD)                              */
/* ------------------------------------------------------------------ */

/**
 * The studio as an Organization. Surfaces the brand, reach and disciplines to
 * search engines and AI crawlers. Origin is stated at country level only — no
 * street address or PII.
 */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  url: siteConfig.url,
  logo: absoluteUrl("/favicon.ico"),
  description: siteConfig.shortDescription,
  slogan: siteConfig.tagline,
  email: siteConfig.contact.email,
  foundingLocation: {
    "@type": "Place",
    address: { "@type": "PostalAddress", addressCountry: "LK" },
  },
  areaServed: "Worldwide",
  knowsAbout: [
    "Software engineering",
    "Agentic AI",
    "Data science",
    "UI/UX design",
    "Brand identity",
  ],
  sameAs: socialItems.map((s) => s.href),
} satisfies Record<string, unknown>;

/** The site itself, linked to the organization as publisher. */
export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: siteConfig.locale.replace("_", "-"),
  publisher: { "@id": `${siteConfig.url}/#organization` },
} satisfies Record<string, unknown>;

/** A breadcrumb trail. Pass ordered crumbs from the homepage down to the page. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** FAQ rich-result data built from the shared FAQ content. */
export function faqPageJsonLd(items: Faq[] = faqs): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
