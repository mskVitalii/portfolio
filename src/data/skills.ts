export type SkillCategory =
  | "backend"
  | "frontend"
  | "infrastructure"
  | "ai"
  | "languages";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  years: number;
  level: "familiar" | "proficient" | "expert";
  projects: string[];
  description?: string;
}

export const SKILLS: Skill[] = [
  // Backend
  {
    id: "go",
    name: "Go",
    category: "backend",
    years: 3,
    level: "expert",
    projects: ["ozon-warehouse-search"],
    description: "High-throughput microservices, Kafka consumers, REST APIs",
  },
  {
    id: "python",
    name: "Python",
    category: "backend",
    years: 5,
    level: "expert",
    projects: ["infineon-parking-guidance", "wedo-agency-startups"],
    description: "FastAPI, data pipelines, CV integrations, scripting",
  },
  {
    id: "csharp",
    name: "C#",
    category: "backend",
    years: 2,
    level: "proficient",
    projects: ["infineon-parking-guidance", "ozon-warehouse-search"],
    description: "Device management, WebSocket integrations, .NET services",
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    years: 3,
    level: "proficient",
    projects: ["wedo-agency-startups"],
    description: "NestJS, REST APIs, real-time features",
  },
  {
    id: "ruby",
    name: "Ruby on Rails",
    category: "backend",
    years: 1,
    level: "proficient",
    projects: ["online-tours-ab"],
    description: "Server-side A/B flag logic, API endpoints",
  },

  // Frontend
  {
    id: "react",
    name: "React",
    category: "frontend",
    years: 5,
    level: "expert",
    projects: ["infineon-parking-guidance", "online-tours-ab", "wedo-agency-startups"],
    description: "Hooks, RSC, complex state management, performance optimization",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    years: 4,
    level: "expert",
    projects: ["infineon-parking-guidance", "online-tours-ab"],
    description: "Strict mode, generics, advanced type patterns",
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "frontend",
    years: 3,
    level: "expert",
    projects: ["wedo-agency-startups"],
    description: "App Router, SSG/SSR/ISR, middleware, i18n",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    years: 3,
    level: "expert",
    projects: ["online-tours-ab"],
    description: "v4 CSS-first config, design systems, dark mode",
  },

  // Infrastructure
  {
    id: "docker",
    name: "Docker",
    category: "infrastructure",
    years: 4,
    level: "expert",
    projects: ["ozon-warehouse-search", "online-tours-ab"],
    description: "Multi-stage builds, Compose, production containers",
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    category: "infrastructure",
    years: 3,
    level: "proficient",
    projects: ["ozon-warehouse-search", "online-tours-ab"],
    description: "Deployments, services, ingress, resource limits",
  },
  {
    id: "kafka",
    name: "Kafka",
    category: "infrastructure",
    years: 2,
    level: "proficient",
    projects: ["ozon-warehouse-search"],
    description: "Event streaming, consumer groups, exactly-once semantics",
  },
  {
    id: "redis",
    name: "Redis",
    category: "infrastructure",
    years: 3,
    level: "proficient",
    projects: ["ozon-warehouse-search", "online-tours-ab"],
    description: "Caching, session storage, pub/sub",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "infrastructure",
    years: 4,
    level: "expert",
    projects: ["ozon-warehouse-search", "wedo-agency-startups"],
    description: "Query optimization, migrations, full-text search",
  },
  {
    id: "elasticsearch",
    name: "ElasticSearch",
    category: "infrastructure",
    years: 2,
    level: "proficient",
    projects: ["ozon-warehouse-search"],
    description: "Custom analyzers, fuzzy matching, index management",
  },

  // AI
  {
    id: "computer-vision",
    name: "Computer Vision",
    category: "ai",
    years: 2,
    level: "proficient",
    projects: ["infineon-parking-guidance"],
    description: "ANPR, occupancy detection, embedded edge inference",
  },
  {
    id: "llm-integration",
    name: "LLM Integration",
    category: "ai",
    years: 2,
    level: "proficient",
    projects: ["wedo-agency-startups"],
    description: "Prompt engineering, GPT-3/4 APIs, RAG patterns",
  },

  // Languages (programming languages not covered above)
  {
    id: "c",
    name: "C",
    category: "backend",
    years: 2,
    level: "proficient",
    projects: ["infineon-parking-guidance"],
    description: "Embedded firmware, resource-constrained systems",
  },
];

export const CATEGORY_LABELS: Record<SkillCategory, string> = {
  backend: "Backend",
  frontend: "Frontend",
  infrastructure: "Infrastructure",
  ai: "AI / ML",
  languages: "Languages",
};

export const CATEGORY_COLORS: Record<SkillCategory, string> = {
  backend: "#3b82f6",
  frontend: "#8b5cf6",
  infrastructure: "#10b981",
  ai: "#f59e0b",
  languages: "#ef4444",
};

export const LEVEL_LABELS: Record<Skill["level"], string> = {
  familiar: "Familiar",
  proficient: "Proficient",
  expert: "Expert",
};
