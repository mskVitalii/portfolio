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

export const EDUCATION_PROJECTS: Project[] = [
  {
    slug: "distributed-key-value-store",
    title: "Distributed Key-Value Store",
    company: "Chemnitz University of Technology",
    period: "2024",
    status: "archived",
    category: "education",
    tagline: "Raft consensus algorithm from scratch in Go",
    description: {
      hr: "Master's coursework project implementing a fault-tolerant distributed key-value store.",
      business: "Academic project demonstrating deep understanding of distributed systems consistency and fault tolerance — directly applicable to production database and caching layer design.",
      tech: "Raft consensus algorithm implemented in Go from scratch: leader election, log replication, snapshotting. gRPC for inter-node communication. Benchmarked against etcd.",
    },
    stack: ["Go", "gRPC", "Raft", "Docker"],
  },
  {
    slug: "cloud-native-todo-platform",
    title: "Cloud-Native Task Platform",
    company: "Chemnitz University of Technology",
    period: "2023",
    status: "archived",
    category: "education",
    tagline: "Microservices on Kubernetes with GitOps deployment",
    description: {
      hr: "Master's project building a cloud-native application using modern DevOps practices.",
      business: "End-to-end delivery of a production-grade microservices application — demonstrating skills relevant to cloud migration and containerized deployments.",
      tech: "Svelte frontend, Go + Node microservices, MongoDB, Redis cache. Deployed on Kubernetes with ArgoCD GitOps. Prometheus + Grafana observability stack.",
    },
    stack: ["Go", "Svelte", "MongoDB", "Redis", "Kubernetes", "ArgoCD", "Prometheus"],
  },
  {
    slug: "ml-text-classifier",
    title: "Multilingual Text Classifier",
    company: "Higher School of Economics",
    period: "2022",
    status: "archived",
    category: "education",
    tagline: "NLP pipeline classifying 50K+ Russian-language news articles",
    description: {
      hr: "Bachelor's graduation project in machine learning and natural language processing.",
      business: "Built an NLP classifier that automatically categorizes Russian-language news content — demonstrating early AI/ML skills applied to a real business problem.",
      tech: "Python + scikit-learn + BERT fine-tuning. Data pipeline with Pandas + NumPy. REST API via FastAPI. Azure ML for training experiments. F1 score 0.91 on test set.",
    },
    stack: ["Python", "BERT", "scikit-learn", "FastAPI", "Azure ML", "PostgreSQL"],
  },
  {
    slug: "e-commerce-platform-hse",
    title: "E-Commerce Platform",
    company: "Higher School of Economics",
    period: "2021",
    status: "archived",
    category: "education",
    tagline: "Full-stack marketplace built as team capstone project",
    description: {
      hr: "Second-year team project building a full e-commerce marketplace from scratch.",
      business: "Delivered a working product marketplace as a team of 4 — covering backend, frontend, payments integration, and basic analytics dashboard.",
      tech: "Java Spring Boot backend, React + TypeScript frontend, PostgreSQL, Docker Compose. CI/CD via GitHub Actions. Product catalog, cart, checkout, and order tracking.",
    },
    stack: ["Java", "Spring Boot", "React", "TypeScript", "PostgreSQL", "Docker"],
  },
];

export function getProject(slug: string): Project | undefined {
  return [...PROJECTS, ...EDUCATION_PROJECTS].find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured);
}
