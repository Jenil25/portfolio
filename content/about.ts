import type { About } from "@/lib/types";

export const about: About = {
  name: "Jenil Mahyavanshi",
  bio: [
    "I'm a CS master's student at Northeastern, focused on production AI systems. Before grad school I spent two and a half years at Jeavio India, where I went from intern to engineer building LLM applications, RAG pipelines, and the microservices that hold them up. The problems I'm drawn to live in the gap between a demo that impresses people in a meeting and a system that doesn't fall over at scale — that gap is where most of the interesting engineering happens, and where most AI projects quietly stall.",
    "Right now I'm on co-op at Clear Lakes Dental, owning reliability, latency, and compliance for a live voice AI agent that answers around 1,400 patient calls a week. Earlier this year I built Internship Hunt — a pipeline that scrapes job postings, scores them with Gemini, and tailors resumes via LaTeX — and EEO AutoFill, a Chrome extension with per-vendor adapters for Workday, Greenhouse, Lever, iCIMS, and Taleo. Both are shaped by over a year on Adapt at Jeavio, a multi-tenant RAG platform with hybrid pgvector + tsvector retrieval, Cohere reranking, and a checkpointed ingestion pipeline behind a Prometheus/Grafana stack. That work taught me what RAG actually requires in production: not the embedding model, but the queue, the monitoring, and the half-dozen ways the pipeline fails silently if you don't build for it.",
    "A few things I've come to believe along the way. Instrumentation comes before optimization — you can't fix what you can't see, and AI systems are particularly good at producing confident-looking output that's quietly wrong. Silent fallbacks are worse than loud failures; the Failures log on this site is mostly a museum of that lesson. Personal tools compound — a script you write once and run weekly often outweighs the feature you ship for someone else and forget about. And writing things down — decisions, post-mortems, why this model over that one — is how you stop relearning the same lesson on the third project.",
  ],
  currentlyExploring: [
    "Agentic workflows — when planning beats one-shot tool use",
    "Hybrid local/cloud model routing — Ollama + Gemini fallback",
    "The gap between RAG demos and production",
    "Compounding loops in personal tools",
  ],
  contact: {
    email: "jenilmahy25@gmail.com",
    github: "https://github.com/Jenil25",
    linkedin: "https://www.linkedin.com/in/jenilmahyavanshi/",
    location: "Boston, MA",
  },
  education: [
    {
      institution: "Northeastern University",
      degree: "Master of Science in Computer Science",
      gradDate: "Exp. Dec 2027",
      gpa: "3.83/4.0",
    },
    {
      institution: "Dharmsinh Desai University",
      degree: "Bachelor of Technology in Computer Engineering",
      gradDate: "May 2023",
      gpa: "8.14/10.0",
    },
  ],
};
