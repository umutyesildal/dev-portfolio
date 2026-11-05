---
name: portfolio-builder
description: Build or update a dev-portfolio content/portfolio.yaml from a CV, LinkedIn export, GitHub data, or notes. Use when the user asks to create or update their portfolio from their CV, LinkedIn, or GitHub.
---

# Portfolio builder

Turn the user's existing profile material into `content/portfolio.yaml`. The
template handles the design; you handle the content mapping.

## Read first

1. `sources/README.md`
2. `AGENTS.md`
3. `src/data/schema.ts`
4. `sources/cv.pdf` or `sources/cv.docx` / `sources/cv.txt`
5. `sources/linkedin.pdf` or `sources/linkedin.html`
6. `sources/github.json`
7. `sources/notes.md`

If `sources/github.json` is missing or stale, run:

```bash
pnpm profile:github <github-username>
```

## Build

1. Extract facts from the sources: name, location, summary, roles, dates,
   education, projects, links, and social profiles.
2. Map them to the schema in `src/data/schema.ts`.
3. Write `content/portfolio.yaml`.
4. Keep the site visible: a strong home headline, a short intro, 4-7 selected
   projects, and a contact email.
5. Run the checks:

```bash
pnpm profile:check
pnpm lint
pnpm typecheck
pnpm build
```

6. Report what you extracted and what is still missing.

## Selection rules

- Pick 5-7 projects. Prefer recent, shipped, and verifiable work with a link,
  a metric, or a clear outcome.
- Put older or smaller projects in `earlierProjects`.
- Put current open-source repositories in `openSource`.
- Do not list every repository. Choose the ones that support the user's target
  roles.
- Keep one project description to one or two sentences.

## Truth rules

- Use only facts present in the sources.
- Never invent dates, metrics, employers, links, technologies, awards, or
  outcomes.
- If a fact is missing, ask the user. Do not fill the gap with a guess.
- Preserve numbers exactly, including their scope (team, group, experiment).
- LinkedIn does not allow direct scraping. Use the exported PDF or saved HTML.
- Do not commit anything from `sources/`; it is personal data and git-ignored.

## Output

- `content/portfolio.yaml` is the only content file you edit.
- Never edit generated Markdown or JSON endpoints.
- The final state must pass `pnpm profile:check` and `pnpm build`.
