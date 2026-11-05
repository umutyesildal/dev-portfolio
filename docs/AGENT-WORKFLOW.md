# Agent workflow

The agent writes `content/portfolio.yaml`. It does not edit components or the
site layout.

## What the agent needs

- `sources/cv.pdf` or `cv.docx` / `cv.txt`
- `sources/linkedin.pdf` or `linkedin.html`
- `sources/github.json` (generated with `pnpm profile:github <username>`)
- `sources/notes.md` for target roles and anything missing
- `AGENTS.md`, `src/data/schema.ts`, and `skills/portfolio-builder/SKILL.md`

## Install as a skill

If your agent supports skills.sh:

```bash
npx skills add umutyesildal/dev-portfolio
```

This installs `portfolio-builder`. The repository stays the source of truth.

## Prompts

**Claude Code, Codex, Cursor, OpenCode**

```text
Build my portfolio from sources/. Follow AGENTS.md and
skills/portfolio-builder/SKILL.md. Use only facts present in the sources,
and ask me for anything missing.
```

**Update one section**

```text
Update only my experience in content/portfolio.yaml from sources/cv.pdf.
Do not change projects, education, or styling.
```

**Add GitHub projects**

```text
Read sources/github.json. Pick the 5 strongest public repositories for a
[target role] role, add them to content/portfolio.yaml, and keep the
descriptions to one sentence. Run pnpm profile:check and pnpm build.
```

## What it does

1. Reads the sources and the schema.
2. Maps facts to `content/portfolio.yaml`.
3. Runs `pnpm profile:check`.
4. Runs `pnpm lint`, `pnpm typecheck`, and `pnpm build`.
5. Reports what it extracted and what is still missing.

## Rules

- Use only facts from the sources.
- Never invent dates, metrics, employers, links, technologies, or outcomes.
- LinkedIn blocks direct scraping. Use the official PDF export or a saved HTML
  copy.
- Do not commit anything from `sources/`; it is personal data and git-ignored.
- Keep project descriptions to one or two sentences.

## Troubleshooting

**LinkedIn**

Open your profile → **More** → **Save to PDF**. Move the file to
`sources/linkedin.pdf`. If you already saved the page as HTML, use
`sources/linkedin.html`.

**GitHub rate limit**

Unauthenticated requests are limited. Run:

```bash
GITHUB_TOKEN=ghp_... pnpm profile:github your-username
```

**The check fails**

`pnpm profile:check` prints the exact path and the placeholder it found. Fix the
YAML or ask the agent to replace that field with a verified value.

**No portrait**

Add a square image of at least 960×960 to `public/` and point `site.avatar` and
`socialPreview.avatar` at it.
