import type { MetadataRoute } from "next";
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
  ];
  return paths.map((path) => ({ url: `${SITE_URL}${path}`, lastModified }));
}
