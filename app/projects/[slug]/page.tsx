import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ListRow } from "@/components/list-row";
import { Markdown } from "@/components/markdown";
import { enterAt, Page, Section } from "@/components/page";
import { getProjectBySlug, getRelatedProjects, projects } from "@/content/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Not found" };
  return {
    title: project.name,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = getRelatedProjects(project.slug, 3);

  // One scrolling page instead of tabs: a skimmer never clicks a tab, so the architecture
  // went unread. A section exists only once its field is written.
  const sections = [
    { id: "overview", title: "Overview", body: <p>{project.description}</p> },
    ...(project.architecture
      ? [
          {
            id: "architecture",
            title: "Architecture",
            body: <Markdown>{project.architecture}</Markdown>,
          },
        ]
      : []),
    ...(project.story
      ? [{ id: "story", title: "Story", body: <Markdown>{project.story}</Markdown> }]
      : []),
  ];

  const links = [
    project.github && { label: "Source", href: project.github },
    project.demo && { label: "Live", href: project.demo },
  ].filter((l): l is { label: string; href: string } => Boolean(l));

  return (
    <Page>
      {sections.length > 1 && (
        <nav
          aria-label="On this page"
          className="absolute top-0 left-full hidden h-full w-40 pt-20 pl-4 xl:block"
        >
          <ul className="text-small sticky top-20 flex flex-col gap-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-subtle hover:text-foreground transition-colors"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <header className="enter">
        <Link
          href="/projects"
          className="text-small text-subtle hover:text-foreground transition-colors"
        >
          ← Projects
        </Link>
        <h1 className="text-display mt-6">{project.name}</h1>
        <p className="text-lead text-muted mt-4">{project.summary}</p>
        <dl className="text-small mt-8 grid grid-cols-[5rem_1fr] gap-x-4 gap-y-2">
          <dt className="text-subtle">When</dt>
          <dd className="font-mono">{project.date}</dd>
          <dt className="text-subtle">Stack</dt>
          <dd className="text-muted">{project.techStack.join(", ")}</dd>
          {links.length > 0 && (
            <>
              <dt className="text-subtle">Links</dt>
              <dd className="flex flex-wrap gap-x-4">
                {links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    {l.label} ↗
                  </a>
                ))}
              </dd>
            </>
          )}
        </dl>
      </header>

      {project.metrics && project.metrics.length > 0 && (
        <dl
          className="enter mt-12 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3"
          style={enterAt(1)}
        >
          {project.metrics.map((m) => (
            // dt must come first in the markup; flex-col-reverse puts the number on top, and
            // justify-end keeps it top-aligned when a neighbouring label wraps.
            <div key={m.label} className="flex flex-col-reverse justify-end gap-1">
              <dt className="text-small text-subtle">{m.label}</dt>
              <dd className="text-lead font-mono">{m.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {sections.map((s, i) => (
        <section
          key={s.id}
          aria-labelledby={s.id}
          className="enter mt-16"
          style={enterAt(Math.min(i + 1, 3))}
        >
          <h2 id={s.id} className="text-lead mb-4 font-semibold">
            {s.title}
          </h2>
          {s.body}
        </section>
      ))}

      {related.length > 0 && (
        <Section title="Related" i={3}>
          <ul>
            {related.map((p) => (
              <ListRow
                key={p.slug}
                href={`/projects/${p.slug}`}
                title={p.name}
                description={p.summary}
              />
            ))}
          </ul>
        </Section>
      )}
    </Page>
  );
}
