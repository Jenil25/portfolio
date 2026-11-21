import type { Metadata } from "next";
import { enterAt, Page, PageHeader } from "@/components/page";
import { experience } from "@/content/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Roles, the systems I built in them, and the stack behind each.",
};

/** Bullets shown before the rest collapse into a native <details>. */
const VISIBLE_BULLETS = 4;

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="marker:text-subtle mt-4 list-disc space-y-2 pl-5">
      {items.map((bullet) => (
        <li key={bullet}>{bullet}</li>
      ))}
    </ul>
  );
}

export default function ExperiencePage() {
  return (
    <Page>
      <PageHeader title="Experience">
        <p>Roles, the systems I built in them, and the stack behind each.</p>
      </PageHeader>

      <ol>
        {experience.map((role, i) => {
          const hidden = role.bullets.slice(VISIBLE_BULLETS);
          return (
            <li
              key={`${role.company}-${role.dates}`}
              className="enter mt-16"
              style={enterAt(Math.min(i + 1, 3))}
            >
              <div className="grid gap-x-8 sm:grid-cols-[1fr_auto]">
                <h2 className="text-lead font-semibold">{role.role}</h2>
                <p className="text-meta text-subtle font-mono sm:col-start-2 sm:row-start-1 sm:pt-1.5">
                  {role.dates}
                </p>
                <p className="text-muted">{role.company}</p>
              </div>

              <p className="mt-5 font-medium">{role.projectName}</p>
              <p className="text-muted mt-1">{role.summary}</p>

              <Bullets items={role.bullets.slice(0, VISIBLE_BULLETS)} />
              {hidden.length > 0 && (
                <details className="group mt-3">
                  <summary className="text-small text-subtle hover:text-foreground w-fit cursor-pointer list-none pl-5 transition-colors marker:content-none">
                    <span className="group-open:hidden">Show {hidden.length} more</span>
                    <span className="hidden group-open:inline">Show less</span>
                  </summary>
                  <Bullets items={hidden} />
                </details>
              )}

              <p className="text-small text-subtle mt-5">{role.techStack.join(", ")}</p>
            </li>
          );
        })}
      </ol>
    </Page>
  );
}
