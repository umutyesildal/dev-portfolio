import { existsSync } from "node:fs";
import path from "node:path";
import { loadContent } from "./lib/content";

const result = loadContent();

if (result.issues.length > 0 || result.missing.length > 0) {
  console.error(`Cannot check ${result.configured}`);
  for (const issue of result.issues) {
    console.error(`- ${issue.path}: ${issue.message}`);
  }
  for (const asset of result.missing) {
    console.error(`- missing asset: public${asset}`);
  }
  process.exit(1);
}

if (!result.data) {
  console.error(`No content loaded from ${result.configured}`);
  process.exit(1);
}

const placeholders: Array<{ pattern: RegExp; label: string }> = [
  { pattern: /^your name$/i, label: "your name" },
  { pattern: /^your city/i, label: "your city" },
  { pattern: /^replace this/i, label: "replace this" },
  { pattern: /^describe your/i, label: "describe your" },
  { pattern: /^summarize/i, label: "summarize" },
  { pattern: /^project alpha$/i, label: "project alpha" },
  { pattern: /^project beta$/i, label: "project beta" },
  { pattern: /^example company$/i, label: "example company" },
  { pattern: /^previous company$/i, label: "previous company" },
  { pattern: /^example university$/i, label: "example university" },
  { pattern: /^example college$/i, label: "example college" },
  { pattern: /^early project$/i, label: "early project" },
  { pattern: /^open source project$/i, label: "open source project" },
  { pattern: /^your-username$/i, label: "your-username" },
  { pattern: /your-username/i, label: "your-username" },
  { pattern: /example\.com/i, label: "example.com" },
  { pattern: /hello@example\.com/i, label: "hello@example.com" },
  { pattern: /portrait-placeholder/i, label: "portrait placeholder" },
];

type PlaceholderHit = {
  path: string;
  value: string;
  label: string;
};

function findPlaceholders(value: unknown, path: string, hits: PlaceholderHit[]) {
  if (typeof value === "string") {
    const match = placeholders.find(({ pattern }) => pattern.test(value));
    if (match) {
      hits.push({ path, value, label: match.label });
    }
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) =>
      findPlaceholders(item, `${path}[${index}]`, hits)
    );
    return;
  }

  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      findPlaceholders(child, path ? `${path}.${key}` : key, hits);
    }
  }
}

const hits: PlaceholderHit[] = [];
findPlaceholders(result.data, "", hits);

if (hits.length > 0) {
  console.error(`Placeholder content found in ${result.configured}:`);
  for (const hit of hits) {
    const preview = hit.value.replace(/\s+/g, " ").slice(0, 72);
    console.error(`- ${hit.path}: "${preview}" (${hit.label})`);
  }
  console.error("\nReplace the placeholders with your own verified content.");
  process.exit(1);
}

console.log(`Profile OK: ${result.configured}`);
console.log(`- ${result.data.work.length} roles, ${result.data.education.length} degrees`);
console.log(
  `- ${result.data.projects.length} projects, ${result.data.openSource.length} open-source entries, ${result.data.earlierProjects.length} earlier projects`
);
console.log(`- ${result.data.contact.socials.length} social links`);

const sourceGroups = [
  { label: "CV", files: ["cv.pdf", "cv.docx", "cv.txt"] },
  { label: "LinkedIn", files: ["linkedin.pdf", "linkedin.html"] },
  { label: "GitHub", files: ["github.json"] },
  { label: "Notes", files: ["notes.md"] },
];
const sourceDir = path.join(process.cwd(), "sources");
const sources = sourceGroups.map((group) => ({
  label: group.label,
  file: group.files.find((file) => existsSync(path.join(sourceDir, file))),
}));

if (sources.some((source) => source.file)) {
  console.log("Sources:");
  for (const source of sources) {
    console.log(`- ${source.label}: ${source.file ?? "missing"}`);
  }
}
