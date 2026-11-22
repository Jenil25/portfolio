import { cn } from "@/lib/utils";
import type { Severity as SeverityLevel } from "@/lib/types";

const LEVEL: Record<SeverityLevel, number> = { minor: 1, major: 2, critical: 3 };

/** Severity as a three-dot gauge. Only critical gets the accent, so it's the one that stands out. */
export function Severity({
  severity,
  label = false,
}: {
  severity: SeverityLevel;
  label?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden className="inline-flex gap-[3px]">
        {[1, 2, 3].map((n) => (
          <span
            key={n}
            className={cn(
              "size-[5px] rounded-full",
              n > LEVEL[severity] ? "bg-line" : severity === "critical" ? "bg-accent" : "bg-muted",
            )}
          />
        ))}
      </span>
      <span className={label ? undefined : "sr-only"}>{severity}</span>
    </span>
  );
}
