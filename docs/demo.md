# 15-second demo

No voice. Cream background, ink text, mono captions, lime accent. 1280×720 or
1080×1350 for social. Hard cut at 15.0s.

| Time | Visual | Caption |
| --- | --- | --- |
| 0.0–2.0 | `sources/` folder; three file chips drop in: `cv.pdf`, `linkedin.pdf`, `github.json` | Your CV, LinkedIn, and GitHub |
| 2.0–5.0 | Terminal: `pnpm profile:github umutyesildal` → `sources/github.json` appears | One command for your public repos |
| 5.0–9.0 | Agent prompt: “Build my portfolio from sources/.” YAML lines appear: name, role, 6 projects | Your agent writes one YAML file |
| 9.0–12.0 | Terminal: `pnpm profile:check` → green `Profile OK` | Validated before it ships |
| 12.0–15.0 | Browser: the portfolio page fades in, scrolls one screen, ends on the email | A minimal personal site |

## Rules

- Maximum 15 seconds. Do not add an intro or outro card.
- No voiceover. Captions carry the story.
- Show the real commands, not a mock UI.
- End on the site, not on a logo.

## Recording

1. Start with a clean `sources/` folder.
2. Record the terminal and the browser at the same scale.
3. Cut every pause; the viewer only needs the command and the result.
4. Export as MP4 for Product Hunt and X; export a 12 fps GIF for the README if
   the file stays under 4 MB.
