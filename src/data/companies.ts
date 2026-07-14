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
];

export function getCompanyBundle(company?: string): CompanyBundle | undefined {
  return COMPANY_BUNDLES.find((c) => c.name === company);
}

export function getCompanyBundleBySlug(slug: string): CompanyBundle | undefined {
  return COMPANY_BUNDLES.find((c) => c.slug === slug);
}
