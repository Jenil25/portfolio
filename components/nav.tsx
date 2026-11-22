"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GUTTER } from "@/components/page";
import { cn } from "@/lib/utils";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/failures", label: "Failures" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="border-b">
      <nav
        aria-label="Primary"
        className={cn(GUTTER, "flex h-16 items-center justify-between gap-6")}
      >
        {/* The full name doesn't fit beside four links on a 390px phone. */}
        <Link href="/" className="text-small font-medium">
          <span className="sm:hidden">Jenil</span>
          <span className="hidden sm:inline">Jenil Mahyavanshi</span>
        </Link>
        <ul className="text-small flex items-center gap-4 sm:gap-6">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "transition-colors duration-150",
                    active
                      ? "decoration-accent text-foreground underline decoration-[1.5px] underline-offset-[7px]"
                      : "text-muted hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
