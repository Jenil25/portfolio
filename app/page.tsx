import { ListRow, RowList } from "@/components/list-row";
import { GUTTER, MEASURE, Page, Section } from "@/components/page";
import { about } from "@/content/about";
import { experience } from "@/content/experience";
import { getFailuresByDate } from "@/content/failures";
import { getFeaturedProjects } from "@/content/projects";
import { RESUME_FILENAME, RESUME_PATH } from "@/lib/site";
import { cn } from "@/lib/utils";

const contactLinks = [
  { label: "Resume", glyph: "↓", href: RESUME_PATH, download: RESUME_FILENAME },
  { label: "GitHub", glyph: "↗", href: about.contact.github },
  { label: "LinkedIn", glyph: "↗", href: about.contact.linkedin },
  { label: "Email", glyph: "→", href: `mailto:${about.contact.email}` },
];

// The voice agent's headline results, as stated in its /experience bullets. Keep in sync.
const results = [
  { value: "~16% → ~40%", label: "Calls the agent resolves on its own" },
  { value: "1–2.5 s", label: "Latency cut from each turn" },
  { value: "~26.5 h", label: "Staff time recovered every week" },
];

export default function HomePage() {
  const now = experience[0];
  const featured = getFeaturedProjects(3);
  const recentFailures = getFailuresByDate()
    .filter((f) => f.severity !== "minor")
    .slice(0, 3);

  return (
    <Page>
      <section className="enter grid lg:grid-cols-[1fr_22rem]">
        <div className={cn(GUTTER, "py-16 sm:py-24")}>
          <h1 className="text-display">Jenil Mahyavanshi</h1>
          <p className="text-lead mt-5">Software engineer building production AI systems.</p>
          <p className={cn("text-muted mt-4", MEASURE)}>
            On co-op at Clear Lakes Dental, I own latency, reliability, and compliance for a voice
            AI agent that answers ~1,400 patient calls a week. Before that, two and a half years
            building RAG and LLM platforms at Jeavio. MS CS at Northeastern.
          </p>
          <ul className="text-small mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {contactLinks.map(({ label, glyph, href, download }) => {
              const external = href.startsWith("http");
              return (
                <li key={label}>
                  <a
                    href={href}
                    download={download}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="group text-muted hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
                  >
                    {label}
                    <span
                      aria-hidden
                      className="text-subtle group-hover:text-accent transition-colors"
                    >
                      {glyph}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <aside
          aria-labelledby="now-title"
          className={cn(GUTTER, "border-t py-10 lg:border-t-0 lg:border-l lg:py-24")}
        >
          <p id="now-title" className="text-meta text-subtle flex items-center gap-2 font-mono">
            <span aria-hidden className="bg-accent size-1.5 rounded-full" />
            Now
          </p>
          <p className="mt-3 font-medium">{now.role}</p>
          <p className="text-small text-muted">{now.company}</p>
          <p className="text-meta text-subtle mt-1 font-mono">{now.dates}</p>
          <dl className="mt-8 space-y-5">
            {results.map(({ value, label }) => (
              // dt must come first in the markup; flex-col-reverse puts the number on top.
              <div key={label} className="flex flex-col-reverse gap-0.5">
                <dt className="text-small text-subtle">{label}</dt>
                <dd className="text-lead font-mono">{value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      <Section title="Selected work" href="/projects" linkLabel="All projects" i={1}>
        <RowList>
          {featured.map((p) => (
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

      <Section title="Experience" href="/experience" linkLabel="Details" i={2}>
        <RowList>
          {experience.map((role) => (
            <ListRow
              key={`${role.company}-${role.dates}`}
              title={role.role}
              description={role.company}
              meta={role.dates}
            />
          ))}
        </RowList>
      </Section>

      <Section title="From the failure log" href="/failures" linkLabel="All failures" i={3}>
        <RowList>
          {recentFailures.map((f) => (
            <ListRow
              key={f.slug}
              href={`/failures/${f.slug}`}
              title={f.title}
              description={f.description}
              meta={<time dateTime={f.date}>{f.date}</time>}
            />
          ))}
        </RowList>
      </Section>
    </Page>
  );
}
