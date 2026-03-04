"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { CaseGallery } from "./CaseGallery";

interface GalleryImage {
  src: string;
  title?: string;
  description?: string;
}

export interface CaseData {
  name: string;
  tagLabel: string;
  logo?: string;
  description?: string;
  href?: string;
  expandedContent?: {
    headline: string;
    bullets: string[];
    stats: { value: string; label: string }[];
    images: (string | GalleryImage)[];
  };
}

interface CaseProps {
  data: CaseData;
  index: number;
  isExpanded: boolean;
  onToggle: (index: number) => void;
}

export function Case({ data, index, isExpanded, onToggle }: CaseProps) {
  return (
    <>
      <button onClick={() => onToggle(index)} className="w-full flex flex-col lg:flex-row lg:items-center px-4 sm:px-6 md:px-10 lg:px-12 justify-between py-5 sm:py-6 md:py-8 lg:py-10 gap-3 sm:gap-4 lg:gap-6 transition-colors duration-300 cursor-pointer group bg-white text-black hover:bg-[#1c1c1c] hover:text-white!">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 lg:gap-8 flex-1">
          <span className="inline-flex items-center self-start sm:self-center order-first sm:order-last px-1.5 sm:px-2 py-0.5 rounded-full border text-[8px] sm:text-[10px] font-semibold transition-colors duration-300 whitespace-nowrap border-[#41423c] bg-[#eee] text-black group-hover:border-white group-hover:bg-linear-to-r group-hover:from-[#6D5EFC] group-hover:to-[#4CC9F0] group-hover:text-white">{data.tagLabel}</span>
          <div className="flex items-center justify-between w-full sm:w-auto order-last sm:order-first">
            <span className="flex items-center gap-4 sm:gap-6 lg:gap-10">
              {data.logo && <Image src={data.logo} alt={data.name} width={64} height={64} className="w-16 h-16 sm:w-18 sm:h-18 lg:w-24 lg:h-24 object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert" />}
              <span className="font-bw-gradual font-bold text-base sm:text-lg md:text-xl lg:text-3xl xl:text-4xl leading-tight text-left">{data.name}</span>
            </span>
            <motion.div>{isExpanded ? <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ml-2 sm:ml-3 shrink-0" /> : <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ml-2 sm:ml-3 shrink-0" />}</motion.div>
          </div>
        </div>
        {data.description && <p className="text-xs sm:text-sm md:text-base lg:text-lg font-normal leading-normal text-left lg:text-right max-w-none lg:max-w-md xl:max-w-xl transition-colors duration-300 group-hover:text-white">{data.description}</p>}
        <ArrowUpRight className="hidden lg:block w-8 h-8 xl:w-10 xl:h-10 p-1 ml-4 transition-opacity duration-300 bg-white rounded-full text-black shrink-0 opacity-0 group-hover:opacity-100" />
      </button>

      <AnimatePresence>
        {isExpanded && data.expandedContent && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }} className="overflow-hidden bg-white">
            <div className="h-px bg-black/20 w-3/4 mx-auto" />
            <div className="px-4 sm:px-6 md:px-10 lg:px-12 pb-8 md:pb-12 lg:pb-16">
              <div className="flex flex-col pt-6 gap-8 lg:gap-12 max-w-5xl mx-auto">
                <div className="flex flex-col gap-5">
                  <h3 className="font-bw-gradual font-bold text-xl md:text-2xl lg:text-3xl text-black">{data.expandedContent.headline}</h3>
                  <ul className="flex flex-col gap-3 text-sm md:text-base text-neutral-medium leading-relaxed list-disc list-outside pl-4">
                    {data.expandedContent.bullets.map((bullet, bi) => (
                      <li key={bi}>{bullet}</li>
                    ))}
                  </ul>
                  {data.expandedContent.stats.length > 0 && (
                    <div className="flex flex-wrap gap-4 mt-2">
                      {data.expandedContent.stats.map((stat, si) => (
                        <div key={si} className="flex flex-col gap-1 bg-neutral-lightest border border-neutral-medium/20 rounded-xl px-4 py-3">
                          <span
                            className="font-bw-gradual font-bold text-lg md:text-xl bg-clip-text text-transparent"
                            style={{
                              backgroundImage: "linear-gradient(135deg, #6D5EFC, #4CC9F0)",
                            }}
                          >
                            {stat.value}
                          </span>
                          <span className="text-xs text-neutral-medium">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {data.expandedContent.images.length > 0 && (
                  <div className="w-full">
                    <CaseGallery images={data.expandedContent.images} />
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
