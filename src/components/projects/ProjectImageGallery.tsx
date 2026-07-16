"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ZoomIn, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const FULLSCREEN_DIALOG_CLASS =
  "inset-0 h-dvh w-dvw max-w-none translate-x-0 translate-y-0 place-items-center rounded-none border-none p-0 shadow-none ring-0 sm:max-w-none";

export interface ProjectGalleryStrings {
  zoomAria: string;
  closeAria: string;
  prevAria: string;
  nextAria: string;
}

export function ProjectImageGallery({
  images,
  alt,
  strings,
}: {
  images: string[];
  alt: string;
  strings: ProjectGalleryStrings;
}) {
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);

  const showPrev = () =>
    setZoomIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
  const showNext = () => setZoomIndex((i) => (i === null ? i : (i + 1) % images.length));

  useEffect(() => {
    if (zoomIndex === null) return;
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") showPrev();
      else if (e.key === "ArrowRight") showNext();
    };
    // Capture phase: Base UI's Dialog stops propagation of arrow keys during
    // the bubble phase, so a bubble-phase listener here would never fire.
    window.addEventListener("keydown", handleKeydown, true);
    return () => window.removeEventListener("keydown", handleKeydown, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoomIndex === null]);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setZoomIndex(i)}
            aria-label={strings.zoomAria}
            className="group relative aspect-video rounded-lg overflow-hidden border bg-muted outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
              <ZoomIn className="h-6 w-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          </button>
        ))}
      </div>

      <Dialog open={zoomIndex !== null} onOpenChange={(open) => !open && setZoomIndex(null)}>
        <DialogContent showCloseButton={false} className={cn(FULLSCREEN_DIALOG_CLASS, "bg-black")}>
          <DialogTitle className="sr-only">{alt}</DialogTitle>
          {zoomIndex !== null && (
            <div className="relative flex h-[92dvh] w-[96dvw] max-w-5xl items-center justify-center">
              <Image
                key={images[zoomIndex]}
                src={images[zoomIndex]}
                alt={alt}
                fill
                className="object-contain"
                sizes="96vw"
                priority
              />

              <button
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                onClick={showPrev}
                className="absolute inset-y-0 left-0 w-1/2 cursor-w-resize"
              />
              <button
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                onClick={showNext}
                className="absolute inset-y-0 right-0 w-1/2 cursor-e-resize"
              />

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPrev}
                    aria-label={strings.prevAria}
                    className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    aria-label={strings.nextAria}
                    className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>
          )}
          <DialogClose
            aria-label={strings.closeAria}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
          >
            <X className="h-5 w-5" />
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}
