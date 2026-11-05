import { NextResponse } from "next/server";
import { getPortfolioData } from "@/data/portfolio";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(getPortfolioData(), {
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
}
