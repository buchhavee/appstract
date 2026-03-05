"use client";

import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { CaseGallery } from "./CaseGallery";
import type { ExpandedContent } from "./types";

interface CaseExpandedContentProps {
  content: ExpandedContent;
  onClose: () => void;
}

export function CaseExpandedContent({ content, onClose }: CaseExpandedContentProps) {
  return (
    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="overflow-hidden bg-neutral-50">
      <div className="px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Content */}
          <div className="flex flex-col gap-5">
            <h3 className="font-bw-gradual font-bold text-xl md:text-2xl lg:text-3xl text-black">{content.headline}</h3>
            {content.bullets.length > 0 && (
              <ul className="flex flex-col gap-3 text-sm md:text-base text-black/80 leading-relaxed list-disc list-outside pl-4">
                {content.bullets.map((bullet, bi) => (
                  <li key={bi}>{bullet}</li>
                ))}
              </ul>
            )}
            {content.stats.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-2">
                {content.stats.map((stat, si) => (
                  <div key={si} className="flex flex-col gap-1 bg-black/5 border border-black/10 rounded-xl px-4 py-3">
                    <span
                      className="font-bw-gradual font-bold text-lg md:text-xl bg-clip-text text-transparent"
                      style={{
                        backgroundImage: "linear-gradient(135deg, #6D5EFC, #4CC9F0)",
                      }}
                    >
                      {stat.value}
                    </span>
                    <span className="text-xs text-black/60">{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Gallery */}
          {content.images.length > 0 && (
            <div className="w-full">
              <CaseGallery images={content.images} />
            </div>
          )}
          {/* Close button */}
          <button onClick={onClose} className="mx-auto flex items-center justify-center w-10 h-10 rounded-full bg-black hover:bg-black/80 transition-colors cursor-pointer">
            <ChevronUp className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
