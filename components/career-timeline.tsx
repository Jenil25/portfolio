import { changelog } from "@/content/changelog";

export function CareerTimeline() {
  return (
    <ol className="relative">
      <span aria-hidden className="bg-border absolute top-2 bottom-2 left-[7px] w-px" />
      {changelog.map((entry) => (
        <li
          key={entry.version}
          className="relative grid grid-cols-[28px_1fr] items-start gap-x-4 pb-8 last:pb-0"
        >
          <span
            aria-hidden
            className="bg-background border-accent-teal/60 relative z-10 mt-2 size-[15px] rounded-full border"
          />
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-foreground font-mono text-[15px]">{entry.version}</span>
              <span className="text-muted-foreground font-mono text-[13px]">{entry.date}</span>
            </div>
            <div className="text-foreground text-[15px]">
              {entry.role}
              <span className="text-muted-foreground"> · {entry.place}</span>
            </div>
            <p className="text-muted-foreground text-[14px] leading-[1.55]">{entry.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
