"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Undo2 } from "lucide-react";
import Image from "next/image";

interface GalleryImage {
  src: string;
}

interface InteractiveListItemProps {
  name: string;
  index: number;
  logo?: string;
  images?: (string | GalleryImage)[];
  isExpanded?: boolean;
  onClick?: () => void;
}

const getImageSrc = (img: string | GalleryImage): string => {
  if (typeof img === "string") return img;
  return img.src;
};

export function InteractiveListItem({ name, index, logo, images = [], isExpanded = false, onClick }: InteractiveListItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isActive = isMobile ? isExpanded : isHovered || isExpanded;

  const previewImages = images.slice(0, 3);

  return (
    <div className="relative w-full py-4 lg:py-6 border-t border-black/10 cursor-pointer overflow-hidden bg-white" onMouseEnter={() => !isMobile && setIsHovered(true)} onMouseLeave={() => !isMobile && setIsHovered(false)} onClick={onClick}>
      {/* gradient background */}
      <motion.div className="absolute inset-0 z-0" style={{ background: "var(--gradient-primary)" }} initial={{ y: "100%" }} animate={{ y: isActive ? "0%" : "100%" }} transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }} />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 lg:gap-0 max-w-7xl mx-auto">
        <div className="flex flex-col gap-1">
          {logo && (
            <div className="relative shrink-0" style={{ width: "clamp(5rem, 8vw + 2rem, 10rem)", height: "clamp(3.5rem, 5vw + 1.5rem, 6rem)" }}>
              <Image src={logo} alt={`${name} logo`} fill className={`object-contain transition-all duration-300 ${isActive ? "brightness-0 invert" : ""}`} />
            </div>
          )}
          <div className="relative overflow-hidden" style={{ height: "clamp(3rem, 4vw + 1.5rem, 5rem)" }}>
            <motion.div animate={{ y: isActive ? "-50%" : "0%" }} transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }} className="flex flex-col">
              <span className="font-bw-gradual font-bold text-black/80 whitespace-nowrap flex items-center" style={{ fontSize: "clamp(2.25rem, 4vw + 1rem, 6rem)", height: "clamp(3rem, 4vw + 1.5rem, 5rem)" }}>
                {name}
              </span>
              <span className="font-bw-gradual font-bold text-white whitespace-nowrap flex items-center" style={{ fontSize: "clamp(2.25rem, 4vw + 1rem, 6rem)", height: "clamp(3rem, 4vw + 1.5rem, 5rem)" }}>
                {name}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Right side - Card stack with See case overlay */}
        <div className="hidden lg:flex relative w-64 overflow-visible" style={{ height: "clamp(5rem, 6vw + 2.5rem, 8rem)" }}>
          {/* Card stack - Framer style */}
          {previewImages.map((img, i) => {
            const offset = 8; // percentage
            const scaleStep = 0.06;
            const dimStep = 0.15;
            const brightness = Math.max(0.1, 1 - i * dimStep);
            const baseZ = previewImages.length - i;
            const isFront = i === 0;

            return (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-lg overflow-hidden"
                style={{ zIndex: baseZ }}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isActive ? 1 : 0,
                  top: isActive ? `${i * -offset}%` : 0,
                  scale: 1 - i * scaleStep,
                  filter: `brightness(${brightness})`,
                  y: isActive ? 0 : 20,
                }}
                transition={{
                  type: "spring",
                  stiffness: 170,
                  damping: 26,
                }}
              >
                {getImageSrc(img) ? (
                  <motion.div className="absolute inset-0" animate={{ scale: isFront && isExpanded ? 1.1 : 1 }} transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}>
                    <Image src={getImageSrc(img)} alt={`Preview ${i + 1}`} fill className="object-cover" sizes="256px" />
                  </motion.div>
                ) : (
                  <div className="absolute inset-0 bg-gray-200" />
                )}

                {/* Overlay with See case / Close window - only on front card */}
                {isFront && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="relative overflow-hidden h-7">
                      <motion.div animate={{ y: isExpanded ? "-50%" : "0%" }} transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }} className="flex flex-col">
                        <span className="text-white text-base font-semibold h-7 flex items-center gap-2 drop-shadow-md">
                          See case
                          <Undo2 className="w-4 h-4 rotate-180 -scale-x-100" />
                        </span>
                        <span className="text-white text-base font-semibold h-7 flex items-center drop-shadow-md">Close window</span>
                      </motion.div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
