"use client";

import { motion } from "framer-motion";
import { ChevronUp, Check } from "lucide-react";
import { CaseGallery } from "./CaseGallery";
import type { ExpandedContent } from "./types";

interface CaseExpandedContentProps {
  content: ExpandedContent;
  onClose: () => void;
}

export function CaseExpandedContent({ content, onClose }: CaseExpandedContentProps) {
  return (
    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="overflow-hidden bg-white">
      {/* Gradient top divider */}
      <div className="h-px w-full" style={{ background: "var(--gradient-primary)" }} />

      <div className="px-4 md:px-8 lg:px-16 py-10 md:py-14">
        <div className="flex flex-col gap-10 lg:gap-14 max-w-7xl mx-auto">
          {/* Content + Stats — two-column on desktop */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Left: Headline + Bullets */}
            <div className="flex flex-col gap-5 lg:flex-1">
              <h3 className="font-bw-gradual font-bold text-black tracking-tight leading-tight" style={{ fontSize: "clamp(1.5rem, 2vw + 0.75rem, 2.25rem)" }}>
                {content.headline}
              </h3>

              {content.bullets.length > 0 && (
                <ul className="flex flex-col gap-4">
                  {content.bullets.map((bullet, bi) => (
                    <li key={bi} className="flex gap-3 items-start">
                      <span
                        className="mt-1 flex items-center justify-center rounded-full shrink-0"
                        style={{
                          width: "1.25rem",
                          height: "1.25rem",
                          background: "var(--gradient-primary)",
                        }}
                      >
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </span>
                      <span className="text-neutral-medium leading-relaxed" style={{ fontSize: "var(--text-sm)" }}>
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Right: Stats */}
            {content.stats.length > 0 && (
              <div className="flex flex-row flex-wrap lg:flex-col gap-4 lg:w-72 lg:shrink-0">
                {content.stats.map((stat, si) => (
                  <motion.div
                    key={si}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.15 + si * 0.08 }}
                    className="flex flex-col gap-1.5 flex-1 min-w-32 rounded-2xl px-5 py-4 bg-white border border-black/6"
                    style={{
                      boxShadow: "0 2px 12px rgba(109, 94, 252, 0.06), 0 1px 4px rgba(0, 0, 0, 0.04)",
                    }}
                  >
                    <span className="gradient-text font-bw-gradual font-bold" style={{ fontSize: "clamp(1.5rem, 1.5vw + 0.75rem, 2rem)" }}>
                      {stat.value}
                    </span>
                    <span className="text-neutral-medium font-medium" style={{ fontSize: "var(--text-xs)" }}>
                      {stat.label}
                    </span>
                  </motion.div>
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
          <button
            onClick={onClose}
            className="group mx-auto flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-200 cursor-pointer border border-black/10 hover:border-black/20 bg-white hover:bg-neutral-50"
            style={{
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            <ChevronUp className="w-4 h-4 text-neutral-medium group-hover:text-black transition-colors" />
            <span className="text-sm font-medium text-neutral-medium group-hover:text-black transition-colors">Close</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
