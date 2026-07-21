"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ZoomIn, ChevronLeft, ChevronRight, Flame, X } from "lucide-react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog";
import { TinderDeck, type TinderPhoto, type TinderStrings } from "@/components/about/TinderDeck";
import { useAchievementsStore } from "@/store/achievements";
import { cn } from "@/lib/utils";
import { SHIMMER_BLUR_DATA_URL, GALLERY_PRELOAD_COUNT } from "@/lib/imagePlaceholder";

const GEO_URL = "/geo/countries-110m.json";
const VISITED_FILL = "#FD267A";
const ACTIVE_FILL = "#C4145A";
const LIGHTBOX_SIZES = "100vw";

const FULLSCREEN_DIALOG_CLASS =
  "inset-0 h-dvh w-dvw max-w-none translate-x-0 translate-y-0 place-items-center rounded-none border-none p-0 shadow-none ring-0 sm:max-w-none";

export interface GridPhotoView {
  id: string;
  src: string;
  width: number;
  height: number;
  orientation: "landscape" | "portrait";
  caption: string;
  tags: string[];
}

export interface CountryEntry {
  isoId: string;
  key: string;
  label: string;
  thumbnail?: string;
}

export interface TravelMapStrings {
  title: string;
  subtitle: string;
  allLabel: string;
  countries: CountryEntry[];
}

export interface LightboxStrings {
  zoomAria: string;
  closeAria: string;
  prevAria: string;
  nextAria: string;
}

interface AboutGalleryClientProps {
  title: string;
  intro: string;
  altFallback: string;
  gridTitle: string;
  openTinderLabel: string;
  tinderDialogTitle: string;
  gridPhotos: GridPhotoView[];
  tinderPhotos: TinderPhoto[];
  lightbox: LightboxStrings;
  tinder: TinderStrings;
  travelMap: TravelMapStrings;
}

