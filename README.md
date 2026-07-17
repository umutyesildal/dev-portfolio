# Agent-ready YAML Portfolio

A minimal Next.js portfolio template that keeps personal content separate from
React components. Create a repository from the template, edit one YAML file,
replace the portrait, and deploy it as your own site.

**Live demo:** [dev-portfolio-delta-drab.vercel.app](https://dev-portfolio-delta-drab.vercel.app)

- `/` is a focused landing page with an introduction and social links.
- `/portfolio` contains experience, education, projects, skills, and contact details.
- `content/portfolio.yaml` is the single source of truth for visible portfolio content.
- `AGENTS.md` tells coding agents how to turn a CV into a safe, verified portfolio.

## Quick start

Requirements: Node.js 22.13 or newer and pnpm 11.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize manually

1. Edit `content/portfolio.yaml`.
2. Replace `public/portrait-placeholder.svg` with your portrait, or add a new image
   under `public/` and update `site.avatar` to its root-relative path.
3. Add or remove experience, projects, skills, and social links in YAML.
4. Run the validation build:

```bash
pnpm lint
pnpm build
```

The site reads and validates the YAML on the server. Invalid or missing fields stop
the build with a path-specific error, for example `projects.0.title`.

## Customize with an AI coding agent

Attach your CV or resume to an AI coding agent that can work in the repository and
use a prompt like this:

```text
Customize this portfolio from my attached CV. Follow AGENTS.md, put all personal
content in content/portfolio.yaml, copy any approved images into public/, do not
invent facts or links, and finish by running pnpm lint and pnpm build.
```

`AGENTS.md` is an open-format repository instruction file for coding agents. It
contains the content mapping rules, safety boundaries, commands, and definition of
done for this template. See [agents.md](https://agents.md/) for the broader format.

Vendor-specific files such as `CLAUDE.md`, `.github/copilot-instructions.md`, or
Cursor rules can be added later if a team needs them, but keeping the canonical
instructions in one `AGENTS.md` avoids duplicated guidance drifting out of sync.

## YAML structure

The main sections are:

```yaml
site: {}
navigation: []
home: {}
notFound: {}
portfolio: {}
contact: {}
skills: []
work: []
education: []
projects: []
earlierProjects: []
hackathons: []
```

Project descriptions support simple Markdown. Icons are written as names such as
`github`, `email`, `react`, or `python`; the React components resolve those names
through `src/components/content-icon.tsx`.

The active YAML and portrait are intentionally generic placeholders. A complete
real-world content example is available in `examples/umut-portfolio.yaml`, with its
matching portrait under `public/examples/`. Preview it without replacing the
default template content:

```bash
PORTFOLIO_CONTENT_FILE=examples/umut-portfolio.yaml pnpm dev
```

## Project structure

```text
content/portfolio.yaml          Personal content
examples/                       Complete example portfolio content
public/                         Images and downloadable assets
src/data/schema.ts              Zod content schema
src/data/portfolio.ts           YAML loader and validation
src/components/content-icon.tsx Icon-name registry
src/app/                        Next.js pages
AGENTS.md                       Instructions for coding agents
```

## Production

```bash
pnpm build
pnpm start
```

The build uses `next build --webpack`, the verified stable build path for this
template.

## Publish as a GitHub template

1. Replace the placeholder identity, links, and portrait with your own content.
2. Run `pnpm install --frozen-lockfile`, `pnpm lint`, and `pnpm build`.
3. Push the repository to GitHub.
4. In the repository settings, enable **Template repository**.
5. Add a concise description, topics, a social preview, and a deployment link.

The included GitHub Actions workflow repeats install, lint, and build checks on
pull requests and pushes. Dependabot checks npm dependencies weekly.

## Deploy multiple profiles

The same repository can power multiple deployments. By default, the application
uses `content/portfolio.yaml`. Set `PORTFOLIO_CONTENT_FILE` to another repository-
relative YAML path to build a different profile.

For example, create two Vercel projects from the same GitHub repository:

- Template demo: leave `PORTFOLIO_CONTENT_FILE` unset.
- Personal site: set `PORTFOLIO_CONTENT_FILE=examples/umut-portfolio.yaml` for
  Production, Preview, and Development.

Each project can use its own domain while sharing the components, dependencies,
CI workflow, and future code updates.

## Stack

- Next.js 16 and React 19
- TypeScript
- Tailwind CSS 4
- Zod validation
- YAML content
- shadcn/ui primitives

## Credits and license

This project uses [Magic UI](https://magicui.design/), created by Dillion Verma,
and is distributed under the MIT License.
