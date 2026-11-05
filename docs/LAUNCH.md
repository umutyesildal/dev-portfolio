# Launch kit

The product is ready. The remaining work is distribution.

## Vercel Templates

Submit at <https://vercel.com/templates/submit>.

| Field | Value |
| --- | --- |
| Name | dev-portfolio |
| Tagline | One YAML. Your agent builds it from your CV, LinkedIn, and GitHub. |
| Description | A minimal Next.js personal site where one YAML file holds all content. Your coding agent builds that YAML from a CV, LinkedIn export, and GitHub data. Ships with a source-first workflow, machine-readable endpoints, and a fictional designer sample. |
| Categories | Portfolio, Personal, Next.js |
| Tags | portfolio, personal-site, nextjs, typescript, tailwindcss, yaml, agents, llms-txt |
| Demo | https://dev-portfolio-delta-drab.vercel.app |
| Sample | https://dev-portfolio-designer.vercel.app |
| Repository | https://github.com/umutyesildal/dev-portfolio |
| License | MIT |
| Environment | None required. `PORTFOLIO_CONTENT_FILE` is optional for multiple profiles. |

Thumbnail: `docs/template-thumbnail.png` — 1600×630, 2.54:1, 155 KB.
Source: `docs/template-thumbnail.html` (rendered at 1600×900, cropped to 630).

The committed thumbnail is metadata-free (no EXIF or ICC chunks). If you
re-render it, strip metadata before uploading.

Screenshots:

- https://raw.githubusercontent.com/umutyesildal/dev-portfolio/main/docs/home.png
- https://raw.githubusercontent.com/umutyesildal/dev-portfolio/main/docs/portfolio.png
- https://raw.githubusercontent.com/umutyesildal/dev-portfolio/main/docs/sample-home.png
- https://raw.githubusercontent.com/umutyesildal/dev-portfolio/main/docs/sample-portfolio.png

Checklist:

- Public repository with a working demo.
- Deploy to Vercel button in the README.
- README, license, screenshots, and environment notes.
- No secrets or private assets committed.
- Both demo profiles build from the same code.

Vercel review is manual and can take several days. Submit once, then leave it.

## Product Hunt

- **Name:** dev-portfolio
- **Tagline:** The agent-built personal portfolio.
- **Description:** A minimal Next.js personal site. One YAML file holds everything; your coding agent fills it from your CV, LinkedIn, and GitHub. Ships with machine-readable endpoints, a source-first workflow, and a 15-second demo.
- **First comment:** "I built this for myself first. I wanted a portfolio that my coding agent could update without touching React. One YAML file, a GitHub importer, and a check that blocks placeholders. Then I turned it into a template."

## Show HN

- **Title:** Show HN: An agent-ready personal site template with one YAML and Markdown/JSON endpoints
- **First comment:** Explain the technical shape: Next.js static site, YAML + Zod, `profile:github`, `profile:check`, `/llms.txt`, `/portfolio.md`, `/api/schema.json`, `/agents.json`. Mention that LinkedIn uses the official PDF export, not scraping. Do not lead with "AI".

## X thread

1. I made my portfolio agent-readable: `/llms.txt`, `/portfolio.md`, `/api/schema.json`, `/agents.json`.
2. One YAML file drives the whole site. Drop your CV, LinkedIn export, and GitHub into `sources/`; your coding agent writes the YAML.
3. `profile:check` blocks placeholders and missing assets before deploy.
4. It is a public template: dev-portfolio. 15s demo in the repo.

## LinkedIn

Post the 15-second demo and one sentence:

> I turned my portfolio into a source-first template: CV, LinkedIn, and GitHub in, one YAML file out. The site is still a minimal personal site, not a dashboard.

## Tracking

Use UTM links for each channel:

```text
?utm_source=producthunt&utm_medium=launch
?utm_source=news_ycombinator&utm_medium=launch
?utm_source=x&utm_medium=social
?utm_source=linkedin&utm_medium=social
```
