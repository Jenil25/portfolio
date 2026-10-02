import type { ChangelogEntry } from "@/lib/types";

export const changelog: ChangelogEntry[] = [
  {
    version: "v6.0",
    date: "2026-06",
    role: "Software Engineer Co-op",
    place: "Clear Lakes Dental",
    description:
      "Onsite co-op in Minnesota on a live voice AI agent: the first thing patients hear when they call a clinic, running 24/7 at ~1,000 calls a week. I inherited it already deployed, so the work is scaling, reliability, latency, and compliance, not the initial build.",
  },
  {
    version: "v5.0",
    date: "2026-05",
    role: "Personal projects",
    place: "Boston, MA",
    description:
      "Building Internship Hunt, EEO AutoFill, and this site, while running a focused search for a Fall 2026 co-op. The semester I started shipping in public.",
  },
  {
    version: "v4.0",
    date: "2025-09",
    role: "MS CS student",
    place: "Northeastern University",
    description:
      "Started at Khoury College, focused on AI systems and the co-op program. The bet: trade two years of paid co-op time for a sharper portfolio and a US-based career.",
  },
  {
    version: "v3.0",
    date: "2025-07",
    role: "Software Engineer (Adapt shipped)",
    place: "Jeavio India Pvt. Ltd.",
    description:
      "Two and a half years that progressed from intern to engineer. The capstone was Adapt — a multi-tenant RAG platform with hybrid search, checkpointed ingestion, and a Stencil.js design system. The job that taught me what production AI actually requires: not the model, but the queue.",
  },
  {
    version: "v2.5",
    date: "2023-05",
    role: "Associate Software Engineer (Vito & Medwriter)",
    place: "Jeavio India Pvt. Ltd.",
    description:
      "Promoted out of internship. Deployed OpenAI's Whisper on GCP for medical transcription with HIPAA-aware architecture, memory-leak handling, and automatic crash recovery. First time owning a service that handled real user load.",
  },
  {
    version: "v2.0",
    date: "2022-12",
    role: "Software Engineer Intern",
    place: "Jeavio India Pvt. Ltd.",
    description:
      "First paid software role, started in my final year at DDU. Built internal tools — a talent tracker in Spring Boot, a Google Drive-style document share in Django. Converted to full-time at graduation.",
  },
  {
    version: "v1.0",
    date: "2019-08",
    role: "B.Tech in Computer Engineering",
    place: "Dharmsinh Desai University, Nadiad",
    description:
      "Started Computer Engineering at DDU. The four years that turned curiosity into a craft, ending with ShopEra and the first Jeavio internship offer.",
  },
];
