import { NextResponse } from "next/server";
import { getPortfolioData } from "@/data/portfolio";

export const dynamic = "force-static";

export function GET() {
  const data = getPortfolioData();
  const repository = data.site.repository;

  return NextResponse.json(
    {
      name: data.site.name,
      description: data.site.description,
      url: data.site.url,
      content: "/api/portfolio.json",
      schema: "/api/schema.json",
      llms: "/llms.txt",
      llmsFull: "/llms-full.txt",
      markdown: {
        home: "/index.md",
        portfolio: "/portfolio.md",
      },
      ...(repository
        ? {
            source: `${repository}/blob/main/content/portfolio.yaml`,
            instructions: `${repository}/blob/main/AGENTS.md`,
          }
        : {}),
      update:
        "Edit content/portfolio.yaml, run pnpm content:check, then pnpm build.",
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    }
  );
}
