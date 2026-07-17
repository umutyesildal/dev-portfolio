import "server-only";

import { readFileSync } from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import { portfolioSchema, type PortfolioData } from "./schema";

const contentPath = path.join(process.cwd(), "content", "portfolio.yaml");

export function getPortfolioData(): PortfolioData {
  const source = readFileSync(contentPath, "utf8");
  const result = portfolioSchema.safeParse(parse(source));

  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `- ${issue.path.join(".") || "root"}: ${issue.message}`)
      .join("\n");

    throw new Error(`Invalid content/portfolio.yaml:\n${details}`);
  }

  return result.data;
}
