import { cn } from "@/lib/utils";

interface TechPillProps {
  label: string;
  className?: string;
}

export function TechPill({ label, className }: TechPillProps) {
  return (
    <span
      className={cn(
        "text-muted-foreground inline-flex items-center rounded-md border border-border px-2 py-0.5 font-mono text-[12px] leading-none",
        className,
      )}
    >
      {label}
    </span>
  );
}
