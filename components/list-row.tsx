import Link from "next/link";
import type { ReactNode } from "react";

/** Wraps ListRows. The negative margin cancels the rows' own padding at the ends, so the first
    title lines up with the section label beside it. */
export function RowList({ children }: { children: ReactNode }) {
  return <ul className="-my-3">{children}</ul>;
}

interface ListRowProps {
  title: ReactNode;
  description?: ReactNode;
  /** Right-aligned on wide screens, under the title on phones. Dates, durations, severity. */
  meta?: ReactNode;
  href?: string;
}

/**
 * A row in any list on the site. Hover tints the row's background instead of drawing a box;
 * the negative margin keeps the text on the column's left edge while the tint bleeds past it.
 */
export function ListRow({ title, description, meta, href }: ListRowProps) {
  const body = (
    <>
      <span className="font-medium">{title}</span>
      {meta && (
        <span className="text-meta text-subtle font-mono sm:col-start-2 sm:row-start-1 sm:pt-0.5 sm:text-right sm:whitespace-nowrap">
          {meta}
        </span>
      )}
      {description && (
        <span className="text-small text-muted max-w-[42rem] sm:col-span-2">{description}</span>
      )}
    </>
  );
  const layout = "-mx-3 grid gap-x-8 gap-y-1 rounded-lg px-3 py-3 sm:grid-cols-[1fr_auto]";

  return (
    <li>
      {href ? (
        <Link href={href} className={`${layout} hover:bg-surface transition-colors duration-150`}>
          {body}
        </Link>
      ) : (
        <div className={layout}>{body}</div>
      )}
    </li>
  );
}
