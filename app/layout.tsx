import type { Metadata, Viewport } from "next";
import { Inter, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { SiteHeader } from "@/components/navigation/site-header";

/** The single typeface: body, UI and display, regular and italic. */
const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

/** Navigation only — Labrina's nav sets Inter at 14px / 500. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
  // Not preloaded: the headline font (Schibsted Grotesk) loads first, which
  // speeds up the page's Largest Contentful Paint.
  preload: false,
});

/**
 * Default <title> for the home page and for social shares: brand first, then
 * the services people actually search for. Under 60 characters.
 */
const defaultTitle = `${siteConfig.name} | Software, AI & Design Studio`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.seoDescription,
  applicationName: siteConfig.name,
  keywords: [
    "software development company Sri Lanka",
    "AI development company",
    "AI agents",
    "workflow automation",
    "web application development",
    "mobile app development",
    "data engineering",
    "data science consulting",
    "LLM integration",
    "neuroscience data analysis",
    "UI/UX design studio",
    "design systems",
    "technology studio",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: defaultTitle,
    description: siteConfig.seoDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteConfig.seoDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // Search Console / Bing verification: set these env vars when you add the site.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  // Each page sets its own canonical via buildPageMetadata().
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f4f6f6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={cn("h-full antialiased", schibsted.variable, inter.variable, "font-sans")}>
      <body id="top" className="flex min-h-full flex-col">
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
