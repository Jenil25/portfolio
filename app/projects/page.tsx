import type { Metadata } from "next";
import { ListRow } from "@/components/list-row";
import { enterAt, Page, PageHeader } from "@/components/page";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "What I've built, and how.",
};

export default function ProjectsPage() {
  return (
    <Page>
      <PageHeader title="Projects">
        <p>What I&apos;ve built, and how.</p>
      </PageHeader>
      <ul className="enter mt-12" style={enterAt(1)}>
        {projects.map((p) => (
          <ListRow
            key={p.slug}
            href={`/projects/${p.slug}`}
            title={p.name}
            description={p.summary}
            meta={p.date}
          />
        ))}
      </ul>
    </Page>
  );
}