export function AboutGalleryClient({
  title,
  intro,
  altFallback,
  gridTitle,
  openTinderLabel,
  tinderDialogTitle,
  gridPhotos,
  tinderPhotos,
  lightbox,
  tinder,
  travelMap,
}: AboutGalleryClientProps) {
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);
  const [tinderOpen, setTinderOpen] = useState(false);
  const [activeCountry, setActiveCountry] = useState<string | null>(null);
  const unlockAchievement = useAchievementsStore((s) => s.unlock);

  const handleTinderFinished = (liked: number) => {
    if (liked === 1) unlockAchievement("tinderFavorite");
    else if (liked > 1) unlockAchievement("tinderPolyamory");
  };

  const visibleGridPhotos = activeCountry
    ? gridPhotos.filter((photo) => photo.tags.includes(activeCountry))
    : gridPhotos;

  const zoomPhoto = zoomIndex === null ? null : visibleGridPhotos[zoomIndex];

  const showPrev = () =>
    setZoomIndex((i) =>
      i === null ? i : (i - 1 + visibleGridPhotos.length) % visibleGridPhotos.length
    );
  const showNext = () =>
    setZoomIndex((i) => (i === null ? i : (i + 1) % visibleGridPhotos.length));

  const toggleCountry = (key: string) =>
    setActiveCountry((cur) => (cur === key ? null : key));

  useEffect(() => {
    if (zoomPhoto === null) return;
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") showPrev();
      else if (e.key === "ArrowRight") showNext();
    };
    // Capture phase: Base UI's Dialog stops propagation of arrow keys during
    // the bubble phase, so a bubble-phase listener here would never fire.
    window.addEventListener("keydown", handleKeydown, true);
    return () => window.removeEventListener("keydown", handleKeydown, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoomPhoto === null]);

  const countryByIso = new Map(travelMap.countries.map((c) => [c.isoId, c]));

  return (
    <section className="mb-16">
      <h2 className="mb-3 text-2xl font-bold">{title}</h2>
      <p className="mb-6 max-w-2xl text-muted-foreground leading-relaxed">{intro}</p>

      {tinderPhotos.length > 0 && (
        <button
          type="button"
          onClick={() => setTinderOpen(true)}
          className="mb-10 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FD267A] to-[#FF6036] px-6 py-3 text-base font-semibold text-white shadow-md transition-transform hover:scale-105 sm:w-auto"
        >
          <Flame className="h-5 w-5" fill="currentColor" />
          {openTinderLabel}
        </button>
      )}

      {/* Travel map */}
      <div className="mb-12">
        <h3 className="mb-1 text-xl font-bold">{travelMap.title}</h3>
        <p className="mb-6 max-w-2xl text-muted-foreground leading-relaxed">{travelMap.subtitle}</p>

        <div className="rounded-2xl border overflow-hidden bg-muted/30">
          <ComposableMap
            projectionConfig={{ center: [45, 45], scale: 320 }}
            width={900}
            height={420}
            style={{ width: "100%", height: "auto" }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const country = countryByIso.get(geo.id as string);
                  const clickable = !!country?.thumbnail;
                  const isActive = !!country && activeCountry === country.key;
                  const fill = isActive ? ACTIVE_FILL : country ? VISITED_FILL : "var(--muted)";
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={fill}
                      stroke={isActive ? "var(--foreground)" : "var(--border)"}
                      strokeWidth={isActive ? 1.25 : 0.5}
                      onClick={() => clickable && country && toggleCountry(country.key)}
                      style={{
                        default: { outline: "none", cursor: clickable ? "pointer" : "default" },
                        hover: { outline: "none", fill, cursor: clickable ? "pointer" : "default" },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCountry(null)}
            className={cn(
              "rounded-full border px-3 py-1 text-sm transition-colors",
              activeCountry === null
                ? "border-foreground bg-foreground text-background"
                : "text-muted-foreground hover:border-foreground/50 hover:text-foreground"
            )}
          >
            {travelMap.allLabel}
          </button>
          {travelMap.countries.map((country) => {
            if (!country.thumbnail) {
              return (
                <span
                  key={country.isoId}
                  className="rounded-full border px-3 py-1 text-sm text-muted-foreground"
                >
                  {country.label}
                </span>
              );
            }
            const isActive = activeCountry === country.key;
            return (
              <button
                key={country.isoId}
                type="button"
                onClick={() => toggleCountry(country.key)}
                className={cn(
                  "flex items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-sm transition-colors",
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : "text-muted-foreground hover:border-foreground/50 hover:text-foreground"
                )}
              >
                <span className="relative h-6 w-6 overflow-hidden rounded-full bg-muted">
                  <Image src={country.thumbnail} alt="" fill sizes="24px" className="object-cover" />
                </span>
                {country.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="mb-16">
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {gridTitle}
        </h3>
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 [column-fill:balance]">
          {visibleGridPhotos.map((photo, i) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setZoomIndex(i)}
              aria-label={lightbox.zoomAria}
              className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-lg bg-muted text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Image
                src={photo.src}
                alt={photo.caption || altFallback}
                width={photo.width}
                height={photo.height}
                placeholder="blur"
                blurDataURL={SHIMMER_BLUR_DATA_URL}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/75 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                {photo.caption && (
                  <p className="p-3 text-sm text-white leading-snug">{photo.caption}</p>
                )}
              </div>
              <div className="pointer-events-none absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <ZoomIn className="h-4 w-4" />
              </div>
            </button>
          ))}
        </div>

        {/* Preload the lightbox-resolution variant of the first few visible photos
            — same `sizes`/dimensions as the lightbox Image below, so the browser
            fetches and caches the exact same `_next/image` URL ahead of time
            instead of on first open. Recomputes when the country filter changes,
            since that changes which photos are "first".
            Sized to an actual 100vw strip (not collapsed via `sr-only`) so the
            rendered width matches the declared `sizes="100vw"` — otherwise Next.js
            flags a (harmless but noisy) sizes-mismatch warning in dev. */}
        <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 overflow-hidden opacity-0">
          {visibleGridPhotos.slice(0, GALLERY_PRELOAD_COUNT).map((photo) => (
            <div key={photo.id} className="relative h-px w-full">
              <Image src={photo.src} alt="" fill sizes={LIGHTBOX_SIZES} priority />
            </div>
          ))}
        </div>
      </div>

      {tinderPhotos.length > 0 && (
        <Dialog open={tinderOpen} onOpenChange={setTinderOpen}>
          <DialogContent
            showCloseButton={false}
            className={cn(FULLSCREEN_DIALOG_CLASS, "bg-background")}
          >
            <DialogTitle className="sr-only">{tinderDialogTitle}</DialogTitle>
            <DialogClose
              aria-label={lightbox.closeAria}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-foreground/10 text-foreground backdrop-blur-sm transition-colors hover:bg-foreground/20"
            >
              <X className="h-5 w-5" />
            </DialogClose>
            <TinderDeck photos={tinderPhotos} strings={tinder} onFinished={handleTinderFinished} />
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={zoomPhoto !== null} onOpenChange={(open) => !open && setZoomIndex(null)}>
        <DialogContent
          showCloseButton={false}
          className={cn(FULLSCREEN_DIALOG_CLASS, "bg-black")}
          onClick={(e) => {
            if (e.target === e.currentTarget) setZoomIndex(null);
          }}
        >
          <DialogTitle className="sr-only">{zoomPhoto?.caption || altFallback}</DialogTitle>
          {zoomPhoto && (
            <div className="relative flex max-h-[100dvh] max-w-[100dvw] items-center justify-center">
              <Image
                key={zoomPhoto.id}
                src={zoomPhoto.src}
                alt={zoomPhoto.caption || altFallback}
                width={zoomPhoto.width}
                height={zoomPhoto.height}
                placeholder="blur"
                blurDataURL={SHIMMER_BLUR_DATA_URL}
                sizes={LIGHTBOX_SIZES}
                className="max-h-[92dvh] max-w-[96dvw] object-contain"
                priority
              />
              {zoomPhoto.caption && (
                <p className="absolute inset-x-0 bottom-0 bg-black/80 p-3 text-center text-sm text-white leading-snug">
                  {zoomPhoto.caption}
                </p>
              )}

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

              <button
                type="button"
                onClick={showPrev}
                aria-label={lightbox.prevAria}
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={showNext}
                aria-label={lightbox.nextAria}
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          )}
          <DialogClose
            aria-label={lightbox.closeAria}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
          >
            <X className="h-5 w-5" />
          </DialogClose>
        </DialogContent>
      </Dialog>
    </section>
  );
}
