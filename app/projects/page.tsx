import type { Metadata } from "next";
import { ProjectsView } from "@/components/projects-view";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "A knowledge graph of projects and the tech behind them.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-h2 text-foreground">Projects</h1>
        <p className="text-muted-foreground text-[15px]">
          A knowledge graph of what I&apos;ve built and the tech behind it. Click a project to
          preview; open a project for the full story.
        </p>
      </header>
      <ProjectsView projects={projects} />
    </div>
  );
}
