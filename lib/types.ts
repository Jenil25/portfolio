/**
 * Closed vocabulary for `Project.techStack`. Related-project ranking matches tech by
 * exact string, so a spelling variant ("NextJS" vs "Next.js") would silently stop two
 * projects from counting as related. Adding a project with new tech means adding it
 * here first — that friction is the point.
 */
export type TechName =
  | "AWS S3"
  | "Auth0"
  | "Celery"
  | "Chrome Extensions API"
  | "Cohere"
  | "Docker"
  | "Firebase"
  | "Flask"
  | "Flutter"
  | "GPT-3.5"
  | "Google Gemini API"
  | "Grafana"
  | "JinaAI"
  | "K-Means"
  | "LLM APIs"
  | "LLMs"
  | "LaTeX"
  | "LangChain"
  | "Manifest V3"
  | "MySQL"
  | "Next.js"
  | "Node.js"
  | "PHP"
  | "PostgreSQL"
  | "Prometheus"
  | "Prototyping"
  | "Python"
  | "REST API"
  | "RabbitMQ"
  | "React"
  | "Redis"
  | "SQL"
  | "Semantic Matching"
  | "Semantic Search"
  | "Stencil.js"
  | "Team Leadership"
  | "TypeScript"
  | "n8n"
  | "pgvector";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  name: string;
  summary: string;
  description: string;
  techStack: TechName[];
  metrics?: ProjectMetric[];
  architecture?: string;
  story?: string;
  github?: string;
  demo?: string;
  featured?: boolean;
  date: string;
}

export type Severity = "minor" | "major" | "critical";
export type FailureCategory = "bug" | "decision" | "architecture";

export interface PostMortem {
  whatHappened: string;
  rootCause: string;
  theFix: string;
  whatILearned: string;
}

export interface Failure {
  slug: string;
  title: string;
  date: string;
  severity: Severity;
  category: FailureCategory;
  description: string;
  postMortem: PostMortem;
}

export interface ChangelogEntry {
  date: string;
  role: string;
  place: string;
  description: string;
}

export interface Experience {
  role: string;
  company: string;
  dates: string;
  projectName: string;
  summary: string;
  techStack: string[];
  bullets: string[];
}

export interface EducationEntry {
  institution: string;
  degree: string;
  gradDate: string;
  gpa: string;
}

export interface Contact {
  email: string;
  github: string;
  linkedin: string;
  location: string;
}

export interface About {
  name: string;
  bio: string[];
  currentlyExploring: string[];
  contact: Contact;
  education: EducationEntry[];
}

export type SkillBucket = {
  label: string;
  items: string[];
};
