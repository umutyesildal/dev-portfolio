# Roadmap

The product is a minimal personal site, not a dashboard. Everything below either
improves the content workflow or helps people find the template.

## Shipped

- Minimal personal site with a warm editorial system.
- One `content/portfolio.yaml`, validated with Zod.
- Source-first workflow: `sources/` → `pnpm profile:github` → agent writes YAML.
- `pnpm profile:check` for placeholders, assets, and example links.
- `skills/portfolio-builder/SKILL.md` for coding agents.
- Machine-readable endpoints: `llms.txt`, Markdown pages, JSON, JSON Schema, and
  `agents.json`.
- Security headers, `security.txt`, `SECURITY.md`, dependency audit in CI.
- 15-second demo (`docs/demo.gif`, `docs/demo.mp4`).
- Source completeness summary in `pnpm profile:check`.
- Fictional designer profile at
  [dev-portfolio-designer.vercel.app](https://dev-portfolio-designer.vercel.app).
- `portfolio-builder` is installable with
  `npx skills add umutyesildal/dev-portfolio`.
- Showcase page with the personal site and the sample.

## In progress

- Vercel Templates review. Submitted on 2026-11-05; the launch kit is in
  `docs/LAUNCH.md`.

## Next

1. **Launch day execution.** Product Hunt, Show HN, Reddit, newsletters, and the
   Vercel Community Showcase post.
2. **Grow the showcase.** Collect the first 5-10 sites built with the template.
3. **Real 15-second capture.** Replace the designed demo animation with a real
   terminal and browser recording when available.

## Later

- `profile:preview`: build and screenshot the site before deploying.
- A `profile:new` command that scaffolds a blank YAML from notes.
- Theme presets, only if users ask for them.
- Dark mode, only if it can keep the cream identity.

## Not planned

- A web wizard, auth, database, or hosted CMS.
- LinkedIn URL scraping.
- A profile score or gamification.
- Dozens of templates and themes.
