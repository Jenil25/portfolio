import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** The site frame. Its hairline rails appear once the viewport is wider than the frame. */
export const FRAME = "mx-auto w-full max-w-[70rem] min-[72rem]:border-x";
/** The horizontal padding every cell uses, so text in different rows shares left edges. */
export const GUTTER = "px-5 sm:px-8";
/** A readable line length for prose inside the wide content column. */
export const MEASURE = "max-w-[42rem]";

/** Stagger index for the `enter` animation. */
export function enterAt(i: number): CSSProperties {
  return { "--i": i } as CSSProperties;
}

/** A page is a stack of full-width rows with a hairline between each. */
export function Page({ children }: { children: ReactNode }) {
  return <div className="divide-y">{children}</div>;
}

interface PageHeaderProps {
  title: ReactNode;
  /** Rendered above the title: a back link or an eyebrow. */
  before?: ReactNode;
  children?: ReactNode;
}

export function PageHeader({ title, before, children }: PageHeaderProps) {
  return (
    <header className={cn(GUTTER, "enter py-16 sm:py-20")}>
      {before}
      <h1 className={cn("text-display", MEASURE, before && "mt-6")}>{title}</h1>
      {children && <div className={cn("text-lead text-muted mt-4", MEASURE)}>{children}</div>}
    </header>
  );
}

interface SplitProps {
  /** The label column. Sticky on wide screens, above the content on narrow ones. */
  side: ReactNode;
  /** Position in the page's entrance sequence. */
  i?: number;
  children: ReactNode;
}

/** A row with a label column on the left and content on the right. */
export function Split({ side, i = 1, children }: SplitProps) {
  return (
    <section className="enter grid lg:grid-cols-[15rem_1fr]" style={enterAt(Math.min(i, 4))}>
      <div className={cn(GUTTER, "pt-10 lg:py-12")}>
        <div className="lg:sticky lg:top-12">{side}</div>
      </div>
      <div className={cn(GUTTER, "min-w-0 pt-6 pb-10 lg:border-l lg:py-12")}>{children}</div>
    </section>
  );
}

interface SectionProps {
  title: string;
  href?: string;
  linkLabel?: string;
  i?: number;
  children: ReactNode;
}

export function Section({ title, href, linkLabel, i, children }: SectionProps) {
  return (
    <Split
      i={i}
      side={
        <>
          <h2 className="font-semibold">{title}</h2>
          {href && linkLabel && (
            <Link
              href={href}
              className="text-small text-muted hover:text-foreground mt-1 inline-block transition-colors"
            >
              {linkLabel} →
            </Link>
          )}
        </>
      }
    >
      {children}
    </Split>
  );
}
