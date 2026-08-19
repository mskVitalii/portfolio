"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HR_SKILLS_SECTIONS } from "@/data/skills";

const SECTION_LABEL_KEYS: Record<(typeof HR_SKILLS_SECTIONS)[number]["key"], string> = {
  mainStack: "hrSectionMainStack",
  databases: "hrSectionDatabases",
  frameworksBackend: "hrSectionFrameworksBackend",
  frameworksFrontend: "hrSectionFrameworksFrontend",
  os: "hrSectionOs",
  serverSide: "hrSectionServerSide",
  cicd: "hrSectionCicd",
  testing: "hrSectionTesting",
  technologies: "hrSectionTechnologies",
  approaches: "hrSectionApproaches",
  apiDocs: "hrSectionApiDocs",
  monitoring: "hrSectionMonitoring",
  aiMl: "hrSectionAiMl",
  software: "hrSectionSoftware",
};

export function SkillsHrCopyButton() {
  const t = useTranslations("SkillsPage");
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = async () => {
    const lines = HR_SKILLS_SECTIONS.map(
      (section) => `${t(SECTION_LABEL_KEYS[section.key])}: ${section.items}`
    );
    const text = [t("hrExportHeading"), "", ...lines].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — nothing to fall back to on a static site.
    }
  };

  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="font-semibold mb-1">{t("hrCopyTitle")}</h2>
      <p className="text-sm text-muted-foreground mb-4">{t("hrCopySubtitle")}</p>
      <Button variant="outline" size="sm" onClick={handleCopy}>
        {copied ? (
          <>
            <Check className="h-4 w-4" />
            {t("hrCopyButtonCopied")}
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            {t("hrCopyButton")}
          </>
        )}
      </Button>
    </div>
  );
}
