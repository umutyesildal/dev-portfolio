import { getPortfolioData } from "@/data/portfolio";
import { llmsFullTxt } from "@/lib/content-markdown";

export const dynamic = "force-static";

export function GET() {
  const data = getPortfolioData();

  return new Response(llmsFullTxt(data), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
