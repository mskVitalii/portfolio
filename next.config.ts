import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],
  images: {
    // Default is [75]; the Tinder-mode deck (TinderDeck.tsx) requests 90 for sharper photos.
    qualities: [75, 90],
  },
};

export default withNextIntl(nextConfig);
