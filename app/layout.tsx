import type { Metadata, Viewport } from "next";
import { Geist_Mono, Google_Sans, Google_Sans_Flex } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { SiteHeader } from "@/components/navigation/site-header";
import { ContactDrawerProvider } from "@/components/contact/contact-drawer";
import { GooFilter } from "@/components/ui/liquid-button";

/** Body copy, UI and eyebrows. */
const googleSansFlex = Google_Sans_Flex({
  variable: "--font-flex",
  adjustFontFallback: false,
  fallback: ["system-ui", "sans-serif"],
  subsets: ["latin"],
});

/** Display headings. */
const googleSans = Google_Sans({
  variable: "--font-gsans",
  adjustFontFallback: false,
  fallback: ["system-ui", "sans-serif"],
  subsets: ["latin"],
});

/** Pixel display face for the large headlines — undefined medium (OFL), self-hosted. */
const undefinedMedium = localFont({
  src: "./fonts/undefined-medium.woff2",
  variable: "--font-undefined",
  weight: "500",
  fallback: ["ui-monospace", "monospace"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  themeColor: "#ededed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", googleSansFlex.variable, googleSans.variable, undefinedMedium.variable, geistMono.variable, "font-sans")}
    >
      <body id="top" className="flex min-h-full flex-col">
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
        <GooFilter />
        <ContactDrawerProvider>
          <SiteHeader />
          {children}
        </ContactDrawerProvider>
      </body>
    </html>
  );
}
