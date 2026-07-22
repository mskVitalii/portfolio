"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Play } from "lucide-react";

function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  return match?.[1] ?? null;
}

/** Click-to-play YouTube embed — ships only a thumbnail until clicked, so the
 * heavy YouTube iframe (and its scripts) never loads on page view. Mirrors
 * ProjectDocumentViewer's card chrome (header bar + open-in-new-tab link)
 * so embedded external content reads as one consistent pattern on the site. */
export function YouTubeEmbed({
  url,
  title,
  openInNewTabLabel,
}: {
  url: string;
  title: string;
  openInNewTabLabel: string;
}) {
  const [playing, setPlaying] = useState(false);
  const id = extractYouTubeId(url);
  if (!id) return null;

  return (
    <div className="mb-10 rounded-xl border bg-card overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b bg-muted/30">
        <span className="truncate text-sm font-medium">{title}</span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          {openInNewTabLabel}
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      <div className="relative aspect-video w-full bg-black">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={title}
            className="group absolute inset-0 h-full w-full cursor-pointer"
          >
            <Image
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
                <Play className="ml-1 h-6 w-6 fill-current" />
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
