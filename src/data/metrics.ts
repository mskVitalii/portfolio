export type ImpactMetric = {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  labelKey: string;
  descriptionKey: string;
  company: string;
  projectHref: string;
  modeHighlight: ("hr" | "business" | "tech")[];
};

export const IMPACT_METRICS: ImpactMetric[] = [
  {
    end: 480,
    prefix: "€",
    suffix: "K",
    labelKey: "annualSavings",
    descriptionKey: "annualSavingsDesc",
    company: "Infineon",
    projectHref: "/projects",
    modeHighlight: ["business"],
  },
  {
    end: 8,
    suffix: "K",
    labelKey: "usersServed",
    descriptionKey: "usersServedDesc",
    company: "Infineon",
    projectHref: "/projects",
    modeHighlight: ["business", "hr"],
  },
  {
    end: 3,
    suffix: "K",
    labelKey: "monthlyActiveUsers",
    descriptionKey: "monthlyActiveUsersDesc",
    company: "Infineon",
    projectHref: "/projects",
    modeHighlight: ["business", "hr"],
  },
  {
    end: 11.63,
    suffix: "%",
    decimals: 2,
    labelKey: "metricUplift",
    descriptionKey: "metricUpliftDesc",
    company: "onlineTours",
    projectHref: "/projects",
    modeHighlight: ["business", "tech"],
  },
  {
    end: 17,
    suffix: "+",
    labelKey: "projectsShipped",
    descriptionKey: "projectsShippedDesc",
    company: "All companies",
    projectHref: "/projects",
    modeHighlight: ["hr", "business", "tech"],
  },
];
