import type { MetadataRoute } from "next";
import { editions } from "@/lib/content";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...["/", "/ai/", "/ai/weekly/", "/about/", "/methodology/"].map(
      (route) => ({ url: `https://schicane.com${route}` }),
    ),
    ...editions().map((e) => ({
      url: `https://schicane.com/ai/weekly/${e.slug}/`,
      lastModified: e.date,
    })),
  ];
}
