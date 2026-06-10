export type ImpactMetric = {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  description: string;
  company: string;
  projectHref: string;
  modeHighlight: ("hr" | "business" | "tech")[];
};

export const IMPACT_METRICS: ImpactMetric[] = [
  {
    end: 480,
    prefix: "€",
    suffix: "K",
    label: "Annual savings",
    description: "Parking Guidance System vs. market alternatives",
    company: "Infineon",
    projectHref: "/projects",
    modeHighlight: ["business"],
  },
  {
    end: 8,
    suffix: "K",
    label: "Users served",
    description: "Barrier control application",
    company: "Infineon",
    projectHref: "/projects",
    modeHighlight: ["business", "hr"],
  },
  {
    end: 3,
    suffix: "K",
    label: "Monthly active users",
    description: "Parking Guidance System, MAU",
    company: "Infineon",
    projectHref: "/projects",
    modeHighlight: ["business", "hr"],
  },
  {
    end: 200,
    suffix: "M",
    label: "Items indexed",
    description: "Warehouse search in under 5 seconds",
    company: "OZON Tech",
    projectHref: "/projects",
    modeHighlight: ["tech"],
  },
  {
    end: 11.63,
    suffix: "%",
    decimals: 2,
    label: "Metric uplift",
    description: "A/B testing in SEO and UX",
    company: "onlineTours",
    projectHref: "/projects",
    modeHighlight: ["business", "tech"],
  },
];
