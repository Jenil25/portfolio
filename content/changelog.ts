import type { ChangelogEntry } from "@/lib/types";

// TODO: real years and per-entry descriptions. Anchors:
//   v1.0 first code, v2.0 Jeavio internship Dec 2022, v3.0 Adapt shipped,
//   v4.0 Northeastern Fall 2025, v5.0 currently shipping.
export const changelog: ChangelogEntry[] = [
  {
    version: "v5.0",
    date: "2026-05",
    role: "Currently shipping",
    place: "Boston, MA",
    description: "TODO: what I'm building right now and why.",
  },
  {
    version: "v4.0",
    date: "2025-09",
    role: "MS CS student",
    place: "Northeastern University",
    description: "TODO: focus areas and why I picked Northeastern.",
  },
  {
    version: "v3.0",
    date: "2025-07",
    role: "Software Engineer (Adapt shipped)",
    place: "Jeavio India Pvt. Ltd.",
    description:
      "TODO: shipped the Adapt platform end-to-end — what it taught me about production AI systems.",
  },
  {
    version: "v2.0",
    date: "2022-12",
    role: "Software Engineer Intern",
    place: "Jeavio India Pvt. Ltd.",
    description: "TODO: first paid software role; the internship that became a job.",
  },
  {
    version: "v1.0",
    date: "TODO",
    role: "First code",
    place: "TODO",
    description: "TODO: when I wrote my first program and what hooked me.",
  },
];
