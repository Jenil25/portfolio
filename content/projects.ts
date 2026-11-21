import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    slug: "internship-hunt-pipeline",
    name: "Internship Hunt: AI-powered job application pipeline",
    category: "ai-ml",
    status: "shipped",
    featured: true,
    summary:
      "End-to-end pipeline that parses jobs, scores fit with Gemini, and generates ATS-optimized tailored resumes via LaTeX, surfaced through a Next.js dashboard.",
    description:
      "An end-to-end pipeline that ingests a job posting, scores fit against my profile with Gemini, and emits an ATS-optimized resume. The orchestration layer is a 35-node n8n workflow handling parsing, scoring, resume tailoring, and conditional cover-letter generation, with rate-limit-tolerant error handling so the primary pipeline still finishes when downstream calls fail. A custom Python microservice compiles tailored content into a LaTeX master template; a versioning system tracks every iteration per job with comparison UI and one-click downloads. The Next.js 15 dashboard surfaces job tracking, resume versions, and profile editing through server components. The full stack runs locally via Docker Compose: n8n, Postgres with pgvector, and the LaTeX service.",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "pgvector",
      "n8n",
      "Google Gemini API",
      "LaTeX",
      "Docker",
      "Python",
    ],
    github: "https://github.com/Jenil25/internship-hunt-workflow",
    demo: "https://internship-hunt-olive.vercel.app/",
    date: "Feb 2026 – May 2026",
    architecture:
      "The orchestration layer is a 35-node n8n workflow split into four stages: ingestion (Greenhouse/Lever/Workday parsers normalize postings into a common JD schema), scoring (Gemini compares the JD against an embedded skill profile in pgvector and emits a fit score plus structured gap analysis), tailoring (a Python microservice merges the gap analysis into a LaTeX master template via regex replacement on `\\section{}` boundaries), and delivery (compiled PDF plus a Next.js 15 dashboard row with version, score, and one-click download).\n\npgvector handles deduplication on ingestion — postings are embedded and compared against a rolling 30-day window, so the same role re-listed across boards doesn't trigger a re-tailor. The dashboard reads Postgres directly through server components; no separate API layer. Everything runs locally via Docker Compose: n8n, Postgres+pgvector, the LaTeX service, and the Next.js dev server. Rate-limit handling on Gemini calls degrades gracefully — the workflow checkpoints after each scoring step, so a 429 mid-batch only retries the failed nodes instead of replaying the full DAG.",
    story:
      "Built this because the alternative was unsustainable. Early in my Spring 2026 search I was tailoring resumes by hand, swapping a few bullets per role, and getting low callback rates anyway — the resume wasn't tailored enough to make ATS keyword filters happy, and tailoring 30 of them by hand wasn't realistic alongside coursework.\n\nThe hardest bug was a quiet one: for the first two weeks the tailoring node was producing identical resumes across jobs. The Gemini output was fine — different content for each JD — but it was being silently discarded. Root cause was the placeholder-token strategy in the LaTeX template: I was injecting tailored content by replacing `{{EXPERIENCE_BLOCK}}`-style markers, and a recent template refactor had renamed the markers without updating the workflow. The merge step would 'succeed' (no exception), the unmodified template would compile, and I'd ship the same PDF 30 times.\n\nThe fix was to stop matching named placeholders entirely. The new approach replaces content between `\\section{}` boundaries directly via regex — the sections themselves are the structural anchors, so there's nothing extra to keep in sync. I also upgraded the generation model from `gemini-2.5-flash-lite` to `gemini-2.5-flash`, which was a noticeable quality jump on the gap-mapping step.\n\nTakeaway: when a pipeline can fail silently, every stage needs an output assertion stricter than 'no exception thrown.' The new template merge throws if the post-merge document is byte-identical to the pre-merge one.",
  },
  {
    slug: "adapt-rag",
    name: "Adapt — LLM-powered knowledge platform",
    category: "ai-ml",
    status: "shipped",
    featured: true,
    summary:
      "Scalable microservices platform for multi-format ingestion, hybrid-search RAG, and a reusable design system — the company's core product.",
    description:
      "A multi-format knowledge platform built as a Python/Flask microservices ecosystem (Core, Data Ingestion, AV, RAG, User Management) with a Next.js + TypeScript frontend. Ingestion handles MP4, MP3, PDF, DOC, and Markdown plus Google Drive and Atlassian connectors, all funneled through an S3 multipart upload pipeline with ClamAV scanning and a quarantine-to-clean promotion flow. RabbitMQ and Celery run the async work with checkpointed retry-able stages, so a failed embedding step doesn't replay extraction. Retrieval combines pgvector semantic search with PostgreSQL tsvector keyword search, fused via Reciprocal Rank Fusion and reranked with Cohere; query transformation broadens coverage on complex questions and an intent classifier routes between RAG, summarize, analysis, and external-LLM paths. K-Means clustering auto-generates topics with citation tracking; hierarchical summarization aggregates cluster summaries into document-level summaries. Real-time processing status streams to the frontend via SSE backed by Redis. The team design system was built in parallel using Stencil.js Web Components, published to AWS CodeArtifact.",
    techStack: [
      "Python",
      "Flask",
      "Celery",
      "RabbitMQ",
      "AWS S3",
      "Docker",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Auth0",
      "Prometheus",
      "Grafana",
      "Redis",
      "pgvector",
      "Cohere",
      "K-Means",
      "LangChain",
      "LLMs",
      "JinaAI",
      "Stencil.js",
    ],
    date: "Jun 2024 – Jul 2025",
    architecture:
      "Five Python/Flask services share Postgres, RabbitMQ, and Redis, with a Next.js + TypeScript frontend. Core handles auth (Auth0) and request routing; Data Ingestion runs the upload-to-clean pipeline; AV scans incoming files; RAG handles retrieval and generation; User Management owns workspaces and permissions.\n\nIngestion: files land via S3 multipart upload, get scanned by ClamAV in a quarantine bucket, and on a clean verdict are promoted to the working bucket — only then does the extraction graph kick off. RabbitMQ + Celery split the work into checkpointed stages (extract → chunk → embed → index), so a transient failure in embedding doesn't replay extraction. Each stage writes to a stable artifact path, and a state machine in Postgres tracks per-document progress.\n\nRetrieval: queries hit a hybrid scorer — pgvector for semantic, Postgres tsvector for lexical — fused with Reciprocal Rank Fusion and reranked with Cohere. A query-transformation step generates rephrasings to broaden recall on complex questions; an intent classifier upstream of retrieval routes between four paths: standard RAG, summarize, analysis, and external-LLM passthrough. Ingestion gave retrieval a head start, too: after chunking, a post-processing step ran RAG over a predefined set of questions users were likely to ask and stored the results as embeddings with the document, so incoming questions matched against those as well.\n\nTopic generation runs K-Means over chunk embeddings to surface auto-topics with citation tracking back to source spans; a hierarchical summarization step rolls cluster summaries up into document-level summaries, so the topic UI exposes both granular and digest views.\n\nIngestion progress streams to the frontend via SSE, with Redis as the pub/sub bus between Celery workers and the SSE endpoint. Prometheus + Grafana cover every service, with per-stage latency and queue-depth dashboards.\n\nThe team design system was built in parallel as Stencil.js Web Components — framework-agnostic so the same primitives worked in Adapt's Next.js app and a separate internal admin tool — published to AWS CodeArtifact.",
    story:
      "Most of what made Adapt hard wasn't retrieval. It was the plumbing between the services, and the frontend on top of them.\n\nThe first wall was Celery. Our services published jobs to RabbitMQ for the Celery workers, and the workers never processed them. Nothing in the docs we could find explained why, so we checked the message structure by hand and reverse-engineered what the workers expected. The missing piece was an `id` field: without one, Celery never picked the job up. Chunking was slower than it was hard: which strategy (semantic, sentence, or speaker-based) suited which file type came down to trial and error.\n\nThe rest of my hard problems were on the frontend. I built the video player from scratch because we wanted a custom UI rather than a library's, and it had enough moving parts that it took several rounds before the bugs were gone. Uploads went straight from the browser to S3 as multipart uploads, with live progress in the UI.\n\nThe player was only the start. The transcript had to follow playback like Spotify's lyrics: scroll away and it stayed where you left it, scroll the playing line back into view and it followed the video again, with a sync-now button in between. Breadcrumbs looked simple until they had to be editable, double as dropdowns, cope with user-created folders, and never overflow. React had no good DOCX viewer, so we converted each file to PDF for viewing while downloads still returned the original DOCX, and then in-document search was the next fight, because none of the PDF viewers we tried supported it. Search results had to land precisely: a video result jumped to the exact timestamp, a document result scrolled to the exact word and highlighted it. Most of the pain was React state management, which we were still learning.\n\nLater, once answers streamed in, long ones would break mid-stream and the user had to reload. An answer bigger than the backend's per-request limit arrived split across several parts, and the frontend assumed one continuous stream. I built the frontend's streaming handling around that, so an answer could arrive in parts and still read as one.\n\nOne failure retries couldn't touch: some uploaded files with unusual characters broke the pipeline, and retrying failed the same way every time. A checkpointed retry replays the same input, so it only helps when the failure is transient, not when the file itself is the cause. The fix was to have text extraction skip the characters it couldn't handle and process the rest.\n\nIf I built Adapt again, I'd start with a monolith. The microservice split didn't fit our feature set: making features work meant passing heavily customized messages between services, which tied them together so tightly that no other team or project could use them on their own. If we'd kept the services, I'd give each one a fixed message structure and never change it. Looking back, both of the hardest lessons were about the messages between the services, not the services themselves.",
  },
  {
    slug: "recruitease",
    name: "RecruitEase — AI recruitment platform",
    category: "ai-ml",
    status: "shipped",
    featured: false,
    summary:
      "A six-feature AI recruitment tool using GPT-3.5 for candidate matching, outreach, culture fit, and resume feedback.",
    description:
      "A six-feature recruitment platform built around GPT-3.5 for Jeavio's HR team during a one-week internal hackathon — my first real project with LLM APIs. Candidate Matching scores resume-versus-JD fit; LinkedIn Reachout drafts personalized outreach from a JD plus profile data; LinkedIn Post drafts the hiring post for a role from its JD; the Interview Feedback module summarizes and feeds insights back into the hiring loop; Culture Fit grades candidate answers against company values using semantic similarity; Resume Feedback finds gaps against a JD and emits a learning path for the missing skills. Each feature lived inside GPT-3.5's 4096-token window, so most of the work went into per-feature prompt design — context-pruning, output formatting, and getting consistent scoring out of a model that wasn't built for it.",
    techStack: ["GPT-3.5", "Python", "LLM APIs"],
    date: "May 2023",
  },
  {
    slug: "eeo-autofill",
    name: "EEO AutoFill — Chrome extension",
    category: "tools",
    status: "shipped",
    featured: true,
    summary:
      "Chrome extension (Manifest V3) that auto-fills EEO and demographic sections across Workday, Greenhouse, Lever, iCIMS, and Taleo.",
    description:
      "A Chrome extension (Manifest V3) that auto-fills the EEO and demographic sections on job application forms across Workday, Greenhouse, Lever, iCIMS, and Taleo. The extension maps a single stored profile against each ATS's field schema — field IDs, label conventions, and dropdown value formats vary across vendors, so the core of the work is a per-vendor adapter layer that resolves the same logical field (race, gender, veteran status, disability) into whatever shape the current form expects. Built after I noticed I was filling out the same dropdowns 100+ times during my Spring 2026 internship search; saves roughly 90 seconds per application.",
    techStack: ["TypeScript", "Chrome Extensions API", "Manifest V3"],
    github: "https://github.com/Jenil25/eeo-autofill",
    demo: "https://chromewebstore.google.com/detail/eeo-autofill/cbajiekpgkhmnhipbkgfihpikakebjmp",
    date: "Spring 2026",
  },
  {
    slug: "hackathon-ai-talent-pool",
    name: "Hackathon: AI talent pool",
    category: "ai-ml",
    status: "shipped",
    featured: false,
    summary:
      "Led a team of 5 to build an LLM-powered talent assignment tool using semantic search over employee skills.",
    description:
      "Led a team of five over a two-week internal hackathon to build a semantic-search interface over employee skill profiles. The use case: a manager describes the team they need ('two backend engineers comfortable with event-driven systems, one with Kafka experience'), and the system surfaces candidate engineers ranked by embedding similarity over their stored skill descriptions. Skills were embedded once at profile-update time; queries embedded at request time and ranked with cosine similarity, with explanations attached so managers could audit why a given engineer ranked where they did.",
    techStack: ["LLMs", "Semantic Search", "Team Leadership", "Prototyping"],
    date: "2 Weeks",
  },
  {
    slug: "hackathon-llm-data-extraction",
    name: "Hackathon: LLM data extraction",
    category: "ai-ml",
    status: "shipped",
    featured: false,
    summary:
      "Tackled passing structured database rows to LLMs by converting rows to natural-language sentences with column context.",
    description:
      "A 24-hour hackathon project tackling how to feed structured database rows to an LLM without losing column semantics. The approach: at index time, render each row as a natural-language sentence that includes column context — 'On 2024-03-12, customer 4421 placed an order of $112 in the Boston region' — so semantic search and downstream prompts can match against the row meaning instead of fragile column-by-column joins. Time-series rows used a similar template but with date-relative phrasing, which made temporal queries ('orders in the last quarter') answerable through retrieval rather than explicit SQL.",
    techStack: ["LLMs", "SQL", "Semantic Matching"],
    date: "24 Hours",
  },
  {
    slug: "the-enigma-engine",
    name: "The Enigma Engine",
    category: "backend",
    status: "shipped",
    featured: false,
    summary:
      "Modular RESTful API for high-integrity transaction processing with atomic operations and real-time analytics.",
    description:
      "A modular RESTful API focused on transaction integrity for a booking-style domain. The core piece is the use of MySQL atomic transactions on every booking write, so concurrent reservations against the same inventory row never produce double-bookings or partial state. On top of the transactional layer is a reporting endpoint that runs joins across the booking and revenue tables to surface real-time revenue trends — basic analytics, but answered from the same database the writes go through, without a separate warehouse pipeline.",
    techStack: ["Flask", "MySQL", "REST API"],
    github: "https://github.com/Jenil25/the-enigma-engine",
    date: "Fall 2025",
  },
  {
    slug: "shopera",
    name: "ShopEra",
    category: "tools",
    status: "shipped",
    featured: false,
    summary:
      "Flutter app connecting local shop owners and customers, with shop discovery, search, cart, and direct contact.",
    description:
      "A Flutter mobile app connecting local shop owners to nearby customers. Shop owners sign up through a portal, list their inventory, and manage product details; customers sign up on the consumer side and browse local shops, search by shop or by item, contact owners directly, maintain a cart, and bookmark favorites. The backend is a Firebase + MySQL/PHP split — Firebase handles auth and real-time pieces, the relational store handles product and order data.",
    techStack: ["Flutter", "Firebase", "MySQL", "PHP"],
    github: "https://github.com/Jenil25/ShopEra",
    date: "Jun 2022 - Aug 2022",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(limit?: number): Project[] {
  const featured = projects.filter((p) => p.featured);
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

export function getRelatedProjects(slug: string, limit = 3): Project[] {
  const target = getProjectBySlug(slug);
  if (!target) return [];
  const targetTechs = new Set(target.techStack);
  return projects
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      project: p,
      shared: p.techStack.filter((t) => targetTechs.has(t)).length,
    }))
    .filter((entry) => entry.shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .slice(0, limit)
    .map((entry) => entry.project);
}
