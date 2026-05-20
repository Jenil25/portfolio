"use client";

import dynamic from "next/dynamic";
import type { GraphData } from "@/lib/graph";

const KnowledgeGraphInner = dynamic(() => import("@/components/knowledge-graph-inner"), {
  ssr: false,
  loading: () => (
    <div className="bg-surface flex h-[640px] w-full items-center justify-center rounded-xl border border-border">
      <span className="text-muted-foreground font-mono text-[12px]">Loading...</span>
    </div>
  ),
});

interface KnowledgeGraphProps {
  data: GraphData;
  onProjectSelect: (slug: string) => void;
  selectedSlug: string | null;
}

export function KnowledgeGraph(props: KnowledgeGraphProps) {
  return <KnowledgeGraphInner {...props} />;
}
