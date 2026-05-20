export type ProjectStatus = "shipped" | "in-progress" | "archived";
export type ProjectCategory = "ai-ml" | "backend" | "tools" | "web";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  name: string;
  category: ProjectCategory;
  status: ProjectStatus;
  summary: string;
  description: string;
  techStack: string[];
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
  version: string;
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
