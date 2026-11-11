import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vitalii-popov.dev"),
  title: {
    default: "Vitalii Popov — Full-Stack Engineer",
    template: "%s | Vitalii Popov",
  },
  description:
    "Full-stack engineer focused on building systems that create measurable business value. 5+ years across distributed systems, AI, and e-commerce at Infineon, OZON Tech, and beyond.",
  keywords: [
    "Full-Stack Engineer",
    "Full-Stack Developer",
    "Fullstack Developer",
    "Full Stack Developer",
    "Frontend Developer",
    "Front-End Developer",
    "Backend Developer",
    "Back-End Developer",
    "Software Engineer",
    "Web Developer",
    "Go Developer",
    "TypeScript Developer",
    "React Developer",
    "Distributed Systems Engineer",
    "AI Engineer",
    "Berlin",
    "Germany",
    "Vitalii Popov",
  ],
  authors: [{ name: "Vitalii Popov" }],
  creator: "Vitalii Popov",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vitalii-popov.dev",
    siteName: "Vitalii Popov",
    title: "Vitalii Popov — Full-Stack Engineer",
    description:
      "Full-stack engineer focused on building systems that create measurable business value.",
    images: [{ url: "/en/og", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vitalii Popov — Full-Stack Engineer",
    description:
      "Full-stack engineer focused on building systems that create measurable business value.",
    images: ["/en/og"],
  },
  robots:
    process.env.VERCEL_ENV === "production"
      ? {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large" },
        }
      : { index: false, follow: false },
};

// <html> is rendered by app/[locale]/layout.tsx so `lang` is correct in the
// server HTML for every locale (crawlers don't run the client-side fix-up).
// The root not-found page renders its own <html>.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
