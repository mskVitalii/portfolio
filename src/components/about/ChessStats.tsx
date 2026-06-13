"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type TimeControl = "chess_blitz" | "chess_rapid" | "chess_bullet" | "chess_daily";

type ChessRating = {
  last: { rating: number; date: number };
  best: { rating: number; date: number; game?: string };
  record: { win: number; loss: number; draw: number };
};

type ChessStats = Partial<Record<TimeControl, ChessRating>>;

const TC_LABELS: Record<TimeControl, string> = {
  chess_bullet: "Bullet",
  chess_blitz: "Blitz",
  chess_rapid: "Rapid",
  chess_daily: "Daily",
};

const TC_EMOJI: Record<TimeControl, string> = {
  chess_bullet: "⚡",
  chess_blitz: "🔥",
  chess_rapid: "♟️",
  chess_daily: "📅",
};

const DISPLAYED: TimeControl[] = ["chess_bullet", "chess_blitz", "chess_rapid", "chess_daily"];
const USERNAME = "mskvitalii";

export function ChessStats() {
  const [stats, setStats] = useState<ChessStats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://api.chess.com/pub/player/${USERNAME}/stats`, {
      headers: { "User-Agent": "vitalii-portfolio-site/1.0" },
    })
      .then((r) => r.json())
      .then((data) => setStats(data as ChessStats))
      .catch(() => setError(true));
  }, []);

  if (error) return null;

  const loaded = stats !== null;

  return (
    <div className="mt-4 rounded-xl border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
        <div className="flex items-center gap-2">
          <span className="text-lg">♟️</span>
          <span className="font-semibold text-sm">Chess.com</span>
          <span className="text-xs text-muted-foreground">@{USERNAME}</span>
        </div>
        <a
          href={`https://chess.com/member/${USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0">
        {DISPLAYED.map((tc) => {
          const d = stats?.[tc];
          const rating = d?.last?.rating;
          const best = d?.best?.rating;
          const wins = d?.record?.win ?? 0;
          const losses = d?.record?.loss ?? 0;
          const draws = d?.record?.draw ?? 0;
          const total = wins + losses + draws;
          const winPct = total > 0 ? Math.round((wins / total) * 100) : null;

          return (
            <div key={tc} className="flex flex-col items-center justify-center py-4 px-3 gap-1">
              <span className="text-lg">{TC_EMOJI[tc]}</span>
              <span className="text-xs font-medium text-muted-foreground">{TC_LABELS[tc]}</span>
              <div className="flex flex-col items-center gap-1 w-full h-18.5 justify-center">
                {!loaded ? (
                  <>
                    <div className="h-8 w-14 rounded-md overflow-hidden relative bg-muted/50 border border-border/40">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_ease-in-out_infinite] bg-linear-to-r from-transparent via-white/35 to-transparent" />
                    </div>
                    <div className="h-3.5 w-14 rounded-sm overflow-hidden relative bg-muted/40 border border-border/30">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_ease-in-out_infinite_0.25s] bg-linear-to-r from-transparent via-white/30 to-transparent" />
                    </div>
                    <div className="h-5 w-16 rounded-full overflow-hidden relative bg-muted/40 border border-border/30">
                      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_ease-in-out_infinite_0.5s] bg-linear-to-r from-transparent via-white/30 to-transparent" />
                    </div>
                  </>
                ) : rating ? (
                  <>
                    <span className="text-2xl font-bold tabular-nums">{rating}</span>
                    {best && best > rating && (
                      <span className="text-[10px] text-muted-foreground">best {best}</span>
                    )}
                    {winPct !== null && (
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                        {winPct}% wins
                      </Badge>
                    )}
                  </>
                ) : (
                  <span className="text-sm text-muted-foreground">—</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
