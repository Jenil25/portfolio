import { getProjectBySlug, projects } from "@/content/projects";
import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Project case study by Jenil Mahyavanshi";
export const size = OG_SIZE;
export const contentType = "image/png";

// Prerender one card per entry at build time instead of fetching fonts on every request.
export function generateStaticParams() {
  return projects.map((x) => ({ slug: x.slug }));
}

export default async function ProjectOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return ogImage({
    title: project?.name ?? "Projects",
    subtitle: project?.summary,
    label: "Project",
  });
}
