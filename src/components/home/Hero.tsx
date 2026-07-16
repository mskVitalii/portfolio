"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Mail, Send, FileDown, MapPin, Languages } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { LinkedinIcon, GithubIcon } from "@/components/icons/SocialIcons";
import { getSocialLink } from "@/data/social";

type IconProps = { className?: string };

const SOCIAL_LINKS: {
  labelKey: string;
  href: string;
  Icon: (p: IconProps) => React.ReactElement;
  variant: "default" | "outline" | "ghost";
  external?: boolean;
}[] = [
  { labelKey: "LinkedIn",  href: getSocialLink("linkedin").href, Icon: LinkedinIcon, variant: "default", external: true },
  { labelKey: "Email",     href: getSocialLink("email").href, Icon: ({ className }) => <Mail className={className} />, variant: "outline" },
  { labelKey: "GitHub",    href: getSocialLink("github").href, Icon: GithubIcon, variant: "outline", external: true },
  { labelKey: "Telegram",  href: getSocialLink("telegram").href, Icon: ({ className }) => <Send className={className} />, variant: "outline", external: true },
];

export function Hero() {
  const t = useTranslations("Hero");
  const tCommon = useTranslations("Common");

  return (
    <section className="min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center text-center px-4 py-16 relative">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-3xl w-full"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          {tCommon("siteName")}
        </h1>

        <p className="mt-4 text-xl md:text-2xl text-muted-foreground font-medium">
          {t("role")}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-sm">
            <MapPin className="h-3.5 w-3.5" />
            Chemnitz, Germany
          </Badge>
          <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-sm">
            <Languages className="h-3.5 w-3.5" />
            EN · DE · RU
          </Badge>
        </div>

        <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {t("tagline")}{" "}
          <span className="text-foreground font-medium">{t("taglineHighlight")}</span>
          {t("taglineEnd")}
          {" "}{t("experience")}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {SOCIAL_LINKS.map(({ labelKey, href, Icon, variant, external }) => (
            <a
              key={labelKey}
              href={href}
              className={cn(buttonVariants({ variant }))}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <Icon className="h-4 w-4 mr-2" />
              {labelKey}
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
            {t("downloadCv")}
          </a>
          <Link href="/about" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
            {t("aboutLink")}
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        className="absolute bottom-8 text-muted-foreground text-sm"
      >
        {t("scrollHint")}
      </motion.div>
    </section>
  );
}
