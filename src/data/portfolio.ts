import "server-only";

import { readFileSync } from "node:fs";
import path from "node:path";
import { cache } from "react";
import { parse } from "yaml";
import { portfolioSchema, type PortfolioData } from "./schema";

const defaultContentFile = "content/portfolio.yaml";

function resolveContentPath() {
  const projectRoot = process.cwd();
  const configuredFile =
    process.env.PORTFOLIO_CONTENT_FILE?.trim() || defaultContentFile;

  if (
    path.isAbsolute(configuredFile) ||
    ![".yaml", ".yml"].includes(path.extname(configuredFile))
  ) {
    throw new Error(
      "PORTFOLIO_CONTENT_FILE must be a relative .yaml or .yml file path"
    );
  }

  const contentPath = path.resolve(
    /* turbopackIgnore: true */ projectRoot,
    configuredFile
  );
  if (!contentPath.startsWith(`${projectRoot}${path.sep}`)) {
    throw new Error("PORTFOLIO_CONTENT_FILE must stay inside the project directory");
  }

  return { configuredFile, contentPath };
}

export const getPortfolioData = cache(function getPortfolioData(): PortfolioData {
  const { configuredFile, contentPath } = resolveContentPath();
  const source = readFileSync(
    /* turbopackIgnore: true */ contentPath,
    "utf8"
  );
  const result = portfolioSchema.safeParse(parse(source));

  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `- ${issue.path.join(".") || "root"}: ${issue.message}`)
      .join("\n");

    throw new Error(`Invalid ${configuredFile}:\n${details}`);
  }

  return result.data;
});
