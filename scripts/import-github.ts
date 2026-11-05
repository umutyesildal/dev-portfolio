import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const username = process.argv[2]?.trim();

if (!username || !/^[a-zA-Z0-9-]+$/.test(username)) {
  console.error("Usage: pnpm profile:github <github-username>");
  process.exit(1);
}

const headers: Record<string, string> = {
  Accept: "application/vnd.github+json",
  "User-Agent": "dev-portfolio-profile-importer",
  "X-GitHub-Api-Version": "2022-11-28",
};

if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

async function getJson(url: string) {
  const response = await fetch(url, { headers });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `${response.status} ${response.statusText}: ${body.slice(0, 240)}`
    );
  }

  return response.json();
}

async function main() {
  const user = await getJson(`https://api.github.com/users/${username}`);
  const repos = await getJson(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`
  );

  const payload = {
    fetched_at: new Date().toISOString(),
    user: {
      login: user.login,
      name: user.name,
      bio: user.bio,
      company: user.company,
      location: user.location,
      blog: user.blog,
      twitter_username: user.twitter_username,
      public_repos: user.public_repos,
      followers: user.followers,
      created_at: user.created_at,
    },
    repos: repos.map(
      (repo: {
        name: string;
        description: string | null;
        html_url: string;
        homepage: string | null;
        topics: string[];
        language: string | null;
        stargazers_count: number;
        forks_count: number;
        archived: boolean;
        fork: boolean;
        pushed_at: string;
        created_at: string;
      }) => ({
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        homepage: repo.homepage,
        topics: repo.topics,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        archived: repo.archived,
        fork: repo.fork,
        pushed_at: repo.pushed_at,
        created_at: repo.created_at,
      })
    ),
  };

  const sourcesDir = path.join(process.cwd(), "sources");
  mkdirSync(sourcesDir, { recursive: true });
  writeFileSync(
    path.join(sourcesDir, "github.json"),
    `${JSON.stringify(payload, null, 2)}\n`
  );

  const active = payload.repos.filter(
    (repo: { fork: boolean; archived: boolean }) => !repo.fork && !repo.archived
  );

  console.log("Wrote sources/github.json");
  console.log(`- ${payload.user.public_repos} public repos for ${payload.user.login}`);
  console.log(`- ${payload.repos.length} fetched, ${active.length} active non-forks`);

  if (!process.env.GITHUB_TOKEN) {
    console.log("Tip: set GITHUB_TOKEN for a higher GitHub API rate limit.");
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
