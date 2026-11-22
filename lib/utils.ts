import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge only knows Tailwind's built-in sizes. Without this it reads `text-meta`
// as a color and silently drops it when merged with `text-muted`.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: { "font-size": [{ text: ["meta", "small", "body", "lead", "display"] }] },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
