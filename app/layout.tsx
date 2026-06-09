import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { siteConfig, socialItems } from "@/lib/site-config";
import { SiteHeader } from "@/components/navigation/site-header";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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

/** Organization structured data for search engines and AI crawlers. */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.shortDescription,
  email: siteConfig.contact.email,
  sameAs: socialItems.map((s) => s.href),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body id="top" className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
