# Portfolio — Jenil Mahyavanshi

Personal site: projects, a failure log, and a career changelog. Next.js 15 (App Router,
React 19), Tailwind v4, fully statically generated. Live at
[jenilmahyavanshi.vercel.app](https://jenilmahyavanshi.vercel.app).

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
| `content/failures.ts`   | `/`, `/failures`, `/failures/[slug]` |
| `content/experience.ts` | `/`, `/experience`                   |
| `content/changelog.ts`  | the timeline on `/about`             |
| `content/about.ts`      | `/` (contact links), `/about`        |
| `content/skills.ts`     | `/about`                             |

Two contracts to know before editing:

- **Slugs are foreign keys.** `Project.slug` and `Failure.slug` each drive a static route
  and its share image through `generateStaticParams()`, so renaming one breaks the URL.
  Project slugs also key related-project ranking.
- **`Project.techStack` is a closed union** (`TechName` in `lib/types.ts`). Related-project
  ranking matches tech by exact string, so new tech must be added to the union first —
  that's what stops `"NextJS"` and `"Next.js"` from counting as two different tools.

## Updating the resume

Overwrite `public/resume.pdf`. That's the whole process — the resume links on `/` and `/about`
point at a fixed path, so the next build (or even the next request in dev) serves the new
file. The name a visitor's download is saved under is `RESUME_FILENAME` in `lib/site.ts`,
independent of what the file is called on disk.

## Design

Tokens live in `app/globals.css`: one warm hue for every neutral (OKLCH), one accent whose
only jobs are links, focus, selection and the active nav item, and five type sizes (`meta`,
`small`, `body`, `lead`, `display`). Pages are stacks of hairline-divided rows inside a 70rem
frame; most rows split into a label column and a content column (`components/page.tsx`).

Share images (`opengraph-image.tsx`) are rendered with Satori at build time, one per project
and failure, using the Inter TTFs checked into `lib/fonts` (SIL Open Font License, see
`lib/fonts/OFL.txt`).

## Deploying

`SITE_URL` in `lib/site.ts` feeds the sitemap, robots.txt, and the absolute `og:image` URL.
On Vercel it falls back to the project's production domain (`VERCEL_PROJECT_PRODUCTION_URL`):
the `*.vercel.app` URL until a custom domain is attached, then that domain, with no code
change. Set `NEXT_PUBLIC_SITE_URL` to override it, or when deploying anywhere other than
Vercel; otherwise those URLs point at localhost and social link previews break. The Vercel
fallback needs "Automatically expose System Environment Variables" turned on in the
project's environment-variable settings (it's on by default).

## License

The code is [MIT](LICENSE). The content is not: the writing in `content/` and
`public/resume.pdf` are © Jenil Mahyavanshi, all rights reserved.
