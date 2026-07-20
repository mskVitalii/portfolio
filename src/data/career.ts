export type CareerEntry = {
  type: "work" | "education";
  period: string;
  start: number;
  end: number | null;
  role: string;
  org: string;
  orgType: string;
  location: string;
  description: string;
  achievements?: string[];
  stack?: string[];
};

export const CAREER: CareerEntry[] = [
  {
    type: "work",
    period: "09/2024 – present",
    start: 2024,
    end: null,
    role: "Full-Stack Developer",
    org: "Infineon Technologies AG",
    orgType: "Semiconductor manufacturing",
    location: "Dresden, Germany",
    description:
      "Building a Parking Guidance System that saves €480K/year vs. market alternatives. Embedded Computer Vision on C, backend in Python/C#, React frontend. Also built a barrier control app serving 8K users with 3K MAU.",
    achievements: ["€480K annual savings", "8K users · 3K MAU"],
    stack: ["Python", "C#", "C", "React", "Computer Vision", "JS/TS"],
  },
  {
    type: "education",
    period: "10/2023 – present",
    start: 2023,
    end: null,
    role: "Master's in Web Engineering",
    org: "Chemnitz University of Technology",
    orgType: "Academic",
    location: "Chemnitz, Germany",
    description:
      "Distributed systems, cloud applications, software service engineering, cybersecurity, model-driven software development. GPA 2.39.",
    stack: ["Go", "Redis", "MongoDB", "Svelte", "Cloud"],
  },
  {
    type: "work",
    period: "08/2023 – 07/2024",
    start: 2023,
    end: 2024,
    role: "Full-Stack Developer",
    org: "onlineTours",
    orgType: "Travel aggregator",
    location: "Remote",
    description:
      "Developed A/B testing business logic for SEO and UX that increased key metrics by 11.63%. Built new React + TypeScript UI components with Storybook, deployed on Docker & Kubernetes.",
    achievements: ["11.63% metric uplift"],
    stack: ["React", "TypeScript", "Tailwind", "Jotai", "Redux", "Docker", "K8s", "Redis", "Ruby on Rails"],
  },
  {
    type: "work",
    period: "07/2021 – 07/2023",
    start: 2021,
    end: 2023,
    role: "Backend Developer",
    org: "OZON Tech",
    orgType: "Enterprise e-commerce",
    location: "Moscow, Russia",
    description:
      "Go microservice searching 200M warehouse items in under 5 seconds using ElasticSearch and Kafka. Also built a C# barcode scanner integration with WebSockets + PostgreSQL that saved €86K.",
    achievements: ["200M items in <5s", "€86K saved"],
    stack: ["Go", "Kafka", "ElasticSearch", "Redis", "PostgreSQL", "Prometheus", "Grafana", "Docker", "K8s", "C#"],
  },
  {
    type: "work",
    period: "05/2020 – 06/2021",
    start: 2020,
    end: 2021,
    role: "Full-Stack Developer",
    org: "WeDo.agency",
    orgType: "Business consulting & development",
    location: "Remote",
    description:
      "Shipped 9 client products — AI tools, e-commerce platforms, real-time dashboards, Telegram bots — taking each from a client's idea to a delivered MVP.",
    achievements: ["9 products shipped", "€52K/year ad savings for client"],
    stack: ["Python", "React", "Next.js", "NestJS", "Angular", "Docker", "Firebase", "PostgreSQL"],
  },
  {
    type: "education",
    period: "09/2019 – 06/2023",
    start: 2019,
    end: 2023,
    role: "Bachelor's in Software Engineering",
    org: "Higher School of Economics",
    orgType: "Academic",
    location: "Moscow, Russia",
    description:
      "Algorithms, software architecture, databases, OS, QA, project management, Microsoft Azure Cloud. GPA 2.2.",
    stack: ["Java", "Python", "SQL", "Azure", "Algorithms"],
  },
];
