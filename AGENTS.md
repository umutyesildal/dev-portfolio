# Portfolio agent guide

This repository is a content-driven personal portfolio template. The usual task is
to customize the site from a CV, resume, LinkedIn export, or a short personal brief.

## Source of truth

- All user-editable portfolio content lives in `content/portfolio.yaml`.
- Content shape and required fields are defined in `src/data/schema.ts`.
- Images and downloadable files belong in `public/`; reference them from YAML with
  root-relative paths such as `/portrait.jpg`.
- `examples/umut-portfolio.yaml` is a reference implementation, not active site
  content. Do not edit or copy its personal claims into another person's portfolio.
- React components under `src/` are the presentation layer. Do not edit them for a
  content-only customization unless the requested layout cannot be represented by
  the existing schema.

## CV-to-portfolio workflow

1. Read the supplied CV or resume completely.
2. Read `content/portfolio.yaml` and `src/data/schema.ts` before editing.
3. Replace the example identity, summary, contact details, experience, education,
   skills, and projects with evidence from the supplied material.
4. Prioritize recent, technically substantial work. Move older work to
   `earlierProjects` when it is still useful but should not dominate the page.
5. Preserve measurable results exactly. Do not invent dates, metrics, employers,
   links, technologies, awards, or project outcomes.
6. Leave an optional URL or asset field empty when no verified value is available.
7. Keep descriptions concise and recruiter-readable. Project descriptions may use
   simple Markdown such as `**bold text**`.
8. Add new icon names only through `src/components/content-icon.tsx`; YAML must
   contain icon names, never JSX.

## Content rules

- Keep all visible personal copy in YAML.
- Use plain strings for dates so ranges and labels retain their intended formatting.
- Use unique names for work entries and projects.
- Keep social names referenced by `featuredSocials`, `headerSocials`, and `socials`
  synchronized with `contact.socials[].name`.
- Keep project links public and safe to expose.
- Do not place secrets, private repository URLs, API keys, phone numbers, or private
  addresses in the template unless the user explicitly requests publication.
- Treat the checked-in identity, copy, and portrait as demo content. Replace them;
  do not present the demo person's identity as the new portfolio owner's.
- When introducing a new icon name, update both `src/data/schema.ts` and
  `src/components/content-icon.tsx`.

## Commands

```bash
pnpm install
pnpm dev
pnpm lint
pnpm build
```

## Definition of done

- `content/portfolio.yaml` contains the requested content and passes Zod validation.
- `pnpm lint` has no errors.
- `pnpm build` succeeds.
- `/` and `/portfolio` render successfully.
- External links and image paths are checked when they were changed.
- Content-only tasks do not introduce unrelated component or styling changes.
