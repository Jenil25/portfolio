import type { Metadata } from "next";
import { ListRow } from "@/components/list-row";
import { enterAt, Page, PageHeader, Section } from "@/components/page";
import { about } from "@/content/about";
import { changelog } from "@/content/changelog";
import { skills } from "@/content/skills";
import { RESUME_FILENAME, RESUME_PATH } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Background, what I'm currently exploring, and how to get in touch.",
};

const contact: { label: string; value: string; href?: string; download?: string }[] = [
  { label: "Email", value: about.contact.email, href: `mailto:${about.contact.email}` },
  { label: "GitHub", value: "Jenil25", href: about.contact.github },
  { label: "LinkedIn", value: "jenilmahyavanshi", href: about.contact.linkedin },
  { label: "Resume", value: RESUME_FILENAME, href: RESUME_PATH, download: RESUME_FILENAME },
  { label: "Based in", value: about.contact.location },
];

export default function AboutPage() {
  return (
    <Page>
      <PageHeader title="About" />

      <div className="enter mt-10 space-y-5" style={enterAt(1)}>
        {about.bio.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>

      <Section title="Currently exploring" i={2}>
        <ul className="marker:text-subtle text-muted list-disc space-y-1.5 pl-5">
          {about.currentlyExploring.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section title="Timeline" i={3}>
        <ol className="space-y-6">
          {changelog.map((entry) => (
            <li key={entry.date} className="grid gap-x-6 gap-y-1 sm:grid-cols-[5rem_1fr]">
              <time dateTime={entry.date} className="text-meta text-subtle font-mono sm:pt-0.5">
                {entry.date}
              </time>
              <div>
                <p>
                  <span className="font-medium">{entry.role}</span>
                  <span className="text-muted"> · {entry.place}</span>
                </p>
                <p className="text-small text-muted mt-1">{entry.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Education" i={3}>
        <ul>
          {about.education.map((entry) => (
            <ListRow
              key={entry.institution}
              title={entry.institution}
              description={`${entry.degree} · GPA ${entry.gpa}`}
              meta={entry.gradDate}
            />
          ))}
        </ul>
      </Section>

      <Section title="Skills" i={3}>
        <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-[9rem_1fr]">
          {skills.map((bucket) => (
            <div key={bucket.label} className="contents">
              <dt className="text-small text-subtle sm:pt-0.5">{bucket.label}</dt>
              <dd className="text-muted mb-2 sm:mb-0">{bucket.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Contact" i={3}>
        <dl className="grid grid-cols-[5rem_1fr] gap-x-6 gap-y-2">
          {contact.map(({ label, value, href, download }) => (
            <div key={label} className="contents">
              <dt className="text-small text-subtle pt-0.5">{label}</dt>
              <dd className={href ? undefined : "text-muted"}>
                {href ? (
                  <a
                    href={href}
                    download={download}
                    className="link"
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {value}
                  </a>
                ) : (
                  value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Section>
    </Page>
  );
}
