import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import { portfolioSchema } from "../src/data/schema";

const configured =
  process.env.PORTFOLIO_CONTENT_FILE?.trim() || "content/portfolio.yaml";
const projectRoot = process.cwd();
const contentPath = path.resolve(projectRoot, configured);

if (!contentPath.startsWith(`${projectRoot}${path.sep}`)) {
  console.error("Content file must stay inside the project directory.");
  process.exit(1);
}

if (!existsSync(contentPath)) {
  console.error(`Content file not found: ${configured}`);
  process.exit(1);
}

const source = readFileSync(contentPath, "utf8");
const result = portfolioSchema.safeParse(parse(source));

if (!result.success) {
  console.error(`Invalid ${configured}`);
  for (const issue of result.error.issues) {
    console.error(`- ${issue.path.join(".") || "root"}: ${issue.message}`);
  }
  process.exit(1);
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

if (missing.length > 0) {
  console.error("Missing assets:");
  for (const asset of missing) console.error(`- public${asset}`);
  process.exit(1);
}

console.log(`Content OK: ${configured}`);
console.log(`- ${data.work.length} roles, ${data.education.length} degrees`);
console.log(
  `- ${data.projects.length} projects, ${data.openSource.length} open-source entries, ${data.earlierProjects.length} earlier projects`
);
console.log(`- ${data.contact.socials.length} social links`);
