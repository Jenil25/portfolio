"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Before mount the theme is unknown; render the dark-mode state, since dark is the default.
  const isDark = mounted ? resolvedTheme === "dark" : true;
  const Icon = isDark ? Sun : Moon;

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="text-subtle hover:text-foreground hover:bg-surface -mr-2 inline-flex size-9 items-center justify-center rounded-md transition-[color,background-color,scale] duration-150 active:scale-95"
    >
      <Icon className="size-4" aria-hidden />
    </button>
  );
}
