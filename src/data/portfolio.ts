import "server-only";

import { readFileSync } from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import { portfolioSchema, type PortfolioData } from "./schema";

const defaultContentFile = "content/portfolio.yaml";

function resolveContentPath() {
  const projectRoot = process.cwd();
  const configuredFile =
    process.env.PORTFOLIO_CONTENT_FILE?.trim() || defaultContentFile;

  if (path.isAbsolute(configuredFile) || path.extname(configuredFile) !== ".yaml") {
    throw new Error("PORTFOLIO_CONTENT_FILE must be a relative .yaml file path");
  }

  const contentPath = path.resolve(projectRoot, configuredFile);
  if (!contentPath.startsWith(`${projectRoot}${path.sep}`)) {
    throw new Error("PORTFOLIO_CONTENT_FILE must stay inside the project directory");
  }

  return { configuredFile, contentPath };
}

export function getPortfolioData(): PortfolioData {
  const { configuredFile, contentPath } = resolveContentPath();
  const source = readFileSync(contentPath, "utf8");
  const result = portfolioSchema.safeParse(parse(source));

  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `- ${issue.path.join(".") || "root"}: ${issue.message}`)
      .join("\n");

    throw new Error(`Invalid ${configuredFile}:\n${details}`);
  }

  return result.data;
}
