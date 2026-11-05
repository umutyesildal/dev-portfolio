import { getPortfolioData } from "@/data/portfolio";
import { llmsTxt } from "@/lib/content-markdown";

export const dynamic = "force-static";

export function GET() {
  const data = getPortfolioData();

  return new Response(llmsTxt(data), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
