import { getPortfolioData } from "@/data/portfolio";
import { homeMarkdown } from "@/lib/content-markdown";

export const dynamic = "force-static";

export function GET() {
  const data = getPortfolioData();

  return new Response(homeMarkdown(data), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
