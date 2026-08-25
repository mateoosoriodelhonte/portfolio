# Contributing

This is a personal portfolio, so "contributions" usually means future-me making changes — but
the bar is the same as any project: issue → branch → implementation → tests → PR → green CI →
merge.

## Ground rules

1. **No claim without evidence.** Any new statement about a project, a number, or a status must
   link to something public that proves it. If it can't be verified, it doesn't ship — or ships
   labeled as unknown.
2. **The design system is documented — follow it.** Read `DESIGN_SYSTEM.md` before adding
   visual elements. New one-off styles are a smell; new tokens are a decision to record.
3. **Keep the client bundle honest.** New client-side JavaScript needs a reason a static page
   can't satisfy. There is currently no client framework; keep it that way unless something
   genuinely needs one.
4. **Accessibility is tested, not asserted.** Anything interactive needs keyboard support and
   labels, and must pass the axe suite. Motion needs a reduced-motion story, ideally
   structural (`no-preference`-gated) rather than an override.

## Workflow

```bash
npm install
npm run dev                       # http://localhost:4321/portfolio

# before pushing
npm run format
npm run check
npm run build
npm run test:e2e
```

CI runs the same four steps on every PR; deploys happen from `main` only.

## Adding a blog post

1. Create `src/content/blog/<slug>.mdx` with the frontmatter documented in the README.
2. Keep `draft: true` until it's genuinely finished — drafts render in dev only.
3. Write internal links root-relative (`/work/reposignal/`).
4. Add a card entry to `scripts/og.mjs` and run it, or accept the default card.

## Updating project facts

Project data lives in `src/lib/projects.ts` and `src/lib/site.ts` only. If a fact changed
upstream (test counts, versions, store metadata), update it there with the source in the commit
message. If the sandplover PR changes state, update the fallback in `src/lib/github.ts` —
builds verify it live, but the fallback should stay truthful too.
