"use client";

import { useTranslations } from "next-intl";
import { Award, Globe, Cloud, Code } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CERTIFICATES, type Certificate } from "@/data/certificates";

const CATEGORY_CONFIG: Record<Certificate["category"], { labelKey: "certCategoryCloud" | "certCategoryLanguage" | "certCategoryDevelopment" | "certCategoryOther"; Icon: typeof Award; color: string }> = {
  cloud: { labelKey: "certCategoryCloud", Icon: Cloud, color: "text-blue-500" },
  language: { labelKey: "certCategoryLanguage", Icon: Globe, color: "text-emerald-500" },
  development: { labelKey: "certCategoryDevelopment", Icon: Code, color: "text-violet-500" },
  other: { labelKey: "certCategoryOther", Icon: Award, color: "text-amber-500" },
};

export function Certificates() {
  const t = useTranslations("EducationPage");

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      {CERTIFICATES.map((cert) => {
        const { Icon, color, labelKey } = CATEGORY_CONFIG[cert.category];
        const Wrapper = cert.credentialUrl ? "a" : "div";
        const wrapperProps = cert.credentialUrl
          ? { href: cert.credentialUrl, target: "_blank", rel: "noopener noreferrer" }
          : {};
        return (
          <Wrapper
            key={cert.title}
            {...wrapperProps}
            className="flex items-start gap-4 rounded-xl border bg-card p-4 hover:border-primary/50 transition-colors group"
          >
            <div className={`mt-0.5 shrink-0 ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors">
                {cert.title}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{cert.issuer}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="text-xs">
                  {cert.year}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {t(labelKey)}
                </Badge>
              </div>
            </div>
          </Wrapper>
        );
      })}
    </div>
  );
}
