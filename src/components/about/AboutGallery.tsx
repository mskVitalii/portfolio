import { getTranslations } from "next-intl/server";
import { ABOUT_GALLERY, type GalleryTag } from "@/data/aboutGallery";
import { AboutGalleryClient } from "@/components/about/AboutGalleryClient";

const MAP_COUNTRY_IDS: Record<string, GalleryTag | "russia" | "montenegro" | "italy" | "uzbekistan" | "turkey"> = {
  "643": "russia",
  "499": "montenegro",
  "380": "italy",
  "276": "germany",
  "203": "czechia",
  "528": "netherlands",
  "40": "austria",
  "724": "spain",
  "860": "uzbekistan",
  "792": "turkey",
};

const FILTERABLE_COUNTRY_TAGS: GalleryTag[] = ["germany", "czechia", "austria", "spain", "netherlands"];

const INTEREST_TAG_KEYS = ["chess", "cycling", "hiking", "lindyHop", "hema"] as const;

export async function AboutGallery() {
  const t = await getTranslations("AboutPage");
  const altFallback = t("galleryPhotoAlt");

  const gridPhotos = ABOUT_GALLERY.filter((photo) => !photo.hasFace).map((photo) => ({
    id: photo.id,
    src: photo.src,
    width: photo.width,
    height: photo.height,
    orientation: photo.orientation,
    caption: t(`gallery.captions.${photo.id}` as "gallery.captions.about-001") || altFallback,
    tags: photo.tags,
  }));

  const tinderPhotos = ABOUT_GALLERY.filter((photo) => photo.hasFace).map((photo) => ({
    id: photo.id,
    src: photo.src,
    width: photo.width,
    height: photo.height,
    orientation: photo.orientation,
    caption: t(`gallery.captions.${photo.id}` as "gallery.captions.about-001") || altFallback,
    bio: t(`gallery.tinderBios.${photo.id}` as "gallery.tinderBios.about-001"),
    tags: photo.tags.map((tag) => t(`gallery.tags.${tag}` as "gallery.tags.travel")),
  }));

  const countryThumbnails: Partial<Record<GalleryTag, string>> = {};
  for (const tag of FILTERABLE_COUNTRY_TAGS) {
    const match = ABOUT_GALLERY.find((photo) => photo.tags.includes(tag));
    if (match) countryThumbnails[tag] = match.src;
  }

  const countries = Object.entries(MAP_COUNTRY_IDS).map(([isoId, key]) => ({
    isoId,
    key,
    label: t(`travelMap.countries.${key}` as "travelMap.countries.germany"),
    thumbnail: FILTERABLE_COUNTRY_TAGS.includes(key as GalleryTag)
      ? countryThumbnails[key as GalleryTag]
      : undefined,
  }));

  const interestTags = INTEREST_TAG_KEYS.map((key) => t(`interests.${key}` as "interests.chess"));

  return (
    <AboutGalleryClient
      title={t("galleryTitle")}
      introLabel={t("gallery.introLabel")}
      interestTags={interestTags}
      mentorship={t("gallery.mentorship")}
      altFallback={altFallback}
      gridTitle={t("gallery.gridTitle")}
      openTinderLabel={t("gallery.openTinder")}
      tinderDialogTitle={t("gallery.tinderDialogTitle")}
      gridPhotos={gridPhotos}
      tinderPhotos={tinderPhotos}
      lightbox={{
        zoomAria: t("gallery.zoomAria"),
        closeAria: t("gallery.closeAria"),
        prevAria: t("gallery.prevAria"),
        nextAria: t("gallery.nextAria"),
      }}
      tinder={{
        instructions: t("gallery.tinder.instructions"),
        likeAria: t("gallery.tinder.likeAria"),
        passAria: t("gallery.tinder.passAria"),
        progressTemplate: t("gallery.tinder.progress"),
        restart: t("gallery.tinder.restart"),
        summaryTitle: t("gallery.tinder.summaryTitle"),
        summaryLikedTemplate: t("gallery.tinder.summaryLiked"),
        summarySkippedTemplate: t("gallery.tinder.summarySkipped"),
      }}
      travelMap={{
        title: t("travelMap.title"),
        subtitle: t("travelMap.subtitle"),
        allLabel: t("travelMap.allLabel"),
        countries,
      }}
    />
  );
}
