"use client";

import { useTranslations } from "next-intl";
import { Mail, Send } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/icons/SocialIcons";
import { SOCIAL_LINKS, type SocialId } from "@/data/social";

type IconProps = { className?: string };

const ICONS: Record<SocialId, (p: IconProps) => React.ReactElement> = {
  email: ({ className }) => <Mail className={className} />,
  linkedin: LinkedinIcon,
  github: GithubIcon,
  telegram: ({ className }) => <Send className={className} />,
};

const DESCRIPTION_KEYS: Record<SocialId, "emailDescription" | "linkedinDescription" | "githubDescription" | "telegramDescription"> = {
  email: "emailDescription",
  linkedin: "linkedinDescription",
  github: "githubDescription",
  telegram: "telegramDescription",
};

export function ContactLinks() {
  const t = useTranslations("ContactLinks");

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {SOCIAL_LINKS.map(({ id, label, value, href }) => {
        const Icon = ICONS[id];
        return (
          <a
            key={id}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-4 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-all group"
          >
            <div className="mt-0.5 h-9 w-9 shrink-0 rounded-md bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm">{label}</p>
              <p className="text-sm text-primary truncate">{value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{t(DESCRIPTION_KEYS[id])}</p>
            </div>
          </a>
        );
      })}
    </div>
  );
}
