import type { Metadata } from "next";
import { ListRow, RowList } from "@/components/list-row";
import { Page, PageHeader, Section } from "@/components/page";
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
      <Section title="All projects" i={1}>
        <RowList>
          {projects.map((p) => (
            <ListRow
              key={p.slug}
              href={`/projects/${p.slug}`}
              title={p.name}
              description={p.summary}
              meta={p.date}
            />
          ))}
        </RowList>
      </Section>
    </Page>
  );
}
