## Project context

Personal blog (l3co), built with Astro 7 and deployed statically to GitHub Pages. Content is in Portuguese (pt-BR). The repo is currently going through a visual theme migration (see `planning/` — `roadmap.md`, `decisions/`, `phases/` — for the full plan, decisions made, and phase-by-phase status). Consult and keep those docs current when continuing that kind of work.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

### Build & checks

- `npm run build` runs `astro check && astro build && pagefind --site dist` (plus copying the Pagefind index into `public/pagefind`) — it always typechecks first.
- Run `npm run format:check` (or `npm run format` to fix) and `npm run lint` before considering a change done.

## Workflow rules

- Never work directly on `main`. Create a topic branch first (this repo uses prefixes like `theme/`, `content/`, `chore/`) and open a PR with `gh pr create`.
- For non-trivial initiatives (theme migrations, structural changes), record and maintain the plan in `planning/` (roadmap, decisions, phases) rather than only in conversation.
- Preserve existing URLs (SEO) and the three features the user considers mandatory: Giscus comments, Pagefind search, and dark mode. Don't remove or break these without explicit approval.
- `.github/workflows/astro.yaml` is intentionally `workflow_dispatch`-only (manual deploy) while migration work is in progress. Do not change it to auto-deploy on `push: [main]` without explicit user approval — that's the user's call, not a technical one.
- When porting a visual theme from a reference project/repo, don't port its full codebase (content config, routing, component system). Port only its design tokens and component patterns (palette, typography, component classes) into the existing Tailwind v4 + CSS-variables setup, and leave content schema, routes, i18n, and utils untouched.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
