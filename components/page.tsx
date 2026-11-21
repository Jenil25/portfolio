import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** The one column every page, the nav, and the footer share, so the left edge never moves. */
export const COLUMN = "mx-auto w-full max-w-[40rem] px-5 sm:px-6";

/** Stagger index for the `enter` animation. */
export function enterAt(i: number): CSSProperties {
  return { "--i": i } as CSSProperties;
}

export function Page({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn(COLUMN, "relative pt-14 pb-24 sm:pt-20", className)}>{children}</div>;
}

export function PageHeader({ title, children }: { title: ReactNode; children?: ReactNode }) {
  return (
    <header className="enter">
      <h1 className="text-display">{title}</h1>
      {children && <div className="text-lead text-muted mt-4">{children}</div>}
    </header>
  );
}

interface SectionProps {
  title: string;
  id?: string;
  href?: string;
  linkLabel?: string;
  /** Position in the page's entrance sequence. */
  i?: number;
  children: ReactNode;
}

export function Section({ title, id, href, linkLabel, i = 1, children }: SectionProps) {
  return (
    <section
      aria-labelledby={id ? `${id}-title` : undefined}
      className="enter mt-16"
      style={enterAt(i)}
    >
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <h2 id={id ? `${id}-title` : undefined} className="font-semibold">
          {title}
        </h2>
        {href && linkLabel && (
          <Link
            href={href}
            className="text-small text-muted hover:text-foreground transition-colors"
          >
            {linkLabel}
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
