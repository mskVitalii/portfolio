export type ProjectStatus = "active" | "archived" | "deprecated";
export type ProjectCategory = "work" | "education" | "hackathon" | "personal";

export interface ProjectImpact {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  company?: string;
  period: string;
  status: ProjectStatus;
  statusNote?: string;
  category: ProjectCategory;
  tagline: string;
  description: {
    hr: string;
    business: string;
    tech: string;
  };
  impact?: ProjectImpact[];
  stack: string[];
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    slug: "infineon-parking-guidance",
    title: "Parking Guidance System",
    company: "Infineon Technologies AG",
    period: "2024 – present",
    status: "active",
    category: "work",
    tagline: "Saves €480K/year vs. market alternatives",
    featured: true,
    description: {
      hr: "Full-Stack Developer owning the entire parking guidance system — from embedded C firmware on camera devices to a React dashboard. Part of a cross-functional team at Infineon's Dresden campus.",
      business:
        "Replaced a €480,000/year commercial parking guidance vendor with an in-house system. Built for 8,000 users on campus with 3,000 monthly active users. Real-time occupancy data drives parking decisions, reducing search time and CO₂.",
      tech: "Embedded Computer Vision in C for ANPR cameras, Python microservices on the backend, C# for device management, React + TypeScript SPA as the control dashboard. WebSocket-based real-time updates. Deployed on-premise Docker.",
    },
    impact: [
      { label: "Annual savings", value: "€480K" },
      { label: "Users", value: "8,000" },
      { label: "Monthly active", value: "3,000" },
    ],
    stack: ["Python", "C#", "C", "React", "TypeScript", "Computer Vision", "Docker", "WebSockets"],
  },
  {
    slug: "ozon-warehouse-search",
    title: "Warehouse Search Engine",
    company: "OZON Tech",
    period: "2021 – 2023",
    status: "archived",
    statusNote: "Project continues at OZON; left when relocating to Germany for Master's.",
    category: "work",
    tagline: "200M warehouse items searchable in under 5 seconds",
    featured: true,
    description: {
      hr: "Backend Developer on the warehouse search team at OZON — one of Russia's largest e-commerce platforms. Worked in a distributed team on high-throughput Go microservices.",
      business:
        "Enabled warehouse staff to search across 200M product items in under 5 seconds, cutting order-picking time significantly. A parallel barcode integration saved an additional €86K/year by replacing manual scanning workflows.",
      tech: "Go microservice with ElasticSearch full-text search and fuzzy matching, Kafka for event streaming, Redis for hot-path caching. C# barcode scanner integration with WebSockets + PostgreSQL. Prometheus + Grafana for observability. Deployed on Kubernetes.",
    },
    impact: [
      { label: "Items indexed", value: "200M" },
      { label: "Search latency", value: "<5 sec" },
      { label: "Cost savings", value: "€86K" },
    ],
    stack: ["Go", "ElasticSearch", "Kafka", "Redis", "PostgreSQL", "C#", "WebSockets", "Docker", "Kubernetes", "Prometheus", "Grafana"],
  },
  {
    slug: "online-tours-ab",
    title: "A/B Testing & UI Platform",
    company: "onlineTours",
    period: "2023 – 2024",
    status: "archived",
    statusNote: "Contract ended; moved to Infineon full-time.",
    category: "work",
    tagline: "11.63% uplift in key business metrics via experimentation",
    description: {
      hr: "Full-Stack Developer building A/B testing infrastructure and React component library at a travel aggregator serving millions of users.",
      business:
        "Designed and shipped A/B tests for SEO landing pages and booking flows that produced an 11.63% uplift in the primary conversion metric. Built a reusable component library that accelerated the front-end team's velocity.",
      tech: "React + TypeScript component library published via Storybook. Server-side A/B flag logic in Ruby on Rails. Jotai for local state, Redux for global state. Containerized with Docker, orchestrated on Kubernetes. Redis for session caching.",
    },
    impact: [
      { label: "Metric uplift", value: "11.63%" },
    ],
    stack: ["React", "TypeScript", "Tailwind", "Jotai", "Redux", "Ruby on Rails", "Docker", "Kubernetes", "Redis", "Storybook"],
  },
  {
    slug: "wedo-agency-startups",
    title: "13 Startups in 13 Months",
    company: "WeDo.agency",
    period: "2020 – 2021",
    status: "archived",
    statusNote: "Agency pivoted; products were client-owned and handed off.",
    category: "work",
    tagline: "Shipped 13 products end-to-end in 13 months",
    description: {
      hr: "Full-Stack Developer and team lead at a startup consultancy. Owned delivery of 13 products across AI tooling, e-commerce, real-time dashboards, and Telegram bots. Led a team of 3 on a Silicon Valley client project.",
      business:
        "13 shipped products across verticals. One client's ad automation system saved €52K/year in agency fees. Delivered an AI-powered admin dashboard for a Silicon Valley startup within a 6-week deadline.",
      tech: "Polyglot stack across projects: Python + FastAPI, React + Next.js, NestJS, Angular. Firebase for real-time features. PostgreSQL + Docker. Telegram Bot API for chatbot products. AI integrations with GPT-3 era models.",
    },
    impact: [
      { label: "Products shipped", value: "13" },
      { label: "Ad savings for client", value: "€52K/yr" },
    ],
    stack: ["Python", "React", "Next.js", "NestJS", "Angular", "Firebase", "PostgreSQL", "Docker", "FastAPI"],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured);
}
