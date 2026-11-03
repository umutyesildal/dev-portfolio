import type { MetadataRoute } from "next";
import { getPortfolioData } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const data = getPortfolioData();
  const lastModified = new Date();

  return [
    {
      url: data.site.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: new URL("/portfolio", data.site.url).toString(),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
