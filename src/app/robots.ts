import type { MetadataRoute } from "next";
import { getPortfolioData } from "@/data/portfolio";

export default function robots(): MetadataRoute.Robots {
  const data = getPortfolioData();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: new URL("/sitemap.xml", data.site.url).toString(),
    host: data.site.url,
  };
}
