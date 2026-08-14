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

/**
 * A tech node earns a place in the graph only if this many projects use it. Tech used
 * once adds a leaf that can never show a relationship, which is most of the node count
 * and all of the clutter. Above the threshold, an edge means "this recurs in my work".
 */
const MIN_TECH_PROJECTS = 2;

/**
 * @param projects  Projects to draw.
 * @param countAgainst  Set the recurrence threshold is measured over. Callers that draw a
 *   filtered subset should pass the full list, or narrowing to one category would leave
 *   every tech at a single use and strip the graph bare.
 */
export function buildGraphData(projects: Project[], countAgainst: Project[] = projects): GraphData {
  const projectsPerTech = new Map<string, number>();
  for (const project of countAgainst) {
    for (const tech of project.techStack) {
      projectsPerTech.set(tech, (projectsPerTech.get(tech) ?? 0) + 1);
    }
  }

  const nodes: GraphNode[] = [{ id: ROOT_ID, label: "jenil", kind: "root", radius: 24 }];
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
      if ((projectsPerTech.get(tech) ?? 0) < MIN_TECH_PROJECTS) continue;

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
};
