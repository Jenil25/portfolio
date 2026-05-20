import type { Project, ProjectCategory } from "@/lib/types";

export type GraphNodeKind = "root" | "project" | "tech";

export interface GraphNode {
  id: string;
  label: string;
  kind: GraphNodeKind;
  category?: ProjectCategory;
  slug?: string;
  radius: number;
  // Positional fields injected by the force-graph runtime.
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number;
  fy?: number;
}

export interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

export const ROOT_ID = "jenil";

export function buildGraphData(projects: Project[]): GraphData {
  const nodes: GraphNode[] = [
    { id: ROOT_ID, label: "jenil", kind: "root", radius: 24 },
  ];
  const links: GraphLink[] = [];
  const techIds = new Set<string>();

  for (const project of projects) {
    const projectNodeId = `project:${project.slug}`;
    nodes.push({
      id: projectNodeId,
      label: project.name,
      kind: "project",
      category: project.category,
      slug: project.slug,
      radius: 14,
    });
    links.push({ source: ROOT_ID, target: projectNodeId });

    for (const tech of project.techStack) {
      const techId = `tech:${tech}`;
      if (!techIds.has(techId)) {
        techIds.add(techId);
        nodes.push({
          id: techId,
          label: tech,
          kind: "tech",
          radius: 8,
        });
      }
      links.push({ source: projectNodeId, target: techId });
    }
  }

  return { nodes, links };
}

export const CATEGORY_COLOR: Record<ProjectCategory, string> = {
  "ai-ml": "#22D3EE",
  backend: "#F59E0B",
  tools: "#10B981",
  web: "#A78BFA",
};
