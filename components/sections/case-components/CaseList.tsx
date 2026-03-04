"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { CaseData } from "./Case";
import { InteractiveListItem } from "./InteractiveListItem";
import { CaseGallery } from "./CaseGallery";

interface CaseListProps {
  cases: CaseData[];
  initialCount?: number;
}

export function CaseList({ cases, initialCount = 6 }: CaseListProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const hasMore = cases.length > initialCount;
  const initialCases = cases.slice(0, initialCount);
  const extraCases = cases.slice(initialCount);

  return (
    <div className="relative z-10 w-full bg-white overflow-hidden">
      {/* Cases List */}
      <div className="flex flex-col">
        {/* Always visible cases */}
        {initialCases.map((c, i) => (
          <motion.div
            key={c.name + i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.4, 0.25, 1],
              delay: i * 0.05,
            }}
          >
            <InteractiveListItem name={c.name} index={i} logo={c.logo} href={c.href} images={c.expandedContent?.images} isExpanded={expandedIndex === i} onClick={() => toggleExpand(i)} />

            {/* Expanded content */}
            <AnimatePresence>
              {expandedIndex === i && c.expandedContent && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="overflow-hidden bg-white">
                  <div className="px-4 md:px-6 lg:px-8 py-8 md:py-12">
                    <div className="flex flex-col gap-8 lg:gap-12 max-w-6xl mx-auto">
                      {/* Content */}
                      <div className="flex flex-col gap-5">
                        <h3 className="font-bw-gradual font-bold text-xl md:text-2xl lg:text-3xl text-black">{c.expandedContent.headline}</h3>
                        {c.expandedContent.bullets.length > 0 && (
                          <ul className="flex flex-col gap-3 text-sm md:text-base text-black/80 leading-relaxed list-disc list-outside pl-4">
                            {c.expandedContent.bullets.map((bullet, bi) => (
                              <li key={bi}>{bullet}</li>
                            ))}
                          </ul>
                        )}
                        {c.expandedContent.stats.length > 0 && (
                          <div className="flex flex-wrap gap-4 mt-2">
                            {c.expandedContent.stats.map((stat, si) => (
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
                      {c.expandedContent.images.length > 0 && (
                        <div className="w-full">
                          <CaseGallery images={c.expandedContent.images} />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {/* Extra cases with slide animation */}
        <AnimatePresence>
          {showAll &&
            extraCases.map((c, i) => {
              const actualIndex = initialCount + i;
              return (
                <motion.div
                  key={c.name + actualIndex}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.4, 0.25, 1],
                    delay: i * 0.08,
                  }}
                  className="overflow-hidden"
                >
                  <InteractiveListItem name={c.name} index={actualIndex} logo={c.logo} href={c.href} images={c.expandedContent?.images} isExpanded={expandedIndex === actualIndex} onClick={() => toggleExpand(actualIndex)} />

                  {/* Expanded content */}
                  <AnimatePresence>
                    {expandedIndex === actualIndex && c.expandedContent && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="overflow-hidden bg-white">
                        <div className="px-4 md:px-6 lg:px-8 py-8 md:py-12">
                          <div className="flex flex-col gap-8 lg:gap-12 max-w-6xl mx-auto">
                            {/* Content */}
                            <div className="flex flex-col gap-5">
                              <h3 className="font-bw-gradual font-bold text-xl md:text-2xl lg:text-3xl text-black">{c.expandedContent.headline}</h3>
                              {c.expandedContent.bullets.length > 0 && (
                                <ul className="flex flex-col gap-3 text-sm md:text-base text-black/80 leading-relaxed list-disc list-outside pl-4">
                                  {c.expandedContent.bullets.map((bullet, bi) => (
                                    <li key={bi}>{bullet}</li>
                                  ))}
                                </ul>
                              )}
                              {c.expandedContent.stats.length > 0 && (
                                <div className="flex flex-wrap gap-4 mt-2">
                                  {c.expandedContent.stats.map((stat, si) => (
                                    <div key={si} className="flex flex-col gap-1 bg-black/5 border border-black/10 rounded-xl px-4 py-3">
                                      <span
                                        className="font-bw-gradual font-bold text-lg md:text-xl bg-clip-text text-transparent"
                                        style={{
                                          backgroundImage: "linear-gradient(135deg, #6D5EFC, #4CC9F0)",
                                        }}
                                      >
                                        {stat.value}
                                      </span>
                                      <span className="text-xs text-black/40">{stat.label}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            {/* Gallery */}
                            {c.expandedContent.images.length > 0 && (
                              <div className="w-full">
                                <CaseGallery images={c.expandedContent.images} />
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
        </AnimatePresence>
      </div>

      {/* Bottom border */}
      <div className="h-px bg-black/10" />

      {/* Show more / Show less */}
      {hasMore && (
        <div className="flex justify-center py-6 md:py-8 bg-white">
          <motion.button
            onClick={() => {
              if (showAll) setExpandedIndex(null);
              setShowAll(!showAll);
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-black/20 text-sm font-medium text-black/60 hover:bg-black/10 hover:text-black transition-colors duration-300 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {showAll ? "Show less" : "Show more"}
            <motion.div animate={{ rotate: showAll ? 180 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} style={{ display: "flex", alignItems: "center" }}>
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </div>
      )}
    </div>
  );
}
