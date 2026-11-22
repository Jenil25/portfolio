import type { Metadata } from "next";
import { MEASURE, Page, PageHeader, Split } from "@/components/page";
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

      {experience.map((role, i) => {
        const hidden = role.bullets.slice(VISIBLE_BULLETS);
        return (
          <Split
            key={`${role.company}-${role.dates}`}
            i={i + 1}
            side={
              <>
                <p className="text-meta text-subtle font-mono">{role.dates}</p>
                <p className="text-small text-muted mt-1">{role.company}</p>
              </>
            }
          >
            <div className={MEASURE}>
              <h2 className="text-lead font-semibold">{role.role}</h2>
              <p className="mt-4 font-medium">{role.projectName}</p>
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

              <p className="text-small text-subtle mt-6">{role.techStack.join(", ")}</p>
            </div>
          </Split>
        );
      })}
    </Page>
  );
}
