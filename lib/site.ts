/**
 * Canonical origin. Single source for `metadataBase`, the sitemap, and robots.txt.
 *
 * No domain is registered yet. Set `NEXT_PUBLIC_SITE_URL` in the deploy environment
 * before launch — otherwise the sitemap, robots.txt, and the absolute `og:image` URL
 * all point at localhost and social link previews break.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/**
 * The resume is a plain static asset. To publish a new version, overwrite
 * `public/resume.pdf` — the URL is stable, so nothing else needs to change and the
 * site serves the new file on the next build.
 */
export const RESUME_PATH = "/resume.pdf";

/** Filename a visitor gets on download. The stable path above would otherwise save as "resume.pdf". */
export const RESUME_FILENAME = "Jenil_Mahyavanshi_Resume.pdf";
