# Handoff: launch dev-portfolio

This file is self-contained. Give it to a friend or an agent.

## Agent brief

> You are helping launch dev-portfolio. Read this whole file first.
> Do not post to LinkedIn or Twitter. They are intentionally out of scope.
> Do not ask for upvotes or stars. Ask for feedback.
> Follow each community's rules. Post at most one Reddit thread per day.
> Stop and ask before posting to Product Hunt or Hacker News.

## What we are launching

A minimal Next.js personal-site template where one YAML file holds all content.
A coding agent can build that YAML from a CV, LinkedIn export, and GitHub.

- Repo: https://github.com/umutyesildal/dev-portfolio
- Demo: https://dev-portfolio-delta-drab.vercel.app
- Personal: https://yesildal.me
- Sample: https://dev-portfolio-designer.vercel.app
- Release: https://github.com/umutyesildal/dev-portfolio/releases/tag/v1.0.0

## Assets

| Asset | Path |
| --- | --- |
| Thumbnail | `docs/template-thumbnail.png` |
| 15s demo GIF | `docs/demo.gif` |
| 15s demo MP4 | `docs/demo.mp4` |
| Home screenshot | `docs/home.png` |
| Portfolio screenshot | `docs/portfolio.png` |
| Sample home | `docs/sample-home.png` |
| Sample portfolio | `docs/sample-portfolio.png` |

## Reddit plan

Read the current sidebar before posting. Rules change.

| Subreddit | When | Rule that matters | Format |
| --- | --- | --- | --- |
| r/SideProject | Any day | Self-promotion allowed. Story and context matter. | Title must be `[Project name] - [Short description]` |
| r/webdev | Saturday only | Showoff Saturday, flair required, 25 karma and 14-day account, 9:1 rule. | Standalone post with `Showoff Saturday` flair |
| r/nextjs | Weekly thread only | Rule 2: no product/project/portfolio shilling outside the pinned Weekly Showoff Thread. | Comment in the pinned weekly thread, not a new post |
| r/coolgithubprojects | Any day | GitHub-hosted projects only. | Clear description plus GitHub link |
| r/opensource | Any day | Use the Promotional flair. Follow the 10% rule. | Link post with context |

Do not post to r/programming, r/reactjs, or r/webdev outside Saturday.

### r/SideProject

Title:

```text
[dev-portfolio] - A source-first portfolio template where an agent writes the YAML
```

Body:

```text
I wanted a portfolio my coding agent could update without touching React.

It became a template:
- content/portfolio.yaml is the only content file
- sources/ + pnpm profile:github + the agent writes the YAML
- profile:check blocks placeholders, missing assets, and example links
- agent endpoints: llms.txt, Markdown, JSON, JSON Schema

Demo: https://dev-portfolio-delta-drab.vercel.app
Sample: https://dev-portfolio-designer.vercel.app
Repo: https://github.com/umutyesildal/dev-portfolio

What should I improve first?
```

### r/webdev, Showoff Saturday

Flair: `Showoff Saturday`.

Title:

```text
[Showoff Saturday] dev-portfolio: a minimal personal-site template with a source-first agent workflow
```

Body:

```text
I built a personal-site template around one YAML file. No CMS, no database.
The part I wanted: my coding agent can fill the YAML from a CV, LinkedIn export,
and GitHub.

- content/portfolio.yaml is the only content file
- sources/ + pnpm profile:github + the agent writes the YAML
- profile:check blocks placeholders, missing assets, and example links
- agent endpoints: llms.txt, Markdown, JSON, JSON Schema

The design is intentionally quiet: cream paper, ink, one lime marker.

Demo: https://dev-portfolio-delta-drab.vercel.app
Sample: https://dev-portfolio-designer.vercel.app
Repo: https://github.com/umutyesildal/dev-portfolio

I would like feedback on the content model and the mobile project rows.
```

### r/nextjs, weekly thread only

Do not create a standalone post. Open the pinned **Weekly Showoff Thread** and
comment:

```text
dev-portfolio: a minimal Next.js personal-site template where one YAML file holds
all content and an agent fills it from a CV, LinkedIn, and GitHub.

Demo: https://dev-portfolio-delta-drab.vercel.app
Repo: https://github.com/umutyesildal/dev-portfolio
```

If there is no weekly thread, skip r/nextjs. Do not post a standalone thread.

### r/coolgithubprojects

Title:

```text
[A minimal personal-site template with a source-first agent workflow] - [dev-portfolio]
```

Body:

```text
GitHub: https://github.com/umutyesildal/dev-portfolio
Demo: https://dev-portfolio-delta-drab.vercel.app

Next.js 16, one YAML content file, Zod validation, and a source-first agent
workflow. MIT.
```

### r/opensource

Flair: `Promotional`.

Title:

```text
dev-portfolio: a source-first portfolio template (MIT)
```

Body:

```text
One YAML file holds the whole site. A coding agent can fill it from a CV, LinkedIn
export, and GitHub. It ships with profile:check and machine-readable endpoints.

Repo: https://github.com/umutyesildal/dev-portfolio
Demo: https://dev-portfolio-delta-drab.vercel.app
```

