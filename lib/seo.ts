/**
 * SEO helpers — a single source of truth for per-page metadata and structured
 * data. Keeps `openGraph`, `twitter`, canonicals and JSON-LD consistent across
 * every route so search results and social shares stay on-brand. Content
 * values come from `site-config`; edit there, not here.
 */
import type { Metadata } from "next";
import { divisions, siteConfig, socialItems, faqs, type Faq } from "@/lib/site-config";

/** Resolve a route path to its absolute URL (root collapses to the bare origin). */
export function absoluteUrl(path = "/"): string {
  return `${siteConfig.url}${path === "/" ? "" : path}`;
}

/** Only real, verified profiles are offered to search engines as `sameAs`. */
const verifiedProfiles = socialItems.filter((s) => s.verified).map((s) => s.href);

interface ArticleMeta {
  /** ISO date, e.g. "2026-10-14". */
  publishedTime: string;
  authors: string[];
  tags: string[];
}

interface PageMetaInput {
  /** Page title — omit on the homepage to fall back to the layout default. */
  title?: string;
  /** Meta + social description. Keep it under ~160 characters. */
  description?: string;
  /** Route path, e.g. "/studio". Drives the canonical and Open Graph URL. */
  path: string;
  /** Marks the page as an article (insight posts) with its date, authors and topics. */
  article?: ArticleMeta;
  /** Keep the page out of search results (e.g. thank-you or utility pages). */
  noIndex?: boolean;
}

/**
 * Build per-page `Metadata` with matching canonical, Open Graph and Twitter
 * fields. The social image comes from the `opengraph-image`/`twitter-image`
 * file conventions, so it is intentionally not set here.
 */
export function buildPageMetadata({ title, description, path, article, noIndex }: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const desc = description ?? siteConfig.seoDescription;
  // The document <title> uses the "%s | Name" template; mirror it for social.
  const socialTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} | ${siteConfig.tagline}`;

  return {
    // Only set a title when given; an explicit `undefined` would erase the layout default.
    ...(title ? { title } : {}),
    description: desc,
    alternates: { canonical: path === "/" ? "/" : path },
    openGraph: article
      ? {
          type: "article",
          locale: siteConfig.locale,
          url,
          siteName: siteConfig.name,
          title: socialTitle,
          description: desc,
          publishedTime: article.publishedTime,
          authors: article.authors,
          tags: article.tags,
        }
      : {
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
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

/* ------------------------------------------------------------------ */
/* Structured data (schema.org / JSON-LD)                              */
/* ------------------------------------------------------------------ */

/**
 * The studio as an Organization — the entity Google uses for the knowledge
 * panel and to connect the site with its social profiles. Location is stated
 * at country level only; no street address or personal data.
 */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  alternateName: "Muron Labs",
  url: siteConfig.url,
  // Google requires a raster logo (at least 112×112) for rich results.
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/logo.png"),
    width: 800,
    height: 800,
  },
  image: absoluteUrl("/logo.png"),
  description: siteConfig.seoDescription,
  slogan: siteConfig.tagline,
  email: siteConfig.contact.email,
  address: { "@type": "PostalAddress", addressCountry: "LK" },
  areaServed: "Worldwide",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: siteConfig.contact.email,
    url: absoluteUrl("/contact"),
    areaServed: "Worldwide",
    availableLanguage: ["English"],
  },
  knowsAbout: [
    "Software engineering",
    "Web application development",
    "Mobile app development",
    "Cloud infrastructure",
    "Workflow automation",
    "AI agents",
    "Large language models",
    "Data engineering",
    "Data science",
    "Neuroscience data analysis",
    "UI/UX design",
    "Design systems",
    "Brand identity",
  ],
  // The three divisions, as the services the organization offers.
  makesOffer: divisions.map((d) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: d.name, description: d.tagline, url: absoluteUrl(`/ecosystem#${d.id}`) },
  })),
  ...(verifiedProfiles.length ? { sameAs: verifiedProfiles } : {}),
} satisfies Record<string, unknown>;

/** The site itself, linked to the organization as publisher. */
export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.seoDescription,
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

/** FAQ structured data built from the shared FAQ content. */
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
