import type { MetadataRoute } from "next";
import { siteConfig, siteRoutes } from "@/lib/site-config";
import { insights } from "@/lib/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = siteRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path === "/" ? "" : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const posts = insights.map((post) => ({
    url: `${siteConfig.url}/insights/${post.slug}`,
    lastModified: new Date(`${post.date}T00:00:00Z`),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...pages, ...posts];
}
