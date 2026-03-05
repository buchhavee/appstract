"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { InteractiveListItem } from "./InteractiveListItem";
import { CaseExpandedContent } from "./CaseExpandedContent";
import { EASE_SUBTLE } from "./utils";
import type { CaseData } from "./types";

export type { CaseData };

interface CaseListProps {
  cases: CaseData[];
  initialCount?: number;
}

export function CaseList({ cases, initialCount = 6 }: CaseListProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToCase = (index: number) => {
    // Small delay to let the animation start
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("smoothScrollTo", { detail: `[data-case-index="${index}"]` }));
    }, 50);
  };

  const toggleExpand = (index: number) => {
    if (expandedIndex === index) {
      // Closing - scroll back to the case item
      scrollToCase(index);
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  // Close expanded case when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setExpandedIndex(null);
      }
    };

    if (expandedIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expandedIndex]);

  const hasMore = cases.length > initialCount;
  const initialCases = cases.slice(0, initialCount);
  const extraCases = cases.slice(initialCount);

  return (
    <div ref={containerRef} className="relative z-10 w-full bg-white overflow-hidden rounded-xl border border-black/10 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      {/* Cases List */}
      <div className="flex flex-col">
        {/* Always visible cases */}
        {initialCases.map((c, i) => (
          <motion.div
            key={c.name + i}
            data-case-index={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              ease: EASE_SUBTLE,
              delay: i * 0.05,
            }}
          >
            <InteractiveListItem name={c.name} index={i} logo={c.logo} images={c.expandedContent?.images} isExpanded={expandedIndex === i} onClick={() => toggleExpand(i)} />

            {/* Expanded content */}
            <AnimatePresence>{expandedIndex === i && c.expandedContent && <CaseExpandedContent content={c.expandedContent} onClose={() => toggleExpand(i)} />}</AnimatePresence>
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
                  data-case-index={actualIndex}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: EASE_SUBTLE,
                    delay: i * 0.08,
                  }}
                  className="overflow-hidden"
                >
                  <InteractiveListItem name={c.name} index={actualIndex} logo={c.logo} images={c.expandedContent?.images} isExpanded={expandedIndex === actualIndex} onClick={() => toggleExpand(actualIndex)} />

                  {/* Expanded content */}
                  <AnimatePresence>{expandedIndex === actualIndex && c.expandedContent && <CaseExpandedContent content={c.expandedContent} onClose={() => toggleExpand(actualIndex)} />}</AnimatePresence>
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
