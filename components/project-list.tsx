import Link from "next/link";
import type { Project } from "@/lib/types";
import { TechPill } from "@/components/tech-pill";
import { StatusDot } from "@/components/status-dot";

const CATEGORY_LABEL: Record<Project["category"], string> = {
  "ai-ml": "AI / ML",
  backend: "Backend",
  tools: "Tools",
};

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="bg-surface text-muted-foreground border-border rounded-xl border px-6 py-12 text-center text-[14px]">
        No projects match this filter.
      </div>
    );
  }

  return (
    <div className="bg-surface border-border overflow-hidden rounded-xl border">
      <ul className="divide-border divide-y">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              className="hover:bg-elevated/50 group grid grid-cols-1 items-center gap-3 px-5 py-4 transition-colors md:grid-cols-[2fr_1fr_1fr_2fr_1fr]"
            >
              <div className="flex flex-col gap-1">
                <span className="text-foreground group-hover:text-accent-teal text-[15px] transition-colors">
                  {project.name}
                </span>
                <span className="text-muted-foreground line-clamp-1 text-[13px] md:hidden">
                  {project.summary}
                </span>
              </div>
              <span className="text-muted-foreground hidden font-mono text-[12px] md:inline">
                {CATEGORY_LABEL[project.category]}
              </span>
              <span className="hidden md:inline">
                <StatusDot status={project.status} />
              </span>
              <div className="hidden flex-wrap gap-1 md:flex">
                {project.techStack.slice(0, 3).map((tech) => (
                  <TechPill key={tech} label={tech} />
                ))}
              </div>
              <span className="text-muted-foreground hidden font-mono text-[12px] md:inline">
                {project.date}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
