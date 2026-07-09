"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Difficulty = "Easy" | "Medium" | "Hard";

type LeetCodeData = {
  ranking: number | null;
  solved: { difficulty: string; count: number }[];
};

const DIFFICULTIES: Difficulty[] = ["Easy", "Medium", "Hard"];

const DIFFICULTY_COLOR: Record<Difficulty, string> = {
  Easy: "text-emerald-500",
  Medium: "text-amber-500",
  Hard: "text-rose-500",
};

const USERNAME = "mskKote";

export function LeetCodeStats() {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/leetcode")
      .then((r) => {
        if (!r.ok) throw new Error("failed");
        return r.json();
      })
      .then((d) => setData(d as LeetCodeData))
      .catch(() => setError(true));
  }, []);

  if (error)
    return (
      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
          <div className="flex items-center gap-2">
            <span className="text-lg">🧩</span>
            <span className="font-semibold text-sm">LeetCode</span>
            <span className="text-xs text-muted-foreground">@{USERNAME}</span>
          </div>
          <a
            href={`https://leetcode.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="px-4 py-3 text-xs text-muted-foreground text-center">
          Stats unavailable — view profile on{" "}
          <a
            href={`https://leetcode.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground"
          >
            LeetCode
          </a>
        </div>
      </div>
    );

  const loaded = data !== null;
  const totalSolved = data?.solved.find((s) => s.difficulty === "All")?.count;

  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
        <div className="flex items-center gap-2">
          <span className="text-lg">🧩</span>
          <span className="font-semibold text-sm">LeetCode</span>
          <span className="text-xs text-muted-foreground">@{USERNAME}</span>
        </div>
        <a
          href={`https://leetcode.com/${USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-3 divide-x">
        {DIFFICULTIES.map((diff) => {
          const count = data?.solved.find((s) => s.difficulty === diff)?.count;

          return (
            <div key={diff} className="flex flex-col items-center justify-center py-4 px-3 gap-1">
              <span className={`text-xs font-medium ${DIFFICULTY_COLOR[diff]}`}>{diff}</span>
              <div className="flex flex-col items-center gap-1 w-full h-8 justify-center">
                {!loaded ? (
                  <div className="h-6 w-10 rounded-md overflow-hidden relative bg-muted/50 border border-border/40">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_ease-in-out_infinite] bg-linear-to-r from-transparent via-white/35 to-transparent" />
                  </div>
                ) : count !== undefined ? (
                  <span className="text-xl font-bold tabular-nums">{count}</span>
                ) : (
                  <span className="text-sm text-muted-foreground">—</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {loaded && (totalSolved !== undefined || data?.ranking) && (
        <div className="flex items-center justify-center gap-2 px-4 py-2 border-t bg-muted/20">
          {totalSolved !== undefined && (
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
              {totalSolved} solved
            </Badge>
          )}
          {data?.ranking && (
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
              rank #{data.ranking.toLocaleString()}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
