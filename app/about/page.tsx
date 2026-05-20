import type { Metadata } from "next";
import Link from "next/link";
import { Download, Mail, MapPin } from "lucide-react";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/brand-icons";
import { CareerTimeline } from "@/components/career-timeline";
import { TechPill } from "@/components/tech-pill";
import { about } from "@/content/about";
import { skills } from "@/content/skills";

export const metadata: Metadata = {
  title: "About",
  description: "Background, what I'm currently exploring, and how to get in touch.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-6 py-12">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[3fr_2fr] md:gap-16">
        <section className="flex flex-col gap-8">
          <h1 className="text-h1 text-foreground">About</h1>

          <div className="flex flex-col gap-4">
            {about.bio.map((paragraph, idx) => (
              <p key={idx} className="text-foreground text-[16px] leading-[1.7]">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-h3 text-foreground">Currently exploring</h2>
            <ul className="flex flex-col gap-1.5">
              {about.currentlyExploring.map((item) => (
                <li
                  key={item}
                  className="text-foreground grid grid-cols-[12px_1fr] items-baseline gap-2 text-[15px]"
                >
                  <span className="text-accent-teal font-mono text-[12px]" aria-hidden>
                    →
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <ContactRow />

          <div>
            <Link
              href="#"
              className="text-primary-foreground bg-accent-teal hover:bg-accent-teal/90 inline-flex items-center gap-2 rounded-md px-4 py-2 text-[14px] transition-colors"
            >
              <Download className="size-4" aria-hidden />
              Download resume
            </Link>
          </div>
        </section>

        <aside className="flex flex-col gap-12">
          <section className="flex flex-col gap-6">
            <h2 className="text-h3 text-foreground">Career changelog</h2>
            <CareerTimeline />
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-h3 text-foreground">Skills</h2>
            <div className="flex flex-col gap-4">
              {skills.map((bucket) => (
                <div key={bucket.label} className="flex flex-col gap-2">
                  <h3 className="text-muted-foreground font-mono text-[11px] tracking-wide">
                    {bucket.label}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {bucket.items.map((item) => (
                      <TechPill key={item} label={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

function ContactRow() {
  const items = [
    {
      label: "email",
      href: `mailto:${about.contact.email}`,
      Icon: Mail,
      external: false,
    },
    { label: "GitHub", href: about.contact.github, Icon: GitHubIcon, external: true },
    { label: "LinkedIn", href: about.contact.linkedin, Icon: LinkedInIcon, external: true },
    { label: "X", href: "https://x.com/", Icon: XIcon, external: true },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="text-muted-foreground flex items-center gap-2 text-[13px]">
        <MapPin className="size-3.5" aria-hidden />
        <span>{about.contact.location}</span>
      </div>
      <ul className="flex flex-wrap gap-2">
        {items.map(({ label, href, Icon, external }) => (
          <li key={label}>
            <Link
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="text-foreground hover:border-accent-teal/50 hover:text-accent-teal inline-flex items-center gap-2 rounded-md border border-border px-2.5 py-1.5 text-[13px] transition-colors"
            >
              <Icon className="size-3.5" aria-hidden />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
