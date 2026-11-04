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
});

const defaultTitle = `${siteConfig.name} — ${siteConfig.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "technology studio",
    "software engineering",
    "AI agents",
    "agentic automation",
    "high-performance web development",
    "UI/UX design systems",
    "intelligent search systems",
    "product engineering",
    "neuroscience data science",
    "EEG and fMRI analysis pipelines",
    "Sri Lanka",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: defaultTitle,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: "/",
  },
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
    <html lang="en" className={cn("h-full antialiased", schibsted.variable, inter.variable, "font-sans")}>
      <body id="top" className="flex min-h-full flex-col">
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
