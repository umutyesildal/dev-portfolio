import { NextResponse } from "next/server";
import { z } from "zod";
import { portfolioSchema } from "@/data/schema";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(z.toJSONSchema(portfolioSchema, { io: "input" }), {
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
}
