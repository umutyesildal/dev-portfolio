# Launch kit

Status: submitted to Vercel Templates on 2026-11-05. Review is manual and can
take several days.

LinkedIn and Twitter are intentionally out of scope. The step-by-step execution
copy for a friend or agent is in [`docs/HANDOFF.md`](HANDOFF.md).

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
- Prepare the Show HN post and the Reddit copy.
- Send the newsletter submissions.
- Open the awesome-list PR.

**Day 0**

- 00:01 PT: Product Hunt goes live.
- 08:00 ET (14:00 CET): Show HN.
- 10:00 ET (16:00 CET): r/SideProject.
- Reply to every comment for the rest of the day.

**Day +1**

- Vercel Community Showcase post.
- Newsletters.
- r/coolgithubprojects or r/opensource.
- Direct outreach to 5 developers.

**Saturday**

- r/webdev, Showoff Saturday only.

**Weekly thread**

- r/nextjs, pinned Weekly Showoff Thread only.

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

## Reddit

No standalone r/nextjs post. Use the exact copy and rules in
[`docs/HANDOFF.md`](HANDOFF.md). Summary:

- r/webdev: Saturday only, `Showoff Saturday` flair, 25 karma and a 14-day
  account, 9:1 rule.
- r/nextjs: pinned Weekly Showoff Thread only. Rule 2 bans standalone project
  posts.
- r/SideProject: self-promotion allowed. Title format
  `[dev-portfolio] - [Short description]`.
- r/coolgithubprojects: GitHub-hosted projects only.
- r/opensource: use the Promotional flair.

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
?utm_source=reddit&utm_medium=social
?utm_source=vercel_community&utm_medium=community
```

## Do not

- Do not post the same body to every subreddit.
- Do not post to LinkedIn or Twitter.
- Do not lead with "AI". Lead with the one YAML file and the agent workflow.
- Do not ask for stars. Ask for feedback.
- Do not resubmit to Vercel Templates while the first submission is in review.
