"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/failures", label: "Failures" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="border-border bg-background/70 sticky top-0 z-50 border-b backdrop-blur-md">
      {/* Below sm the links wrap to a second row: logo + links + toggle need ~430px, wider
          than most phones. */}
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-2 gap-y-1 px-6 py-2 sm:h-14 sm:py-0"
      >
        <Link
          href="/"
          className="hover:text-accent-teal text-foreground mr-auto font-mono text-sm tracking-tight transition-colors"
        >
          jenil
        </Link>
        <ul className="order-last -ml-3 flex w-full items-center gap-1 sm:order-none sm:ml-0 sm:w-auto">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm transition-colors",
                    active ? "text-accent-teal" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  );
}
