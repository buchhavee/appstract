"use client";

import { Tag } from "@/components/ui";
import casesData from "@/data/casescomponent.json";
import portfolioData from "@/data/cases.json";
import { ArrowUpRight, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useState } from "react";

function CaseGallery({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Image container */}
      <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden shadow-lg bg-neutral-lightest">
        {/* Placeholder images */}
        <AnimatePresence mode="wait">
          <motion.div key={current} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-neutral-lightest to-neutral-light/30 rounded-2xl">
            <span className="text-neutral-medium text-sm font-medium">Image {current + 1}</span>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 shadow-md flex items-center justify-center hover:text-white/50 transition-colors cursor-pointer z-10">
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 shadow-md flex items-center justify-center hover:text-white/50 transition-colors cursor-pointer z-10">
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2">
        {images.map((_, idx) => (
          <button key={idx} onClick={() => setCurrent(idx)} className={`rounded-full transition-all duration-300 cursor-pointer ${idx === current ? "w-6 h-2 bg-black" : "w-2 h-2 bg-black/40"}`} aria-label={`Go to image ${idx + 1}`} />
        ))}
      </div>
    </div>
  );
}

type Case = (typeof portfolioData.cases)[number];

function CaseItem({ c, i, expandedIndex, toggleExpand }: { c: Case; i: number; expandedIndex: number | null; toggleExpand: (i: number) => void }) {
  return (
    <>
      <button onClick={() => toggleExpand(i)} className="w-full flex flex-col lg:flex-row lg:items-center px-4 sm:px-6 md:px-10 lg:px-12 justify-between py-5 sm:py-6 md:py-8 lg:py-10 gap-3 sm:gap-4 lg:gap-6 transition-colors duration-300 cursor-pointer group bg-white text-black hover:bg-[#1c1c1c] hover:text-white!">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 lg:gap-8 flex-1">
          <span className="inline-flex items-center self-start sm:self-center order-first sm:order-last px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border text-[10px] sm:text-xs font-semibold transition-colors duration-300 whitespace-nowrap border-[#41423c] bg-[#eee] text-black group-hover:border-white group-hover:bg-linear-to-r group-hover:from-[#6D5EFC] group-hover:to-[#4CC9F0] group-hover:text-white">{c.tagLabel}</span>
          <div className="flex items-center justify-between w-full sm:w-auto order-last sm:order-first">
            <span className="font-bw-gradual font-bold text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl leading-tight text-left">{c.name}</span>
            <motion.div>{expandedIndex === i ? <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ml-2 sm:ml-3 shrink-0" /> : <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ml-2 sm:ml-3 shrink-0" />}</motion.div>
          </div>
        </div>
        {c.description && <p className="text-xs sm:text-sm md:text-base lg:text-lg font-normal leading-normal text-left lg:text-right max-w-none lg:max-w-md xl:max-w-xl transition-colors duration-300 group-hover:text-white">{c.description}</p>}
        <ArrowUpRight className="hidden lg:block w-8 h-8 xl:w-10 xl:h-10 p-1 ml-4 transition-opacity duration-300 bg-white rounded-full text-black shrink-0 opacity-0 group-hover:opacity-100" />
      </button>

      <AnimatePresence>
        {expandedIndex === i && c.expandedContent && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="overflow-hidden bg-white">
            <div className="h-px bg-[#000000]/20 w-3/4 mx-auto" />
            <div className="px-4 sm:px-6 md:px-10 lg:px-12 pb-8 md:pb-12 lg:pb-16">
              <div className="flex flex-col lg:flex-row pt-6 gap-8 lg:gap-12">
                <div className="flex flex-col gap-5 lg:w-3/5">
                  <h3 className="font-bw-gradual font-bold text-xl md:text-2xl lg:text-3xl text-black">{c.expandedContent.headline}</h3>
                  <ul className="flex flex-col gap-3 text-sm md:text-base text-neutral-medium leading-relaxed list-disc list-outside pl-4">
                    {c.expandedContent.bullets.map((bullet, bi) => (
                      <li key={bi}>{bullet}</li>
                    ))}
                  </ul>
                  {c.expandedContent.stats.length > 0 && (
                    <div className="flex flex-wrap gap-4 mt-2">
                      {c.expandedContent.stats.map((stat, si) => (
                        <div key={si} className="flex flex-col gap-1 bg-neutral-lightest border border-neutral-medium/20 rounded-xl px-4 py-3">
                          <span className="font-bw-gradual font-bold text-lg md:text-xl bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #6D5EFC, #4CC9F0)" }}>
                            {stat.value}
                          </span>
                          <span className="text-xs text-neutral-medium">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {c.expandedContent.images.length > 0 && (
                  <div className="lg:w-2/5">
                    <CaseGallery images={c.expandedContent.images} />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const INITIAL_COUNT = 3;

export default function Portfolio() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const hasMore = portfolioData.cases.length > INITIAL_COUNT;

  return (
    <motion.section id="cases" className="relative z-0 w-full flex flex-col items-center justify-center py-12 md:py-20 lg:py-28 bg-white" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-48 md:h-64 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(109,94,252,0.18) 0%, rgba(76,201,240,0.10) 50%, rgba(255,255,255,0) 100%)" }} />

      {/* Section Title */}
      <motion.div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-4 md:gap-8 mb-8 md:mb-16 px-4 md:px-8 lg:px-16" variants={fadeInUp}>
        <div className="flex flex-col items-center gap-4 md:gap-6 max-w-4xl text-center">
          <Tag>{casesData.tagline}</Tag>
          <h2 className="font-bw-gradual font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight text-black">
            How{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(152.57deg, #6D5EFC 0.1%, #4CC9F0 99.9%)" }}>
              {casesData.highlightedText}
            </span>{" "}
            is implemented in real{" "}
            <span className="hidden sm:inline">
              <br />
            </span>
            e-commerce environments
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-neutral-medium font-normal leading-normal">{casesData.description}</p>
        </div>
      </motion.div>

      {/* Cases List */}
      <div className="relative z-10 w-full flex flex-col gap-0 divide-y divide-[#000000]/20 bg-white overflow-hidden shadow-card">
        {portfolioData.cases.slice(0, INITIAL_COUNT).map((c, i) => (
          <motion.div key={c.name + i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1], delay: i * 0.1 }}>
            <CaseItem c={c} i={i} expandedIndex={expandedIndex} toggleExpand={toggleExpand} />
          </motion.div>
        ))}
        <AnimatePresence>
          {showAll && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="overflow-hidden divide-y divide-[#000000]/20">
              {portfolioData.cases.slice(INITIAL_COUNT).map((c, j) => {
                const i = INITIAL_COUNT + j;
                return (
                  <div key={c.name + i}>
                    <CaseItem c={c} i={i} expandedIndex={expandedIndex} toggleExpand={toggleExpand} />
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Show more / Show less */}
      {hasMore && (
        <motion.div className="relative z-10 mt-6 md:mt-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <button
            onClick={() => {
              if (showAll) setExpandedIndex(null);
              setShowAll(!showAll);
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-black/20 text-sm font-medium text-black hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer"
          >
            {showAll ? "Show less" : "Show more"}
            <motion.span animate={{ rotate: showAll ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown className="w-4 h-4" />
            </motion.span>
          </button>
        </motion.div>
      )}
    </motion.section>
  );
}
