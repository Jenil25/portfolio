"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { FailureCard } from "@/components/failure-card";
import type { Failure, FailureCategory } from "@/lib/types";

type Filter = "all" | FailureCategory;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "bug", label: "Bugs" },
  { id: "decision", label: "Decisions" },
  { id: "architecture", label: "Architecture" },
];

interface FailuresViewProps {
  failures: Failure[];
}

export function FailuresView({ failures }: FailuresViewProps) {
  const [filter, setFilter] = React.useState<Filter>("all");

  const filtered = React.useMemo(
    () => (filter === "all" ? failures : failures.filter((f) => f.category === filter)),
    [filter, failures],
  );

  return (
    <div className="flex flex-col gap-6">
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

      {filtered.length === 0 ? (
        <div className="bg-surface text-muted-foreground rounded-xl border border-border px-6 py-12 text-center text-[14px]">
          No failures match this filter.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((failure) => (
            <FailureCard key={failure.slug} failure={failure} />
          ))}
        </div>
      )}
    </div>
  );
}
