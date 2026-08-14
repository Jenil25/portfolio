import type { Metadata } from "next";
import { TechPill } from "@/components/tech-pill";
import { experience } from "@/content/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Roles, the systems I built in them, and the stack behind each.",
};

/** Bullets shown before the rest collapse into a native <details>. */
const VISIBLE_BULLETS = 4;

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-[900px] px-6 py-12">
      <header className="mb-10 flex flex-col gap-2">
        <h1 className="text-h1 text-foreground">Experience</h1>
        <p className="text-muted-foreground text-[16px] leading-[1.55]">
          Roles, the systems I built in them, and the stack behind each.
        </p>
      </header>

      <ol className="flex flex-col gap-14">
        {experience.map((role) => {
          const visible = role.bullets.slice(0, VISIBLE_BULLETS);
          const hidden = role.bullets.slice(VISIBLE_BULLETS);

          return (
            <li key={`${role.company}-${role.dates}`} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h2 className="text-h3 text-foreground">{role.role}</h2>
                  <span className="text-muted-foreground font-mono text-[13px]">{role.dates}</span>
                </div>
                <p className="text-muted-foreground text-[14px]">{role.company}</p>
              </div>

              <div className="border-border flex flex-col gap-3 border-l pl-5">
                <p className="text-foreground text-[14px]">{role.projectName}</p>
                <p className="text-muted-foreground text-[15px] leading-[1.6]">{role.summary}</p>
              </div>

              <ul className="text-muted-foreground flex flex-col gap-2 text-[15px] leading-[1.6]">
                {visible.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="text-accent-teal select-none">—</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {hidden.length > 0 && (
                <details className="group flex flex-col gap-2">
                  <summary className="text-muted-foreground hover:text-foreground cursor-pointer list-none text-[13px] transition-colors marker:content-none">
                    <span className="group-open:hidden">Show {hidden.length} more</span>
                    <span className="hidden group-open:inline">Show less</span>
                  </summary>
                  <ul className="text-muted-foreground mt-2 flex flex-col gap-2 text-[15px] leading-[1.6]">
                    {hidden.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span className="text-accent-teal select-none">—</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              )}

              <div className="flex flex-wrap gap-1.5">
                {role.techStack.map((tech) => (
                  <TechPill key={tech} label={tech} />
                ))}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
