"use client";

import * as React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { TechPill } from "@/components/tech-pill";
import { StatusDot } from "@/components/status-dot";
import { getRelatedProjects } from "@/content/projects";
import type { Project } from "@/lib/types";

interface ProjectSidePanelProps {
  project: Project | null;
  onClose: () => void;
  onSelect: (slug: string) => void;
}

export function ProjectSidePanel({ project, onClose, onSelect }: ProjectSidePanelProps) {
  React.useEffect(() => {
    if (!project) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.aside
          key={project.slug}
          initial={{ x: 24, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 24, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="bg-surface absolute top-3 right-3 bottom-3 z-20 flex w-[min(360px,calc(100%-1.5rem))] flex-col overflow-hidden rounded-xl border border-border shadow-[0_0_0_1px_rgba(0,0,0,0.04)]"
          aria-label={`${project.name} preview`}
        >
          <header className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
            <div className="flex flex-col gap-1.5">
              <h3 className="text-foreground text-[18px] leading-tight font-medium">
                {project.name}
              </h3>
              <StatusDot status={project.status} />
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close panel"
              className="text-muted-foreground hover:border-accent-teal/50 hover:text-foreground inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-border transition-colors"
            >
              <X className="size-3.5" aria-hidden />
            </button>
          </header>

          <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-4">
            <p className="text-muted-foreground text-[14px] leading-[1.55]">{project.summary}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 8).map((tech) => (
                <TechPill key={tech} label={tech} />
              ))}
            </div>
            <Link
              href={`/projects/${project.slug}`}
              className="text-accent-teal hover:bg-accent-teal/10 inline-flex w-fit items-center rounded-md border border-accent-teal/40 px-3 py-1.5 text-[13px] transition-colors"
            >
              View detail →
            </Link>
            <RelatedProjects slug={project.slug} onSelect={onSelect} />
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function RelatedProjects({
  slug,
  onSelect,
}: {
  slug: string;
  onSelect: (slug: string) => void;
}) {
  const related = getRelatedProjects(slug, 4);
  if (related.length === 0) return null;
  return (
    <div className="flex flex-col gap-2 border-t border-border pt-4">
      <h4 className="text-muted-foreground font-mono text-[11px] tracking-wide">
        Related projects
      </h4>
      <ul className="flex flex-col gap-1">
        {related.map((p) => (
          <li key={p.slug}>
            <button
              type="button"
              onClick={() => onSelect(p.slug)}
              className="text-foreground hover:text-accent-teal block w-full truncate text-left text-[14px] transition-colors"
            >
              {p.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
