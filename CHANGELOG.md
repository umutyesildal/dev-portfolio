# Changelog

## 1.0.0 - 2026-11-05

### Added

- Minimal personal site with a warm editorial system, cream paper, ink text, and
  one lime marker.
- Single `content/portfolio.yaml` content source, validated with Zod.
- Source-first workflow: CV, LinkedIn export, GitHub data, and notes in
  `sources/`, then an agent writes the YAML.
- `pnpm profile:github <username>` GitHub importer.
- `pnpm profile:check` for placeholders, missing assets, and example links.
- `skills/portfolio-builder/SKILL.md`, installable with
  `npx skills add umutyesildal/dev-portfolio`.
- Machine-readable endpoints: `/llms.txt`, `/llms-full.txt`, `/index.md`,
  `/portfolio.md`, `/api/portfolio.json`, `/api/schema.json`, `/agents.json`.
- Fictional designer sample at
  [dev-portfolio-designer.vercel.app](https://dev-portfolio-designer.vercel.app).
- 15-second demo (`docs/demo.gif`, `docs/demo.mp4`).
- Security headers, production CSP, `security.txt`, `SECURITY.md`, and a
  production dependency audit in CI.
- README split into a short landing page and `docs/REFERENCE.md`.
- Vercel template thumbnail at `docs/template-thumbnail.png`.

### Changed

- Canonical domain moved to [yesildal.me](https://yesildal.me).
- Portfolio roles aligned with LinkedIn: Product Operations at Trade Republic,
  Recruitment Operations at Project A.
- Removed the skills section, the motion library, and the old icon registry.
- Trimmed the project list and moved the archive into the same compact list as
  open source.
