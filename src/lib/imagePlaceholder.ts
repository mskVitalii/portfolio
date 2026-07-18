/**
 * Generic shimmer placeholder for `next/image`'s `placeholder="blur"`. Gallery
 * images are referenced by runtime string path (not static imports), so Next
 * can't auto-generate a real per-image blurDataURL — this neutral gradient
 * fills that gap without a build-time image-processing step (no `sharp`/
 * `plaiceholder` dependency). It's stretched/blurred to fit each image box,
 * so its own aspect ratio doesn't need to match.
 */
export const SHIMMER_BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3MDAiIGhlaWdodD0iNDc1IiB2aWV3Qm94PSIwIDAgNzAwIDQ3NSI+PHJlY3Qgd2lkdGg9IjcwMCIgaGVpZ2h0PSI0NzUiIGZpbGw9IiM4ODg4ODgzMyIvPjxyZWN0IHdpZHRoPSI3MDAiIGhlaWdodD0iNDc1IiBmaWxsPSJ1cmwoI2cpIi8+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIj48c3RvcCBzdG9wLWNvbG9yPSIjODg4ODg4MzMiIG9mZnNldD0iMjAlIi8+PHN0b3Agc3RvcC1jb2xvcj0iIzg4ODg4ODY2IiBvZmZzZXQ9IjUwJSIvPjxzdG9wIHN0b3AtY29sb3I9IiM4ODg4ODgzMyIgb2Zmc2V0PSI3MCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48L3N2Zz4=";

/** How many of the first (currently visible) gallery photos to eagerly preload
 * at lightbox resolution, so opening one of them feels instant instead of
 * triggering a fresh fetch of the larger `_next/image` variant. */
export const GALLERY_PRELOAD_COUNT = 3;
