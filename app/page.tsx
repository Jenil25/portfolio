import Link from "next/link";
import { AgentSandbox } from "@/components/agent-sandbox";
import { CareerTimeline } from "@/components/career-timeline";
import { ProjectCard } from "@/components/project-card";
import { getFeaturedProjects } from "@/content/projects";

export default function HomePage() {
  const featured = getFeaturedProjects(3);

  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="grid grid-cols-1 items-center gap-12 py-16 md:grid-cols-[3fr_2fr] md:gap-10 md:py-24">
        <div className="flex flex-col gap-6">
          <h1 className="text-foreground text-[56px] leading-[1.05] font-medium tracking-[-0.02em] sm:text-[64px]">
            Jenil Mahyavanshi
          </h1>
          <p className="text-muted-foreground text-[22px] leading-[1.4]">
            {/* AI-systems engineer · currently shipping */}
            Software Engineer · currently building
          </p>
          {/* <Suspense fallback={null}>
            <HomeRoles />
          </Suspense> */}
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

      <section className="py-8">
        <div className="text-muted-foreground border-y border-border py-3 font-mono text-[13px]">
          last commit: 2h ago · currently building: portfolio v1 · models tested this week: 4
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
