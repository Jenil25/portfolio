/**
 * Canonical origin. Single source for `metadataBase`, the sitemap, and robots.txt.
 *
 * No domain is registered yet, so on Vercel this falls back to the project's production
 * domain: `VERCEL_PROJECT_PRODUCTION_URL` is the `*.vercel.app` URL until a custom domain
 * is added, then that domain, with no code change. It has no scheme, hence the prefix.
 * `NEXT_PUBLIC_SITE_URL` overrides both; off Vercel with neither set, it's localhost.
 */
const vercelProductionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercelProductionHost ? `https://${vercelProductionHost}` : "http://localhost:3000");

export const REPO_URL = "https://github.com/Jenil25/portfolio";

/**
 * The resume is a plain static asset. To publish a new version, overwrite
 * `public/resume.pdf` — the URL is stable, so nothing else needs to change and the
 * site serves the new file on the next build.
 */
export const RESUME_PATH = "/resume.pdf";

/** Filename a visitor gets on download. The stable path above would otherwise save as "resume.pdf". */
export const RESUME_FILENAME = "Jenil_Mahyavanshi_Resume.pdf";
