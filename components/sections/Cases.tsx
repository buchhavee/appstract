"use client";

import { Tag } from "@/components/ui";
import casesData from "@/data/casescomponent.json";
import portfolioData from "@/data/cases.json";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { CaseList } from "./case-components";

const INITIAL_COUNT = 2;

export default function Cases() {
  return (
    <motion.section id="cases" className="relative z-0 w-full flex flex-col items-center justify-center py-12 md:py-20 lg:py-28 bg-white" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
      {/* Top gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-48 md:h-64 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(109,94,252,0.18) 0%, rgba(76,201,240,0.10) 50%, rgba(255,255,255,0) 100%)",
        }}
      />

      {/* Section Title */}
      <motion.div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-4 md:gap-8 mb-8 md:mb-16 px-4 md:px-8 lg:px-16" variants={fadeInUp}>
        <div className="flex flex-col items-center gap-4 md:gap-6 max-w-4xl text-center">
          <Tag>{casesData.tagline}</Tag>
          <h2 className="font-bw-gradual font-bold text-pretty text-5xl! sm:text-4xl! md:text-4xl! lg:text-5xl tracking-tight leading-tight text-black">
            How{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(152.57deg, #6D5EFC 0.1%, #4CC9F0 99.9%)",
              }}
            >
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
      <div className="relative z-10 w-full px-0">
        <CaseList cases={portfolioData.cases} initialCount={INITIAL_COUNT} />
      </div>
    </motion.section>
  );
}
