# Skills

## portfolio-builder

Turns a CV, LinkedIn export, GitHub data, and notes into
`content/portfolio.yaml`.

Use it when a user says:

- "Build my portfolio from my CV."
- "Update my portfolio from my LinkedIn."
- "Add my GitHub projects to my site."
- "Fill content/portfolio.yaml."

The skill assumes the workflow in `sources/README.md` and the rules in
`AGENTS.md`. It never invents facts and always finishes with
`pnpm profile:check`, `pnpm lint`, `pnpm typecheck`, and `pnpm build`.

### Install

Copy `skills/portfolio-builder/` into your agent's skills directory, or keep the
repository open and point the agent at `SKILL.md`. The canonical instructions
remain `AGENTS.md`.
