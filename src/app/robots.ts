import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/seo";

// Vercel preview/branch deployments run with VERCEL_ENV set to "preview" (or
// unset locally); only the production deployment should be crawlable.
const isProduction = process.env.VERCEL_ENV === "production";

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/*/og",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
