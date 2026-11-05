import { loadContent } from "./lib/content";

const result = loadContent();

if (result.issues.length > 0) {
  console.error(`Invalid ${result.configured}`);
  for (const issue of result.issues) {
    console.error(`- ${issue.path}: ${issue.message}`);
  }
  process.exit(1);
}

if (result.missing.length > 0) {
  console.error("Missing assets:");
  for (const asset of result.missing) {
    console.error(`- public${asset}`);
  }
  process.exit(1);
}

if (!result.data) {
  console.error(`No content loaded from ${result.configured}`);
  process.exit(1);
}

const data = result.data;

console.log(`Content OK: ${result.configured}`);
console.log(`- ${data.work.length} roles, ${data.education.length} degrees`);
console.log(
  `- ${data.projects.length} projects, ${data.openSource.length} open-source entries, ${data.earlierProjects.length} earlier projects`
);
console.log(`- ${data.contact.socials.length} social links`);