## Vercel Community Showcase

https://community.vercel.com/new-topic?category=showcase

Title:

```text
dev-portfolio: a source-first portfolio template with one YAML and agent endpoints
```

Body:

```text
I built a minimal personal-site template where all content lives in one YAML file.
The part I wanted: my coding agent should fill it from a CV, LinkedIn export, and
GitHub without touching React.

Workflow: drop cv.pdf, linkedin.pdf, and notes.md in sources/, run
pnpm profile:github <username>, ask the agent to write content/portfolio.yaml,
then run pnpm profile:check and pnpm build.

The site exposes /llms.txt, /portfolio.md, /api/portfolio.json,
/api/schema.json, and /agents.json.

Demo: https://dev-portfolio-delta-drab.vercel.app
Sample: https://dev-portfolio-designer.vercel.app
Repo: https://github.com/umutyesildal/dev-portfolio

MIT, and feedback is welcome.
```

## Product Hunt

Stop and ask the owner before submitting.

- URL: https://www.producthunt.com/posts/new
- Name: `dev-portfolio`
- Tagline: `The agent-built personal portfolio.`
- Website: https://dev-portfolio-delta-drab.vercel.app
- Topics: Developer Tools, Open Source, Design Tools
- Pricing: Free
- Gallery: thumbnail, demo GIF, sample home, portfolio screenshot.

Description:

```text
A minimal Next.js personal site. One YAML file holds everything; your coding
agent fills it from your CV, LinkedIn, and GitHub. Ships with machine-readable
endpoints, a source-first workflow, and a 15-second demo.
```

First comment:

```text
I built this for myself first. I wanted a portfolio that my coding agent could
update without touching React. One YAML file, a GitHub importer, and a check that
blocks placeholders. Then I turned it into a template.
```

Launch time: Tuesday to Thursday, 00:01 PT (09:01 CET). Do not ask for upvotes.

## Show HN

Stop and ask the owner before submitting.

- URL: https://news.ycombinator.com/submit
- Title: `Show HN: An agent-ready personal site template with one YAML and Markdown/JSON endpoints`
- URL field: https://github.com/umutyesildal/dev-portfolio
- Time: 08:00 to 09:00 ET (14:00 to 15:00 CET)

First comment:

```text
The site is a static Next.js app. All content lives in content/portfolio.yaml and
is validated with Zod. A small importer pulls public GitHub data into
sources/github.json; the content check blocks placeholder text, missing assets,
and example links.

The agent-facing part is deliberately simple: /llms.txt for a site map,
/portfolio.md and /index.md for Markdown, /api/portfolio.json for structured
content, /api/schema.json for the input schema, and /agents.json for the source
and update command. There is no database and no CMS.

LinkedIn uses the official PDF export rather than scraping. The demo and the
source are in the repo.
```

## Newsletters

- Next.js Weekly: https://nextjsweekly.com/submit
- React Status: https://react.statuscode.com/submit
- JavaScript Weekly: https://javascriptweekly.com/submit
- TLDR Web Dev: https://tldr.tech/webdev

Name: `dev-portfolio`
URL: https://github.com/umutyesildal/dev-portfolio
Email: `umut@yesildal.me`

Description:

```text
dev-portfolio is a minimal Next.js personal-site template where one YAML file
holds all content. A coding agent can build that YAML from a CV, LinkedIn export,
and GitHub. It ships with a source-first workflow, profile:check, and
machine-readable endpoints: /llms.txt, Markdown, JSON, JSON Schema, /agents.json.
MIT.
```

## Awesome list

PR already open: https://github.com/unicodeveloper/awesome-nextjs/pull/738

Follow notifications. If the maintainer asks for a change, update the fork branch
and push; the PR updates automatically. Do not bump more than once a week.

## Vercel Templates

Submitted on 2026-11-05. Review is manual and can take several days.

- Check email and spam.
- If approved, add a "Featured on Vercel Templates" line to the README.
- If rejected, fix the reason and submit once. Do not resubmit while in review.

## Launch order

1. r/SideProject.
2. Vercel Community Showcase.
3. Newsletters.
4. r/coolgithubprojects or r/opensource, one day later.
5. r/webdev on Saturday.
6. r/nextjs in the weekly thread when it appears.
7. Product Hunt and Show HN after the owner confirms.

## Tracking

| Channel | Link | Notes |
| --- | --- | --- |
| Reddit | | upvotes and comments |
| Vercel Community | | replies |
| Product Hunt | | upvotes and comments |
| Hacker News | | points and comments |
| Newsletters | | mentions |
| GitHub | | stars, forks, issues |

UTM links:

```text
?utm_source=reddit&utm_medium=social
?utm_source=vercel_community&utm_medium=community
?utm_source=producthunt&utm_medium=launch
?utm_source=news_ycombinator&utm_medium=launch
```

## Do not

- Do not post to LinkedIn or Twitter.
- Do not ask for upvotes or stars.
- Do not post the same body to every subreddit.
- Do not create a standalone r/nextjs post.
- Do not post to r/webdev outside Saturday.
- Do not argue with moderators or commenters. If a post is removed, do not
  repost; adjust or ask the mods.
