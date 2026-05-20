"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { Project, ProjectCategory } from "@/lib/types";
import { buildGraphData } from "@/lib/graph";
import { KnowledgeGraph } from "@/components/knowledge-graph";
import { ProjectList } from "@/components/project-list";
import { ProjectSidePanel } from "@/components/project-side-panel";

type Filter = "all" | ProjectCategory;
type View = "graph" | "list";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ai-ml", label: "AI / ML" },
  { id: "backend", label: "Backend" },
  { id: "tools", label: "Tools" },
  { id: "web", label: "Web" },
];

interface ProjectsViewProps {
  projects: Project[];
}

export function ProjectsView({ projects }: ProjectsViewProps) {
  const [filter, setFilter] = React.useState<Filter>("all");
  const [view, setView] = React.useState<View>("graph");
  const [selectedSlug, setSelectedSlug] = React.useState<string | null>(null);

  const filtered = React.useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter, projects],
  );

  const graphData = React.useMemo(() => buildGraphData(filtered), [filtered]);
  const selectedProject =
    selectedSlug ? (filtered.find((p) => p.slug === selectedSlug) ?? null) : null;

  React.useEffect(() => {
    if (selectedSlug && !filtered.some((p) => p.slug === selectedSlug)) {
      setSelectedSlug(null);
    }
  }, [filtered, selectedSlug]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="tablist" aria-label="Filter by category" className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "rounded-md border px-3 py-1.5 text-[13px] transition-colors",
                  active
                    ? "border-accent-teal text-foreground"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {f.label}
              </button>
            );
          })}
        </div>
        <div
          role="tablist"
          aria-label="View mode"
          className="flex items-center gap-0 self-start rounded-md border border-border p-0.5"
        >
          {(["graph", "list"] as View[]).map((mode) => {
            const active = view === mode;
            return (
              <button
                key={mode}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setView(mode)}
                className={cn(
                  "rounded-[5px] px-3 py-1 text-[13px] transition-colors",
                  active
                    ? "bg-elevated text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {mode === "graph" ? "Graph" : "List"}
              </button>
            );
          })}
        </div>
      </div>

      {view === "graph" ? (
        <div className="relative">
          <KnowledgeGraph
            data={graphData}
            selectedSlug={selectedSlug}
            onProjectSelect={(slug) => setSelectedSlug(slug)}
          />
          <ProjectSidePanel
            project={selectedProject}
            onClose={() => setSelectedSlug(null)}
            onSelect={(slug) => setSelectedSlug(slug)}
          />
        </div>
      ) : (
        <ProjectList projects={filtered} />
      )}
    </div>
  );
}
