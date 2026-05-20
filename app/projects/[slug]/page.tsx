import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/brand-icons";
import { Markdown } from "@/components/markdown";
import { StatusDot } from "@/components/status-dot";
import { TechPill } from "@/components/tech-pill";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  const related = getRelatedProjects(project.slug, 5);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10 flex flex-col gap-2">
        <Link
          href="/projects"
          className="text-muted-foreground hover:text-accent-teal text-[13px]"
        >
          ← All projects
        </Link>
      </div>

      <header className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex max-w-3xl flex-col gap-4">
          <h1 className="text-h1 text-foreground">{project.name}</h1>
          <p className="text-muted-foreground text-[18px] leading-[1.5]">{project.summary}</p>
          <div className="flex flex-wrap items-center gap-3">
            <StatusDot status={project.status} />
            <span className="text-muted-foreground font-mono text-[13px]">{project.date}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <TechPill key={tech} label={tech} />
            ))}
          </div>
        </div>
        <div className="flex flex-shrink-0 flex-wrap gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:border-accent-teal/50 inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-[13px] transition-colors"
            >
              <GitHubIcon className="size-3.5" />
              GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground bg-accent-teal hover:bg-accent-teal/90 inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-[13px] transition-colors"
            >
              <ExternalLink className="size-3.5" aria-hidden />
              Live demo
            </a>
          )}
        </div>
      </header>

      <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-[1fr_280px]">
        <Tabs defaultValue="overview" className="min-w-0">
          <TabsList variant="line" className="w-full justify-start gap-4 border-b border-border">
            <TabsTrigger
              value="overview"
              className="data-active:after:bg-accent-teal data-active:text-foreground"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="architecture"
              className="data-active:after:bg-accent-teal data-active:text-foreground"
            >
              Architecture
            </TabsTrigger>
            <TabsTrigger
              value="story"
              className="data-active:after:bg-accent-teal data-active:text-foreground"
            >
              Story
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="pt-8">
            {project.metrics && project.metrics.length > 0 && (
              <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-3">
                {project.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="bg-surface flex flex-col gap-1 rounded-lg border border-border p-4"
                  >
                    <span className="text-muted-foreground font-mono text-[12px]">
                      {metric.label}
                    </span>
                    <span className="text-foreground text-[20px] font-medium">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <p className="text-foreground text-[16px] leading-[1.7]">{project.description}</p>
          </TabsContent>

          <TabsContent value="architecture" className="pt-8">
            {project.architecture ? (
              <Markdown>{project.architecture}</Markdown>
            ) : (
              <Placeholder label="Architecture writeup is forthcoming." />
            )}
          </TabsContent>

          <TabsContent value="story" className="pt-8">
            {project.story ? (
              <Markdown>{project.story}</Markdown>
            ) : (
              <Placeholder label="Story is forthcoming." />
            )}
          </TabsContent>
        </Tabs>

        <aside className="hidden md:block">
          <div className="sticky top-20 flex flex-col gap-6">
            {related.length > 0 && (
              <div className="flex flex-col gap-3">
                <h2 className="text-muted-foreground font-mono text-[11px] tracking-wide">
                  Related projects
                </h2>
                <ul className="flex flex-col gap-2">
                  {related.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/projects/${p.slug}`}
                        className="text-foreground hover:text-accent-teal block text-[14px] transition-colors"
                      >
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <div className="bg-surface text-muted-foreground rounded-xl border border-dashed border-border px-6 py-12 text-center text-[14px]">
      {label}
    </div>
  );
}
