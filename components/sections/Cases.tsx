"use client";

import { useRef } from "react";
import { Tag } from "@/components/ui";
import casesData from "@/data/casescomponent.json";
import ListData from "@/data/cases.json";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { CaseList } from "./case-components";

const INITIAL_COUNT = 2;

export default function Cases() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track when the Cases section enters the viewport from the bottom
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.3"],
  });

  // Move Cases upward as it enters — creates the "sliding over Feature" effect
  const y = useTransform(scrollYProgress, [0, 1], [120, 0]);

  return (
    <motion.section
      ref={sectionRef}
      id="cases"
      className="relative z-2 w-full flex flex-col items-center justify-center pt-12 pb-28 md:pt-20 md:pb-40 lg:pt-28 lg:pb-48 bg-white -mt-32 md:-mt-40"
      style={{
        borderRadius: "24px 24px 0 0",
        boxShadow: "0 -8px 30px rgba(0, 0, 0, 0.15), 0 -2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
        y,
      }}
    >
      {/* Section Title */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-4 md:gap-8 mb-8 md:mb-16 px-4 md:px-8 lg:px-16">
        <div className="flex flex-col items-center gap-4 md:gap-6 max-w-4xl text-center">
          <Tag>{casesData.tagline}</Tag>
          <h2 className="font-bw-gradual font-bold text-pretty tracking-tight leading-tight text-black" style={{ fontSize: "clamp(2.5rem, 5vw + 1rem, 4.5rem)" }}>
            {casesData.headline.split(casesData.highlightedText)[0]}
            <span className="gradient-text">{casesData.highlightedText}</span>
            {casesData.headline.split(casesData.highlightedText)[1]}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-neutral-medium font-normal leading-normal">{casesData.description}</p>
        </div>
      </div>

      {/* Cases List */}
      <div className="relative z-10 w-full max-w-7xl">
        <CaseList cases={ListData.cases} initialCount={INITIAL_COUNT} />
      </div>
    </motion.section>
  );
}
