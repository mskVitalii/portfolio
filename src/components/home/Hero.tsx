"use client";

import { motion } from "motion/react";
import { Mail, Send, FileDown, MapPin, Languages } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type IconProps = { className?: string };

function LinkedinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GithubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

const SOCIAL_LINKS: {
  label: string;
  href: string;
  Icon: (p: IconProps) => React.ReactElement;
  variant: "default" | "outline" | "ghost";
  external?: boolean;
}[] = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/mskvitalii",
    Icon: LinkedinIcon,
    variant: "default",
    external: true,
  },
  {
    label: "Email",
    href: "mailto:msk.vitaly@gmail.com",
    Icon: ({ className }) => <Mail className={className} />,
    variant: "outline",
  },
  {
    label: "GitHub",
    href: "https://github.com/mskvitalii",
    Icon: GithubIcon,
    variant: "outline",
    external: true,
  },
  {
    label: "Telegram",
    href: "https://t.me/mskvitalii",
    Icon: ({ className }) => <Send className={className} />,
    variant: "outline",
    external: true,
  },
];

export function Hero() {
  return (
    <section className="min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center text-center px-4 py-16 relative">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-3xl w-full"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Vitalii Popov
        </h1>

        <p className="mt-4 text-xl md:text-2xl text-muted-foreground font-medium">
          Full-Stack Engineer · Distributed Systems · AI
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-sm">
            <MapPin className="h-3.5 w-3.5" />
            Berlin, Germany
          </Badge>
          <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-sm">
            <Languages className="h-3.5 w-3.5" />
            EN · DE · RU
          </Badge>
        </div>

        <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Full-stack engineer focused on building systems that create{" "}
          <span className="text-foreground font-medium">measurable business value</span>.
          5+ years across e-commerce, mobility, and AI.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {SOCIAL_LINKS.map(({ label, href, Icon, variant, external }) => (
            <a
              key={label}
              href={href}
              className={cn(buttonVariants({ variant }))}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <Icon className="h-4 w-4 mr-2" />
              {label}
            </a>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-3">
          <a
            href="/cv/vitalii-popov-cv.pdf"
            download="Vitalii_Popov_CV.pdf"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            <FileDown className="h-4 w-4 mr-2" />
            Download CV
          </a>
          <Link
            href="/about"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            About me →
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        className="absolute bottom-8 text-muted-foreground text-sm"
      >
        ↓ see impact
      </motion.div>
    </section>
  );
}
