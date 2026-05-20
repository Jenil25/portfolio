"use client";

import { cn } from "@/lib/utils";

interface RolePillProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
}

export function RolePill({ label, selected, onSelect }: RolePillProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "rounded-md border px-3 py-1.5 text-sm transition-all",
        selected
          ? "border-accent-teal text-foreground"
          : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}
