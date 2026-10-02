import Link from "next/link";
import { Mail } from "lucide-react";
import { about } from "@/content/about";
import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";

const buildDate = new Date().toISOString().slice(0, 10);
const sourceHref = about.contact.github;

const socials = [
  { href: about.contact.github, label: "GitHub", Icon: GitHubIcon },
  { href: about.contact.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: `mailto:${about.contact.email}`, label: "Email", Icon: Mail },
];

export function Footer() {
  return (
    <footer className="border-border border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-end md:justify-between">
        <p className="text-muted-foreground max-w-xl text-sm italic">
          no CMS — every word here is a typed constant in a git repo. v1, built {buildDate}.{" "}
          <Link
            href={sourceHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-teal underline underline-offset-4"
          >
            View source →
          </Link>
        </p>
        <ul className="flex items-center gap-4">
          {socials.map(({ href, label, Icon }) => (
            <li key={label}>
              <Link
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                aria-label={label}
                className="text-muted-foreground hover:text-accent-teal border-border inline-flex size-8 items-center justify-center rounded-md border transition-colors"
              >
                <Icon className="size-4" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
