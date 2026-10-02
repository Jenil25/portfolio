import Link from "next/link";
import { Download } from "lucide-react";
import { AgentSandbox } from "@/components/agent-sandbox";
import { GitHubIcon } from "@/components/brand-icons";
import { CareerTimeline } from "@/components/career-timeline";
import { ProjectCard } from "@/components/project-card";
import { about } from "@/content/about";
import { getFeaturedProjects } from "@/content/projects";
import { RESUME_FILENAME, RESUME_PATH } from "@/lib/site";

export default function HomePage() {
  const featured = getFeaturedProjects(3);

  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="grid grid-cols-1 items-center gap-12 py-16 md:grid-cols-[3fr_2fr] md:gap-10 md:py-24">
        <div className="flex flex-col gap-6">
          <h1 className="text-foreground text-[56px] leading-[1.05] font-medium tracking-[-0.02em] sm:text-[64px]">
            Jenil Mahyavanshi
          </h1>
          <p className="text-foreground text-[22px] leading-[1.4]">
            Software engineer building production AI systems.
          </p>
          <p className="text-muted-foreground max-w-xl text-[16px] leading-[1.6]">
            On co-op at Clear Lakes Dental, I own latency, reliability, and compliance for a voice
            AI agent that answers ~1,000 patient calls a week. Before that, two and a half years
            building RAG and LLM platforms at Jeavio. MS CS at Northeastern.{" "}
            <Link
              href="/experience"
              className="text-accent-teal decoration-accent-teal/40 hover:decoration-accent-teal underline underline-offset-4"
            >
              See experience →
            </Link>
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href={RESUME_PATH}
              download={RESUME_FILENAME}
              className="text-primary-foreground bg-accent-teal hover:bg-accent-teal/90 inline-flex items-center gap-2 rounded-md px-4 py-2 text-[14px] transition-colors"
            >
              <Download className="size-4" aria-hidden />
              Download resume
            </a>
            <a
              href={about.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:border-accent-teal/50 border-border inline-flex items-center gap-2 rounded-md border px-4 py-2 text-[14px] transition-colors"
            >
              <GitHubIcon className="size-4" />
              GitHub
            </a>
          </div>
        </div>
        <div className="md:justify-self-end">
          <AgentSandbox />
        </div>
      </section>

      <section className="py-12">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 className="text-h3 text-foreground">Featured projects</h2>
          <Link
            href="/projects"
            className="hover:text-accent-teal text-muted-foreground text-[14px] underline-offset-4 hover:underline"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="py-16">
        <h2 className="text-h3 text-foreground mb-8">Career changelog</h2>
        <div className="max-w-2xl">
          <CareerTimeline />
        </div>
      </section>
    </div>
  );
}
