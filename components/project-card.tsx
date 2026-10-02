import Link from "next/link";
import type { Project } from "@/lib/types";
import { TechPill } from "@/components/tech-pill";
import { StatusDot } from "@/components/status-dot";

interface ProjectCardProps {
  project: Project;
  techLimit?: number;
}

export function ProjectCard({ project, techLimit = 4 }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group hover:border-accent-teal/60 hover:bg-elevated/40 border-border bg-surface block rounded-xl border p-5 transition-all duration-200 ease-out hover:-translate-y-0.5"
    >
      <div className="flex flex-col gap-3">
        <h3 className="text-h3 group-hover:text-accent-teal text-foreground transition-colors">
          {project.name}
        </h3>
        <p className="text-muted-foreground line-clamp-2 text-[14px] leading-[1.55]">
          {project.summary}
        </p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.techStack.slice(0, techLimit).map((tech) => (
            <TechPill key={tech} label={tech} />
          ))}
        </div>
        <div className="border-border border-t pt-3">
          <StatusDot status={project.status} />
        </div>
      </div>
    </Link>
  );
}
