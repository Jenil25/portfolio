"use client";

import * as React from "react";
import ForceGraph2D from "react-force-graph-2d";
import type { ForceGraphMethods } from "react-force-graph-2d";
import { useTheme } from "next-themes";
import { CATEGORY_COLOR, type GraphData, type GraphLink, type GraphNode } from "@/lib/graph";

interface KnowledgeGraphInnerProps {
  data: GraphData;
  onProjectSelect: (slug: string) => void;
  selectedSlug: string | null;
}

export default function KnowledgeGraphInner({
  data,
  onProjectSelect,
  selectedSlug,
}: KnowledgeGraphInnerProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  const wrapRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState<{ w: number; h: number }>({ w: 800, h: 560 });

  React.useEffect(() => {
    if (!wrapRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const w = Math.max(320, Math.floor(entry.contentRect.width));
      const h = Math.max(420, Math.floor(entry.contentRect.height));
      setSize({ w, h });
    });
    observer.observe(wrapRef.current);
    return () => observer.disconnect();
  }, []);

  const fgRef = React.useRef<ForceGraphMethods<GraphNode, GraphLink> | undefined>(undefined);

  React.useEffect(() => {
    const fg = fgRef.current;
    if (!fg) return;
    // Increase repulsion to spread nodes and reduce label overlap
    fg.d3Force("charge")?.strength(-350);
    fg.d3Force("link")?.distance(70);
    fg.d3ReheatSimulation();
  }, [data]);

  const labelColor = isDark ? "rgba(244,244,240,0.92)" : "rgba(28,28,26,0.92)";
  const techFill = isDark ? "rgba(156,163,175,0.55)" : "rgba(107,114,128,0.55)";
  const linkRoot = isDark ? "rgba(34,211,238,0.42)" : "rgba(34,211,238,0.55)";
  const linkTech = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";

  return (
    <div
      ref={wrapRef}
      className="bg-surface relative h-[640px] w-full overflow-hidden rounded-xl border border-border"
      role="application"
      aria-label="Knowledge graph of projects and tech stacks"
    >
      <ForceGraph2D<GraphNode, GraphLink>
        ref={fgRef}
        graphData={data}
        width={size.w}
        height={size.h}
        backgroundColor="rgba(0,0,0,0)"
        nodeId="id"
        nodeLabel={(node) => node.label}
        nodeRelSize={1}
        nodeVal={(node) => node.radius}
        cooldownTicks={200}
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.3}
        linkColor={(link) => {
          const target = link.target;
          if (typeof target === "object" && target?.kind === "tech") return linkTech;
          return linkRoot;
        }}
        linkWidth={() => 0.8}
        enableNodeDrag
        enableZoomInteraction
        enablePanInteraction
        onNodeClick={(node) => {
          if (node.kind === "project" && node.slug) {
            onProjectSelect(node.slug);
          }
        }}
        nodeCanvasObject={(node, ctx, globalScale) => {
          if (node.x == null || node.y == null) return;
          const isSelected = node.kind === "project" && node.slug === selectedSlug;
          const fill =
            node.kind === "root"
              ? "#22D3EE"
              : node.kind === "project"
                ? node.category
                  ? CATEGORY_COLOR[node.category]
                  : "#9CA3AF"
                : techFill;

          if (isSelected) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius + 5, 0, 2 * Math.PI);
            ctx.strokeStyle = "#22D3EE";
            ctx.lineWidth = 1.2 / globalScale;
            ctx.stroke();
          }
          if (node.kind === "root") {
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius + 4, 0, 2 * Math.PI);
            ctx.strokeStyle = "rgba(34,211,238,0.35)";
            ctx.lineWidth = 1 / globalScale;
            ctx.stroke();
          }

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
          ctx.fillStyle = fill;
          ctx.fill();

          if (node.kind === "root" || node.kind === "project") {
            const fontSize = Math.max(10, 12 / Math.max(globalScale, 0.5));
            ctx.font = `500 ${fontSize}px ui-sans-serif, system-ui, sans-serif`;
            const maxLen = 28;
            const text = node.label.length > maxLen
              ? node.label.slice(0, maxLen - 1) + "…"
              : node.label;
            const textWidth = ctx.measureText(text).width;
            const padding = 4;
            const bgX = node.x - textWidth / 2 - padding;
            const bgY = node.y + node.radius + 3;
            const bgW = textWidth + padding * 2;
            const bgH = fontSize + 4;
            ctx.fillStyle = isDark ? "rgba(10,10,11,0.75)" : "rgba(250,250,248,0.75)";
            ctx.fillRect(bgX, bgY, bgW, bgH);
            ctx.fillStyle = labelColor;
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.fillText(text, node.x, node.y + node.radius + 5);
          }
        }}
        nodePointerAreaPaint={(node, color, ctx) => {
          if (node.x == null || node.y == null) return;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 4, 0, 2 * Math.PI);
          ctx.fill();
        }}
      />
      <div
        aria-hidden
        className="text-muted-foreground pointer-events-none absolute right-3 bottom-3 font-mono text-[11px]"
      >
        scroll = zoom · drag = pan · click project
      </div>
    </div>
  );
}
