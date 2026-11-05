import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import { portfolioSchema, type PortfolioData } from "../../src/data/schema";

export type ContentIssue = {
  path: string;
  message: string;
};

export type ContentLoadResult = {
  configured: string;
  data: PortfolioData | null;
  issues: ContentIssue[];
  missing: string[];
};

export function loadContent(configuredFile?: string): ContentLoadResult {
  const configured =
    configuredFile?.trim() ||
    process.env.PORTFOLIO_CONTENT_FILE?.trim() ||
    "content/portfolio.yaml";
  const projectRoot = process.cwd();
  const contentPath = path.resolve(projectRoot, configured);

  if (!contentPath.startsWith(`${projectRoot}${path.sep}`)) {
    return {
      configured,
      data: null,
      issues: [
        {
          path: "root",
          message: "Content file must stay inside the project directory.",
        },
      ],
      missing: [],
    };
  }

  if (!existsSync(contentPath)) {
    return {
      configured,
      data: null,
      issues: [
        { path: "root", message: `Content file not found: ${configured}` },
      ],
      missing: [],
    };
  }

  const result = portfolioSchema.safeParse(
    parse(readFileSync(contentPath, "utf8"))
  );

  if (!result.success) {
    return {
      configured,
      data: null,
      issues: result.error.issues.map((issue) => ({
        path: issue.path.join(".") || "root",
        message: issue.message,
      })),
      missing: [],
    };
  }

  const data = result.data;
  const assets = [
    data.site.avatar,
    data.socialPreview.avatar,
    ...data.projects.map((project) => project.image),
  ].filter(Boolean);

  const missing = assets.filter((asset) => {
    const file = path.join(projectRoot, "public", asset.replace(/^\//, ""));
    return !existsSync(file);
  });

  return { configured, data, issues: [], missing };
}
