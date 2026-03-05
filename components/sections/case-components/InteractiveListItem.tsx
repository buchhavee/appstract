"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Undo2 } from "lucide-react";
import Image from "next/image";
import type { GalleryImage } from "./types";
import { getImageSrc, TRANSITION_STANDARD } from "./utils";

interface InteractiveListItemProps {
  name: string;
  index: number;
  logo?: string;
  images?: (string | GalleryImage)[];
  isExpanded?: boolean;
  onClick?: () => void;
}

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

  const logoHeight = "clamp(3rem, 4vw + 1rem, 4rem)";
  const textHeight = "clamp(3rem, 4vw + 1.5rem, 5rem)";
  const textSize = "clamp(2rem, 3vw + 1rem, 3.5rem)";
  const logoWidth = "clamp(8rem, 10vw + 2rem, 12rem)";

  return (
    <div className="relative w-full py-4 lg:py-6 px-4 md:px-8 lg:px-16 border-t border-black/10 cursor-pointer overflow-hidden bg-white" onMouseEnter={() => !isMobile && setIsHovered(true)} onMouseLeave={() => !isMobile && setIsHovered(false)} onClick={onClick}>
      {/* gradient background */}
      <motion.div className="absolute inset-0 z-0" style={{ background: "var(--gradient-primary)" }} initial={{ y: "100%" }} animate={{ y: isActive ? "0%" : "100%" }} transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }} />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-0 max-w-7xl mx-auto">
        {/* Logo with rolling effect - or text fallback */}
        {logo ? (
          <div className="relative overflow-hidden" style={{ height: logoHeight }}>
            <motion.div animate={{ y: isActive ? "-50%" : "0%" }} transition={TRANSITION_STANDARD} className="flex flex-col">
              {/* Normal logo */}
              <div className="relative shrink-0" style={{ width: logoWidth, height: logoHeight }}>
                <Image src={logo} alt={`${name} logo`} fill className="object-contain object-left" />
              </div>
              {/* White/inverted logo */}
              <div className="relative shrink-0" style={{ width: logoWidth, height: logoHeight }}>
                <Image src={logo} alt={`${name} logo`} fill className="object-contain object-left brightness-0 invert" />
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="relative overflow-hidden" style={{ height: textHeight }}>
            <motion.div animate={{ y: isActive ? "-50%" : "0%" }} transition={TRANSITION_STANDARD} className="flex flex-col">
              <span className="font-bw-gradual font-bold text-black/80 whitespace-nowrap flex items-center" style={{ fontSize: textSize, height: textHeight }}>
                {name}
              </span>
              <span className="font-bw-gradual font-bold text-white whitespace-nowrap flex items-center" style={{ fontSize: textSize, height: textHeight }}>
                {name}
              </span>
            </motion.div>
          </div>
        )}

        {/* Right side - Card stack with See case overlay */}
        <div className="hidden lg:flex relative w-64" style={{ height: "clamp(5rem, 6vw + 2.5rem, 8rem)" }}>
          {/* Clip container - clips bottom extended to container edge */}
          <div className="absolute inset-0" style={{ clipPath: "inset(-50% -50% -100% -50%)" }}>
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
                  className="absolute inset-0 rounded-lg overflow-hidden bg-white"
                  style={{ zIndex: baseZ }}
                  initial={{ y: "200%" }}
                  animate={{
                    top: isHovered ? `${i * -offset}%` : 0,
                    scale: 1 - i * scaleStep,
                    y: isHovered ? 0 : "200%",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 170,
                    damping: 26,
                    delay: isHovered ? (previewImages.length - 1 - i) * 0.05 : i * 0.03,
                  }}
                >
                  {getImageSrc(img) ? (
                    <motion.div className="absolute inset-0" animate={{ scale: isFront && isExpanded ? 1.1 : 1 }} transition={TRANSITION_STANDARD}>
                      <Image src={getImageSrc(img)} alt={`Preview ${i + 1}`} fill className="object-cover" sizes="256px" />
                    </motion.div>
                  ) : (
                    <div className="absolute inset-0 bg-gray-200" />
                  )}

                  {/* Black overlay on all cards */}
                  <div className="absolute inset-0 bg-black/20" />

                  {isFront && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative overflow-hidden h-7 bg-black rounded-full px-4">
                        <motion.div animate={{ y: isExpanded ? "-50%" : "0%" }} transition={TRANSITION_STANDARD} className="flex flex-col">
                          <span className="text-white text-sm font-semibold h-7 flex items-center gap-2">
                            See case
                            <Undo2 className="w-4 h-4 rotate-180 -scale-x-100" />
                          </span>
                          <span className="text-white text-sm font-semibold h-7 flex items-center">Close window</span>
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
    </div>
  );
}
