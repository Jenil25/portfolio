import type { MetadataRoute } from "next";
import { failures } from "@/content/failures";
import { projects } from "@/content/projects";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const paths = [
    "",
    "/projects",
    "/experience",
    "/failures",
    "/about",
    ...projects.map((p) => `/projects/${p.slug}`),
    ...failures.map((f) => `/failures/${f.slug}`),
  ];
  return paths.map((path) => ({ url: `${SITE_URL}${path}`, lastModified }));
}
