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
    projects: ["infineon-parking-guidance", "wedo-ecommerce-bidder", "wedo-ai-video-dubbing", "wedo-telegram-bots"],
    description: "FastAPI, data pipelines, CV integrations, scripting",
  },
  {
    id: "csharp",
    name: "C#",
    category: "backend",
    years: 2,
    level: "proficient",
    projects: ["infineon-parking-guidance", "ozon-barcode-scanner"],
    description: "Device management, WebSocket integrations, .NET services",
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    years: 3,
    level: "proficient",
    projects: ["wedo-horsium-game"],
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
    projects: ["infineon-parking-guidance", "online-tours-ab", "ncahoots-admin-panel", "flyboots-store"],
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
    projects: ["wedo-ai-video-dubbing", "audioland-musicgen"],
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
    projects: ["ozon-warehouse-search", "online-tours-ab", "wedo-telegram-bots"],
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
    projects: ["ozon-warehouse-search", "online-tours-ab", "wedo-telegram-bots"],
    description: "Caching, session storage, pub/sub",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "infrastructure",
    years: 4,
    level: "expert",
    projects: ["ozon-barcode-scanner", "wedo-telegram-bots"],
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

  // Infrastructure — Deploy tooling
  {
    id: "helm",
    name: "Helm",
    category: "infrastructure",
    years: 2,
    level: "proficient",
    projects: ["ozon-warehouse-search"],
    description: "Kubernetes package manager — chart authoring, values overrides, release management",
  },
  {
    id: "github-actions",
    name: "GitHub Actions",
    category: "infrastructure",
    years: 3,
    level: "expert",
    projects: ["online-tours-ab", "wedo-telegram-bots"],
    description: "CI/CD pipelines, matrix builds, Docker image publishing, automated deploy workflows",
  },
  {
    id: "docker-registry",
    name: "Docker Registry",
    category: "infrastructure",
    years: 3,
    level: "proficient",
    projects: ["ozon-warehouse-search"],
    description: "Private image registry (GHCR, ECR, Harbor) — tagging strategy, layer caching",
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
    projects: ["wedo-shopify-ai-support", "wedo-ai-video-dubbing", "audioland-musicgen"],
    description: "Prompt engineering, GPT-3/4 APIs, RAG patterns",
  },
  {
    id: "rag",
    name: "RAG",
    category: "ai",
    years: 2,
    level: "proficient",
    projects: [],
    description: "Retrieval-Augmented Generation pipelines — chunking, embedding, hybrid search, re-ranking",
  },
  {
    id: "qdrant",
    name: "Qdrant",
    category: "ai",
    years: 1,
    level: "proficient",
    projects: [],
    description: "Vector database — collections, payload filtering, hybrid search",
  },
  {
    id: "embedding-models",
    name: "Embedding Models",
    category: "ai",
    years: 2,
    level: "proficient",
    projects: [],
    description: "text-embedding-ada-002, sentence-transformers, multilingual embeddings",
  },
  {
    id: "langchain",
    name: "LangChain",
    category: "ai",
    years: 1,
    level: "proficient",
    projects: [],
    description: "Chains, agents, document loaders, memory — Python and JS",
  },
  {
    id: "ollama",
    name: "Ollama",
    category: "ai",
    years: 1,
    level: "familiar",
    projects: [],
    description: "Local LLM inference — Llama 3, Mistral, Qwen; used for offline/private workloads",
  },
  {
    id: "mcp-server",
    name: "MCP Server",
    category: "ai",
    years: 1,
    level: "proficient",
    projects: [],
    description: "Model Context Protocol — building tool-use servers that expose functions to LLMs",
  },
  {
    id: "context-engineering",
    name: "Context Engineering",
    category: "ai",
    years: 2,
    level: "proficient",
    projects: [],
    description: "Prompt design, context window management, structured outputs, few-shot and chain-of-thought",
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    category: "ai",
    years: 2,
    level: "proficient",
    projects: [],
    description: "Transformers library, model hub, Inference API, fine-tuning pipelines",
  },
  {
    id: "claude-code",
    name: "Claude Code",
    category: "ai",
    years: 1,
    level: "expert",
    projects: [],
    description: "Anthropic Claude — API integration, agentic coding workflows, Claude Code CLI; certified",
  },
  {
    id: "copilot",
    name: "GitHub Copilot",
    category: "ai",
    years: 2,
    level: "expert",
    projects: [],
    description: "AI-assisted development — pair programming at scale, custom instructions",
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
