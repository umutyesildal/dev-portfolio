# Security policy

## Supported versions

The latest commit on `main` is supported. Older commits and preview deployments
are not.

## Reporting a vulnerability

Please email **umut@yesildal.me** with:

- a short description of the issue,
- reproduction steps or a proof of concept,
- the affected URL, commit, or dependency,
- the impact you expect.

Do not open a public issue for a security report. I aim to acknowledge reports
within 72 hours and to ship a fix or mitigation as soon as practical.

## Scope

- The website, its route handlers, and generated machine-readable endpoints.
- The YAML content loader, Zod schema, and build pipeline.
- Dependency vulnerabilities in production packages.

## Out of scope

- Third-party platforms such as Vercel, GitHub, or DNS providers.
- Social engineering, spam, or physical attacks.
- Issues that require a compromised device or account.

## Safe harbour

I will not pursue legal action for good-faith research that stays within this
scope, avoids privacy violations, and does not degrade the service.
