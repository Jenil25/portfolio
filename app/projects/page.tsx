import type { Metadata } from "next";
import { ProjectsView } from "@/components/projects-view";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "What I've built and the tech behind it.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-8 flex flex-col gap-2">
        <h1 className="text-h2 text-foreground">Projects</h1>
        <p className="text-muted-foreground text-[15px]">
          What I&apos;ve built and the tech behind it. Switch to the graph to see which tools recur
          across projects.
        </p>
      </header>
      <ProjectsView projects={projects} />
    </div>
  );
}
