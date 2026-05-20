import { cn } from "@/lib/utils";
import type { Severity } from "@/lib/types";

const STYLES: Record<Severity, string> = {
  minor: "border-status-green/40 text-status-green",
  major: "border-status-amber/40 text-status-amber",
  critical: "border-status-red/40 text-status-red",
};

const LABEL: Record<Severity, string> = {
  minor: "minor",
  major: "major",
  critical: "critical",
};

interface SeverityBadgeProps {
  severity: Severity;
  className?: string;
}

export function SeverityBadge({ severity, className }: SeverityBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border bg-transparent px-2 py-0.5 font-mono text-[12px] leading-none tracking-wide",
        STYLES[severity],
        className,
      )}
    >
      {LABEL[severity]}
    </span>
  );
}
