import type { MetadataRoute } from "next";
import { siteConfig, siteRoutes } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return siteRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path === "/" ? "" : route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
