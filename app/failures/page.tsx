import type { Metadata } from "next";
import { ListRow } from "@/components/list-row";
import { enterAt, Page, PageHeader, Section } from "@/components/page";
import { Severity } from "@/components/severity";
import { getFailuresByDate } from "@/content/failures";
import type { Failure } from "@/lib/types";

export const metadata: Metadata = {
  title: "Failures",
  description: "Bugs, bad calls, and what they taught me. The opposite of a highlight reel.",
};

function FailureRow({ failure }: { failure: Failure }) {
  return (
    <ListRow
      href={`/failures/${failure.slug}`}
      title={failure.title}
      description={failure.description}
      meta={
        <span className="inline-flex items-center gap-3">
          <Severity severity={failure.severity} />
          <time dateTime={failure.date}>{failure.date}</time>
        </span>
      }
    />
  );
}

export default function FailuresPage() {
  const all = getFailuresByDate();
  const minor = all.filter((f) => f.severity === "minor");

  return (
    <Page>
      <PageHeader title="Failure log">
        <p>Bugs, bad calls, and what they taught me. The opposite of a highlight reel.</p>
      </PageHeader>
      <ul className="enter mt-12" style={enterAt(1)}>
        {all
          .filter((f) => f.severity !== "minor")
          .map((f) => (
            <FailureRow key={f.slug} failure={f} />
          ))}
      </ul>
      {minor.length > 0 && (
        <Section title="Smaller ones" i={2}>
          <ul>
            {minor.map((f) => (
              <FailureRow key={f.slug} failure={f} />
            ))}
          </ul>
        </Section>
      )}
    </Page>
  );
}
