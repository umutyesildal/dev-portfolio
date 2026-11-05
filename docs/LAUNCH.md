# Launch kit

Status: submitted to Vercel Templates on 2026-11-05. Review is manual and can
take several days.

## Assets

- Thumbnail: `docs/template-thumbnail.png` (1600×630, metadata-free)
- Demo: `docs/demo.gif` (15s), `docs/demo.mp4`
- Screenshots: `docs/home.png`, `docs/portfolio.png`,
  `docs/sample-home.png`, `docs/sample-portfolio.png`
- Demo: https://dev-portfolio-delta-drab.vercel.app
- Personal: https://yesildal.me
- Sample: https://dev-portfolio-designer.vercel.app
- Repo: https://github.com/umutyesildal/dev-portfolio

## Launch timeline

**Day -1**

- Tag `v1.0.0`.
- Open the Product Hunt draft, add gallery assets, first comment, and topics.
- Prepare the Show HN post and the X thread.
- Send the newsletter submissions.
- Open the awesome-list PR.

**Day 0**

- 00:01 PT: Product Hunt goes live.
- 08:00 ET (14:00 CET): Show HN.
- 09:00 ET: X thread and LinkedIn post.
- 10:00 ET: Reddit posts, one per community, with a tailored body.
- Reply to every comment for the rest of the day.

**Day +1**

- Vercel Community Showcase post.
- Direct outreach to 5 developers.
- Reply to newsletter editors and PR reviewers.

## Vercel Community Showcase

Title:

> dev-portfolio: a source-first portfolio template with one YAML and agent endpoints

Body:

> I built a minimal personal-site template where all content lives in one YAML
> file. The part I wanted: my coding agent should fill it from a CV, LinkedIn
> export, and GitHub without touching React.
>
> Workflow: drop `cv.pdf`, `linkedin.pdf`, and `notes.md` in `sources/`, run
> `pnpm profile:github <username>`, ask the agent to write
> `content/portfolio.yaml`, then run `pnpm profile:check` and `pnpm build`.
>
> The site exposes `/llms.txt`, `/portfolio.md`, `/api/portfolio.json`,
> `/api/schema.json`, and `/agents.json`.
>
> Demo: https://dev-portfolio-delta-drab.vercel.app
> Sample: https://dev-portfolio-designer.vercel.app
> Repo: https://github.com/umutyesildal/dev-portfolio
>
> MIT, and feedback is welcome.

## Product Hunt

- **Name:** dev-portfolio
- **Tagline:** The agent-built personal portfolio.
- **Topics:** Developer Tools, Open Source, Design Tools.
- **Gallery:** thumbnail, demo GIF, sample home, portfolio screenshot.
- **Description:** A minimal Next.js personal site. One YAML file holds
  everything; your coding agent fills it from your CV, LinkedIn, and GitHub.
  Ships with machine-readable endpoints, a source-first workflow, and a 15-second
  demo.
- **First comment:** I built this for myself first. I wanted a portfolio that my
  coding agent could update without touching React. One YAML file, a GitHub
  importer, and a check that blocks placeholders. Then I turned it into a
  template.

## Show HN

Title:

> Show HN: An agent-ready personal site template with one YAML and Markdown/JSON endpoints

First comment:

> The site is a static Next.js app. All content lives in `content/portfolio.yaml`
> and is validated with Zod. A small importer pulls public GitHub data into
> `sources/github.json`; the content check blocks placeholder text, missing
> assets, and example links.
>
> The agent-facing part is deliberately simple: `/llms.txt` for a site map,
> `/portfolio.md` and `/index.md` for Markdown, `/api/portfolio.json` for
> structured content, `/api/schema.json` for the input schema, and `/agents.json`
> for the source and update command. There is no database and no CMS.
>
> LinkedIn uses the official PDF export rather than scraping. The demo and the
> source are in the repo.

## X thread

1. I made my portfolio agent-readable: `/llms.txt`, `/portfolio.md`,
   `/api/schema.json`, `/agents.json`.
2. One YAML file drives the whole site. Drop your CV, LinkedIn export, and GitHub
   into `sources/`; your coding agent writes the YAML.
3. `profile:check` blocks placeholders and missing assets before deploy.
4. It is a public template with a 15s demo:
   https://github.com/umutyesildal/dev-portfolio

## LinkedIn

> I turned my portfolio into a source-first template: CV, LinkedIn, and GitHub
> in, one YAML file out. The site is still a minimal personal site, not a
> dashboard.
>
> Demo: https://dev-portfolio-delta-drab.vercel.app
> Sample: https://dev-portfolio-designer.vercel.app
> Repo: https://github.com/umutyesildal/dev-portfolio

## Reddit

**r/nextjs**

> I built a Next.js portfolio template where content is a single YAML file. The
> part I have not seen much: an agent workflow that fills the YAML from a CV,
> LinkedIn export, and GitHub, plus Markdown and JSON endpoints for agents.
> Feedback on the content model or the agent workflow would be useful.

**r/webdev**

> Minimal personal-site template with a cream and lime editorial system. One YAML
> file, no CMS. The agent workflow is optional, but it is the reason I built it.
> I would like feedback on the type and spacing more than the features.

**r/SideProject**

> I wanted a portfolio my coding agent could update without touching React. It
> became a template: sources in, one YAML out, a check that blocks placeholders,
> and a 15s demo. First version is live.

## Newsletters

- Next.js Weekly: https://nextjsweekly.com/submit
- React Status: https://react.statuscode.com/submit
- TLDR Web Dev: https://tldr.tech/webdev

Copy:

> dev-portfolio is a minimal Next.js personal-site template where one YAML file
> holds all content. A coding agent can build that YAML from a CV, LinkedIn
> export, and GitHub. It ships with a source-first workflow, `profile:check`, and
> machine-readable endpoints (`/llms.txt`, Markdown, JSON, JSON Schema,
> `/agents.json`). MIT.

## Awesome lists

### unicodeveloper/awesome-nextjs

Add under **Boilerplates**, near the existing portfolio starter:

```md
- [Dev Portfolio](https://github.com/umutyesildal/dev-portfolio) - A minimal personal site where one YAML file holds all content and a coding agent fills it from a CV, LinkedIn, and GitHub.
```

PR title: `Add Dev Portfolio to Boilerplates`

### Evavic44/portfolio-ideas

This list asks for a screenshot, live URL, repo, and tech stack. Add the sample
profile at the bottom of the portfolio table. Use the existing table format and
the guideline in `CONTRIBUTING.md`.

## Direct outreach

> Hey [name], I built a minimal portfolio template where a coding agent fills the
> content from a CV, LinkedIn export, and GitHub. Would you try it and tell me
> where it breaks? Not asking for a star, just a second pair of eyes.

## Tracking

Use UTM links for each channel:

```text
?utm_source=producthunt&utm_medium=launch
?utm_source=news_ycombinator&utm_medium=launch
?utm_source=x&utm_medium=social
?utm_source=linkedin&utm_medium=social
?utm_source=reddit&utm_medium=social
?utm_source=vercel_community&utm_medium=community
```

## Do not

- Do not post the same body to every subreddit.
- Do not lead with "AI". Lead with the one YAML file and the agent workflow.
- Do not ask for stars. Ask for feedback.
- Do not resubmit to Vercel Templates while the first submission is in review.
