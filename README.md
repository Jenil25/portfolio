# Portfolio — Jenil Mahyavanshi

Personal site: projects, a failure log, and a career changelog. Next.js 15 (App Router,
React 19), Tailwind v4, fully statically generated.

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm typecheck  # no test suite — this is the safety net
pnpm build
```

## Editing content

There is no CMS, database, or Markdown loader. Every piece of content is a typed constant
in `content/*.ts`, validated against `lib/types.ts` at compile time:

| File                    | Renders on                           |
| ----------------------- | ------------------------------------ |
| `content/projects.ts`   | `/`, `/projects`, `/projects/[slug]` |
| `content/failures.ts`   | `/failures`                          |
| `content/changelog.ts`  | career timeline on `/` and `/about`  |
| `content/about.ts`      | `/about`, footer contact links       |
| `content/skills.ts`     | `/about`                             |
| `content/experience.ts` | `/experience`                        |

Two contracts to know before editing:

- **`Project.slug` is a foreign key.** It drives `generateStaticParams()`, related-project
  ranking, and graph node ids. Renaming one breaks the URL and the graph.
- **`Project.techStack` is a closed union** (`TechName` in `lib/types.ts`). The knowledge
  graph dedupes tech nodes by exact string match, so new tech must be added to the union
  first — that's what stops `"NextJS"` and `"Next.js"` from becoming two nodes.

## Updating the resume

Overwrite `public/resume.pdf`. That's the whole process — the `/about` download button
points at a fixed path, so the next build (or even the next request in dev) serves the new
file. The download name shown to the visitor is set by the `download` attribute on the
link in `app/about/page.tsx`, independent of what the file is called on disk.

## Before launch

`SITE_URL` in `lib/site.ts` falls back to `http://localhost:3000`. Set
`NEXT_PUBLIC_SITE_URL` in the deploy environment once a domain exists, or the sitemap,
robots.txt, and the absolute `og:image` URL will all point at localhost and social link
previews will break.

See [CLAUDE.md](CLAUDE.md) for the full architecture notes.
