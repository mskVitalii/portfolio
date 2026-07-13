"use client";

import { useTranslations } from "next-intl";
import { Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useViewMode } from "@/store/viewMode";

export function SkillsSwitchModePrompt() {
  const t = useTranslations("SkillsPage");
  const tMode = useTranslations("ViewMode");
  const { setMode } = useViewMode();

  return (
    <div className="rounded-xl border bg-card p-6 text-center">
      <Network className="h-6 w-6 text-muted-foreground mx-auto mb-3" />
      <h2 className="font-semibold mb-1">{t("switchModeTitle")}</h2>
      <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
        {t("switchModeBody")}
      </p>
      <div className="flex items-center justify-center gap-2">
        <Button variant="outline" size="sm" onClick={() => setMode("business")}>
          {tMode("business")}
        </Button>
        <Button variant="outline" size="sm" onClick={() => setMode("tech")}>
          {tMode("tech")}
        </Button>
      </div>
    </div>
  );
}
