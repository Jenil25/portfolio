import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ListRow } from "@/components/list-row";
import { enterAt, Page, Section } from "@/components/page";
import { Severity } from "@/components/severity";
import { failures, getFailureBySlug, getFailuresByDate } from "@/content/failures";
import type { Failure, FailureCategory } from "@/lib/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const CATEGORY_LABEL: Record<FailureCategory, string> = {
  bug: "Bug",
  decision: "Decision",
  architecture: "Architecture",
};

const SECTIONS: { key: keyof Failure["postMortem"]; title: string }[] = [
  { key: "whatHappened", title: "What happened" },
  { key: "rootCause", title: "Root cause" },
  { key: "theFix", title: "The fix" },
  { key: "whatILearned", title: "What I learned" },
];

export function generateStaticParams() {
  return failures.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const failure = getFailureBySlug(slug);
  if (!failure) return { title: "Not found" };
  return { title: failure.title, description: failure.description };
}

export default async function FailurePage({ params }: PageProps) {
  const { slug } = await params;
  const failure = getFailureBySlug(slug);
  if (!failure) notFound();

  const ordered = getFailuresByDate();
  const index = ordered.findIndex((f) => f.slug === failure.slug);
  const neighbours = [
    { label: "Newer", failure: ordered[index - 1] },
    { label: "Older", failure: ordered[index + 1] },
  ].filter((n): n is { label: string; failure: Failure } => Boolean(n.failure));

  return (
    <Page>
      <header className="enter">
        <Link
          href="/failures"
          className="text-small text-subtle hover:text-foreground transition-colors"
        >
          ← Failure log
        </Link>
        <p className="text-meta text-subtle mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono">
          <time dateTime={failure.date}>{failure.date}</time>
          <Severity severity={failure.severity} label />
          <span>{CATEGORY_LABEL[failure.category]}</span>
        </p>
        <h1 className="text-display mt-3">{failure.title}</h1>
        <p className="text-lead text-muted mt-4">{failure.description}</p>
      </header>

      {SECTIONS.map(({ key, title }, i) => (
        <section
          key={key}
          aria-labelledby={key}
          className="enter mt-12"
          style={enterAt(Math.min(i + 1, 3))}
        >
          <h2 id={key} className="text-lead mb-3 font-semibold">
            {title}
          </h2>
          <p>{failure.postMortem[key]}</p>
        </section>
      ))}

      {neighbours.length > 0 && (
        <Section title="More from the log" i={3}>
          <ul>
            {neighbours.map(({ label, failure: f }) => (
              <ListRow key={f.slug} href={`/failures/${f.slug}`} title={f.title} meta={label} />
            ))}
          </ul>
        </Section>
      )}
    </Page>
  );
}
