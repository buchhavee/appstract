import type { GalleryImage } from "./types";

// ===== Image Helpers =====

export const getImageSrc = (img: string | GalleryImage): string => {
  if (typeof img === "string") return img;
  return img.src;
};

export const normalizeImage = (img: string | GalleryImage): GalleryImage => {
  if (typeof img === "string") {
    return { src: img };
  }
  return img;
};

// ===== Animation Constants =====

export const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as const;

export const EASE_SUBTLE = [0.25, 0.4, 0.25, 1] as const;

export const TRANSITION_STANDARD = {
  duration: 0.4,
  ease: EASE_OUT,
} as const;

export const TRANSITION_GALLERY = {
  duration: 0.8,
  ease: EASE_OUT,
} as const;
