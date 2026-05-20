import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/lib/types";

const STATUS_LABEL: Record<ProjectStatus, string> = {
  shipped: "Shipped",
  "in-progress": "In progress",
  archived: "Archived",
};

const STATUS_DOT: Record<ProjectStatus, string> = {
  shipped: "bg-status-green shadow-[0_0_6px_var(--status-green)]",
  "in-progress": "bg-status-amber shadow-[0_0_6px_var(--status-amber)]",
  archived: "bg-muted-foreground",
};

interface StatusDotProps {
  status: ProjectStatus;
  showLabel?: boolean;
  className?: string;
}

export function StatusDot({ status, showLabel = true, className }: StatusDotProps) {
  return (
    <span
      className={cn(
        "text-muted-foreground inline-flex items-center gap-1.5 text-[13px]",
        className,
      )}
    >
      <span className={cn("inline-block size-2 rounded-full", STATUS_DOT[status])} aria-hidden />
      {showLabel ? STATUS_LABEL[status] : <span className="sr-only">{STATUS_LABEL[status]}</span>}
    </span>
  );
}
