# Portfolio agent guide

This repository is a content-driven personal portfolio template. The usual task is
to customize the site from a CV, resume, LinkedIn export, or a short personal brief.

## Source of truth

- All user-editable portfolio content lives in `content/portfolio.yaml`.
- `content/README.md` is the short content workflow; this file is the canonical
  agent guide.
- Content shape and required fields are defined in `src/data/schema.ts`.
- Images and downloadable files belong in `public/`; reference them from YAML with
  root-relative paths such as `/portrait.jpg`.
- `site.url` must be the absolute production URL of the deployed site. Canonical
  URLs, `sitemap.xml`, `robots.txt`, and JSON-LD all read from it.
- `examples/umut-portfolio.yaml` is a reference implementation, not active site
  content. Do not edit or copy its personal claims into another person's portfolio.
- `PORTFOLIO_CONTENT_FILE` may select another repository-relative YAML file at
  build time. The default remains `content/portfolio.yaml`.
- React components under `src/` are the presentation layer. Do not edit them for a
  content-only customization unless the requested layout cannot be represented by
  the existing schema.
- `site.repository` should point at the public repository. It feeds the source and
  instructions links in `/agents.json`.

## Machine-readable outputs

The site generates these from the YAML at build time:

- `/llms.txt` and `/llms-full.txt`
- `/index.md` and `/portfolio.md`
- `/api/portfolio.json` and `/api/schema.json`
- `/agents.json`

Never edit generated output by hand. Edit `content/portfolio.yaml`, then rebuild.

## CV-to-portfolio workflow

1. Read the supplied CV or resume completely.
2. Read `content/portfolio.yaml` and `src/data/schema.ts` before editing.
3. Replace the example identity, contact details, experience, education, and
   projects with evidence from the supplied material.
4. Prioritize recent, technically substantial work. Move older work to
   `earlierProjects` when it is still useful but should not dominate the page.
5. Preserve measurable results exactly. Do not invent dates, metrics, employers,
   links, technologies, awards, or project outcomes.
6. Leave an optional URL or asset field empty when no verified value is available.
7. Keep descriptions concise and recruiter-readable. Project descriptions may use
   simple Markdown such as `**bold text**`.
8. Add the portrait as a square image at least 960×960 px, with the face centered.
   Place it in `public/` and point both `site.avatar` and `socialPreview.avatar` at
   the same root-relative path. Never hotlink a remote image.

## Content rules

- Keep all visible personal copy in YAML.
- Use plain strings for dates so ranges and labels retain their intended formatting.
  Quote numeric-looking years, for example `"2025"`.
- Use unique names for social entries, work entries, and projects. A work entry is
  identified by the pair `company` + `title`.
- Keep social names referenced by `home.featuredSocials` and
  `portfolio.headerSocials` synchronized with `contact.socials[].name`.
- Use `work[].shortTitle` only as a shortened form of `work[].title` for the
  collapsed accordion row. It is optional and falls back to the full title. Do not
  use it to change the role.
- `projects[].metric` is optional and appears as a short marker next to the project
  title. Use only a figure supported by the source material, keep it brief (`3×`,
  `40%`, `0.2756 AP`), and leave it empty when nothing is verified. Never invent,
  extrapolate, or embellish a metric.
- `projects[].image` is optional and expects a root-relative screenshot in
  `public/`, roughly 16:9. Leave it empty when no suitable image exists.
- `openSource` is a separate list for current open-source repositories. It renders
  only when non-empty; do not duplicate entries that already appear in `projects`.
- Keep project links public and safe to expose.
- When publishing under a new owner or domain, update
  `public/.well-known/security.txt` and `SECURITY.md` with the real contact and
  production URLs.
- Do not place secrets, private repository URLs, API keys, phone numbers, or private
  addresses in the template unless the user explicitly requests publication.
- Treat the checked-in identity, copy, and portrait as demo content. Replace them;
  do not present the demo person's identity as the new portfolio owner's.
- The schema has no fields for icons, logos, videos, summaries, or hackathons. Do
  not add them to YAML or reintroduce icon registries.

## Commands

```bash
pnpm install
pnpm dev
pnpm content:check
pnpm lint
pnpm typecheck
pnpm build
pnpm audit
```

## Content update protocol

1. Read `content/portfolio.yaml` and `src/data/schema.ts` before editing.
2. Edit only the YAML and assets under `public/`.
3. Run `pnpm content:check` and fix every reported path.
4. Run `pnpm lint`, `pnpm typecheck`, and `pnpm build`.
5. Do not edit generated markdown or JSON endpoints; they are derived from YAML.

## Definition of done

- `content/portfolio.yaml` contains the requested content and passes Zod validation.
- `pnpm lint` has no errors.
- `pnpm typecheck` passes.
- `pnpm build` succeeds.
- `/` and `/portfolio` render successfully.
- `site.url` is an absolute production URL, and the portrait meets the size and
  aspect-ratio requirements.
- External links and image paths are checked when they were changed.
- Content-only tasks do not introduce unrelated component or styling changes.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
