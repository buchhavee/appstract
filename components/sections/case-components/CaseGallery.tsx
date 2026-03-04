"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  title?: string;
  description?: string;
}

interface CaseGalleryProps {
  images: (string | GalleryImage)[];
  autoPlaySpeed?: number;
  interactionDelay?: number;
}

const INITIAL_PROGRESS = 0;
const TRANSITION = { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const };
const NAV_BUTTON_CLASS = "absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white opacity-70 cursor-pointer transition-opacity duration-200 hover:opacity-100 z-20";

const normalizeImage = (img: string | GalleryImage): GalleryImage => {
  if (typeof img === "string") {
    return { src: img };
  }
  return img;
};

export function CaseGallery({ images, autoPlaySpeed = 8000, interactionDelay = 5000 }: CaseGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(INITIAL_PROGRESS);
  const [isDelayed, setIsDelayed] = useState(false);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const delayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isDelayedRef = useRef(false);
  const progressValueRef = useRef(INITIAL_PROGRESS);

  const normalizedImages = useMemo(() => images.map(normalizeImage), [images]);
  const imageCount = normalizedImages.length;

  useEffect(() => {
    setCurrentIndex(0);
    progressValueRef.current = INITIAL_PROGRESS;
    setProgress(INITIAL_PROGRESS);
  }, [images]);

  const clearDelayTimeout = () => {
    if (delayTimeoutRef.current) {
      clearTimeout(delayTimeoutRef.current);
      delayTimeoutRef.current = null;
    }
  };

  const cancelAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  const resetProgress = () => {
    progressValueRef.current = INITIAL_PROGRESS;
    setProgress(INITIAL_PROGRESS);
  };

  const startDelayedResume = () => {
    clearDelayTimeout();
    cancelAnimation();
    isDelayedRef.current = true;
    setIsDelayed(true);
    delayTimeoutRef.current = setTimeout(() => {
      isDelayedRef.current = false;
      setIsDelayed(false);
    }, interactionDelay);
  };

  const nextImage = () => {
    startDelayedResume();
    setCurrentIndex((prev) => (prev + 1) % imageCount);
    resetProgress();
  };

  const prevImage = () => {
    startDelayedResume();
    setCurrentIndex((prev) => (prev - 1 + imageCount) % imageCount);
    resetProgress();
  };

  const jumpToImage = (index: number) => {
    startDelayedResume();
    setCurrentIndex(index);
    resetProgress();
  };

  useEffect(() => {
    if (isDelayed) {
      cancelAnimation();
      return;
    }

    lastTimeRef.current = performance.now();
    let isAdvancing = false;

    const animate = (currentTime: number) => {
      if (isDelayedRef.current || isAdvancing) {
        if (!isDelayedRef.current) {
          animationRef.current = requestAnimationFrame(animate);
        }
        return;
      }

      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      const increment = (deltaTime / autoPlaySpeed) * 100;
      progressValueRef.current += increment;

      if (progressValueRef.current >= 100) {
        isAdvancing = true;
        progressValueRef.current = INITIAL_PROGRESS;
        setProgress(INITIAL_PROGRESS);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imageCount);
        requestAnimationFrame(() => {
          isAdvancing = false;
        });
      } else {
        setProgress(progressValueRef.current);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimation();
  }, [isDelayed, autoPlaySpeed, imageCount]);

  useEffect(() => {
    return () => clearDelayTimeout();
  }, []);

  if (normalizedImages.length === 0) {
    return <div className="flex items-center justify-center rounded-2xl bg-neutral-lightest text-neutral-medium h-full min-h-75">No images available</div>;
  }

  const currentImage = normalizedImages[currentIndex];

  return (
    <div className="relative w-full aspect-9/16 md:aspect-video rounded-2xl overflow-hidden shadow-lg bg-neutral-lightest">
      <AnimatePresence initial={false}>
        <motion.div key={currentIndex} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={TRANSITION}>
          <Image src={currentImage.src} alt={currentImage.title || `Slide ${currentIndex + 1}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority={currentIndex === 0} />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.2) 40%, transparent 100%)",
            }}
          />
          {(currentImage.title || currentImage.description) && (
            <div className="absolute bottom-12 left-4 right-4 z-10">
              {currentImage.title && <h4 className="text-white font-bw-gradual font-bold text-lg mb-1">{currentImage.title}</h4>}
              {currentImage.description && <p className="text-white/80 text-sm leading-relaxed">{currentImage.description}</p>}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="absolute top-3 right-3 z-20">
        <span className="text-white/80 text-xs font-medium bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
          {currentIndex + 1} / {normalizedImages.length}
        </span>
      </div>

      <button onClick={prevImage} className={`${NAV_BUTTON_CLASS} left-4`}>
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={nextImage} className={`${NAV_BUTTON_CLASS} right-4`}>
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-4 left-4 right-4 flex gap-1 z-20">
        {normalizedImages.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-white/30 rounded-full cursor-pointer overflow-hidden" onClick={() => jumpToImage(index)}>
            <div
              className={`h-full rounded-full transition-none ${index === currentIndex ? "bg-white" : "bg-white/00"}`}
              style={{
                width: index === currentIndex ? `${progress}%` : index < currentIndex ? "100%" : "0%",
                transition: index === currentIndex ? "none" : "width 0.3s ease",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
