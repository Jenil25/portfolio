import type { SkillBucket } from "@/lib/types";

export const skills: SkillBucket[] = [
  {
    label: "AI / Data",
    items: [
      "RAG",
      "Claude",
      "VAPI (voice AI)",
      "LangChain",
      "LlamaIndex",
      "pgvector",
      "Kafka",
      "RabbitMQ",
      "Celery",
      "OpenAI API",
      "GPT-3.5/4",
      "Whisper",
      "Cohere Reranker",
      "JinaAI Embeddings",
      "K-Means Clustering",
      "AssemblyAI",
      "Neo4j",
      "Graph RAG",
      "N8N",
    ],
  },
  {
    label: "Languages",
    items: ["Python", "TypeScript/JavaScript", "Java", "SQL", "C++", "C#", "Dart", "NoSQL"],
  },
  {
    label: "Backend",
    items: ["Flask", "Django", "Spring Boot", "Node.js", "FastAPI", "Celery", "Supabase"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Nuxt 3", "Vue", "Flutter", "Stencil.js", "Ant Design"],
  },
  {
    label: "Cloud & Infra",
    items: [
      "AWS (EC2, S3, Lambda, ECS, Bedrock, Fargate, Amplify, KMS, RDS, CloudFront, ECR, CodeArtifact, Parameter Store)",
      "GCP",
      "Docker",
      "Terraform",
    ],
  },
  {
    label: "DevOps & Monitoring",
    items: ["Prometheus", "Grafana", "Redis", "Docker Compose", "node_exporter"],
  },
  {
    label: "Integrations",
    items: ["Auth0", "Stripe", "Atlassian (Jira, Confluence)", "Google Drive API"],
  },
];
