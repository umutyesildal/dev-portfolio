# Content

`portfolio.yaml` is the single source of truth for the site. The React layer only
reads it; every visible string, date, link, and project comes from this file.

An alternate profile can be selected at build time with
`PORTFOLIO_CONTENT_FILE=examples/umut-portfolio.yaml`.

## Edit workflow

1. Read `AGENTS.md` and `src/data/schema.ts`.
2. Edit `content/portfolio.yaml`.
3. Put images under `public/` and reference them as `/file.ext`.
4. Run `pnpm content:check`.
5. Run `pnpm lint`, `pnpm typecheck`, and `pnpm build`.

## Machine-readable outputs

These are generated from the YAML at build time. Do not edit them by hand.

- `/llms.txt` and `/llms-full.txt`
- `/index.md` and `/portfolio.md`
- `/api/portfolio.json` and `/api/schema.json`
- `/agents.json`

## Rules

- Do not invent dates, metrics, employers, links, or technologies.
- Keep every project and repository link public and safe to expose.
- Add images under `public/`; the checker fails on missing assets.
- Keep `home.featuredSocials` and `portfolio.headerSocials` names in sync with
  `contact.socials[].name`.
- Set `site.repository` to the public repository so `/agents.json` can link to
  the source YAML and `AGENTS.md`.
- Treat `examples/umut-portfolio.yaml` and `public/examples/` as personal content,
  not as template data.

## Add a field

1. Add it to `src/data/schema.ts`.
2. Add it to both `content/portfolio.yaml` and `examples/umut-portfolio.yaml`.
3. Render it in the relevant component.
4. Document it in `README.md` and `AGENTS.md`.
5. Run the full check suite.
