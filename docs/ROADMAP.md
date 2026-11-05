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

## Next

1. **One fictional example profile.** A second `PORTFOLIO_CONTENT_FILE` example
   with a different role than the personal site.
2. **Vercel Templates submission.** High-intent, evergreen distribution.
3. **Publish the skill.** List `portfolio-builder` on skills.sh and link it from
   the README.
4. **Showcase.** Collect the first 5-10 sites built with the template and add a
   short gallery.

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
