export interface CompanyBundle {
  /** Must match `Project.company` exactly for projects that belong to this bundle. */
  name: string;
  /** URL slug for the merged company case-study page: /projects/company/[slug]. */
  slug: string;
  blurb: {
    hr: string;
    business: string;
    tech: string;
  };
}

export const COMPANY_BUNDLES: CompanyBundle[] = [
  {
    name: "Infineon Technologies AG",
    slug: "infineon",
    blurb: {
      hr: "Infineon Technologies AG is a German semiconductor manufacturer — one of the largest chipmakers in Europe, serving automotive, industrial, and IoT markets.",
      business:
        "A publicly listed German semiconductor manufacturer, one of Europe's largest. This work replaced a commercial vendor system with an in-house solution to cut recurring costs.",
      tech: "Enterprise engineering environment at a large semiconductor manufacturer, spanning embedded computer vision, backend services, and production frontend tooling.",
    },
  },
  {
    name: "OZON Tech",
    slug: "ozon",
    blurb: {
      hr: "OZON is one of Russia's largest e-commerce platforms — think Amazon scale for Eastern Europe — employing thousands of engineers across warehousing, search, and logistics.",
      business:
        "OZON is one of Russia's largest e-commerce platforms — think Amazon scale for Eastern Europe — with a business model built on reselling logistics capacity and monetizing seller placement across the platform, rather than holding inventory itself. Its warehouse operations team manages inventory across multiple fulfilment centres, where every second of search latency across 200M SKUs has a direct operational cost.",
      tech: "Large-scale distributed backend serving one of Russia's largest online marketplaces (Amazon-scale for Eastern Europe) — high-throughput search, warehouse logistics, and fulfillment systems operating at national scale.",
    },
  },
  {
    name: "onlineTours",
    slug: "online-tours",
    blurb: {
      hr: "onlineTours is a remote-first travel aggregator for tours & hotels, running experimentation-driven product development across SEO and UX.",
      business:
        "onlineTours doesn't hold its own tour inventory — it resells traffic by aggregating tour & hotel offers from partner suppliers, and monetizes through partner placement across the platform. Every SEO and UX change ships behind an A/B test to protect and grow booking conversion across that aggregated inventory.",
      tech: "Legacy Ruby on Rails + React/Redux platform being incrementally modernized with a new TypeScript/Tailwind component library, deployed via GitLab CI/CD on Docker & Kubernetes.",
    },
  },
  {
    name: "egsha",
    slug: "egsha",
    blurb: {
      hr: "egsha is a business partner behind two small, hands-on e-commerce ventures — an iPhone refurbishment resale operation and a cross-border clothing resale store.",
      business:
        "A small-scale e-commerce partner spanning two ventures years apart: a first, short-lived iPhone resale business, and later a cross-border clothing store sourcing inventory from the Chinese marketplace Poizon.",
      tech: "Lightweight commerce builds — from spreadsheet-tracked inventory in the earliest venture to a full Next.js storefront with payments and shipping integrations in the later one.",
    },
  },
  {
    name: "WeDo.agency",
    slug: "wedo",
    blurb: {
      hr: "WeDo.agency is a remote business consulting and development studio — a one-year engagement covering 13 startups and client projects across AI, e-commerce, and internal tooling.",
      business:
        "A business consulting and development agency running many small, parallel client engagements rather than a single product — from AI-powered tools to e-commerce storefronts to internal ops dashboards.",
      tech: "Broad full-stack rotation across Python, Next.js, NestJS, React, Angular, Firebase, and PostgreSQL, shipping a new client project every few weeks.",
    },
  },
  {
    name: "dunlimited",
    slug: "dunlimited",
    blurb: {
      hr: "dunlimited is the client behind a suite of Telegram bots, commissioned during the WeDo.agency engagement.",
      business:
        "A client engagement delivered through WeDo.agency, focused on a production Telegram bot suite with its own monitoring and deployment pipeline.",
      tech: "Python (aiogram) bots backed by PostgreSQL, with a GitHub Actions CI/CD pipeline using Docker layer caching for ~10-second deploys, Minio for image storage, and Redis for auth tokens and user state.",
    },
  },
];

export function getCompanyBundle(company?: string): CompanyBundle | undefined {
  return COMPANY_BUNDLES.find((c) => c.name === company);
}

export function getCompanyBundleBySlug(slug: string): CompanyBundle | undefined {
  return COMPANY_BUNDLES.find((c) => c.slug === slug);
}
