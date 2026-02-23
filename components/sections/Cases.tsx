"use client";

import { Tag } from "@/components/ui";
import casesData from "@/data/casescomponent.json";
import portfolioData from "@/data/cases.json";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Portfolio() {
  return (
    <motion.section className="relative w-full flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 py-12 md:py-20 lg:py-28 bg-white" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
      {/* Section Title */}
      <motion.div className="w-full max-w-7xl flex flex-col items-center gap-8 mb-16" variants={fadeInUp}>
        <div className="flex flex-col items-center gap-6 max-w-3xl text-center">
          <Tag>{casesData.tagline}</Tag>
          <h2 className="font-bw-gradual font-bold text-1xl md:text-4xl lg:text-5xl leading-tight text-black">
            How{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(152.57deg, #6D5EFC 0.1%, #4CC9F0 99.9%)" }}>
              {casesData.highlightedText}
            </span>{" "}
            is implemented in real e-commerce environments
          </h2>
          <p className="font-roboto text-lg text-[#41423c] font-normal leading-normal">{casesData.description}</p>
        </div>
      </motion.div>

      {/* Cases List */}
      <motion.div className="w-screen flex flex-col gap-0 divide-y divide-[#000000]/20 bg-white overflow-hidden shadow-card fixed-width-cases-list" variants={staggerContainer}>
        {portfolioData.cases.map((c, i) => (
          <motion.div key={c.name + i} variants={fadeInUp}>
            <Link key={c.name + i} href={c.href} className={"flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-8 md:py-10 gap-6 md:gap-0 transition-colors duration-300 bg-white text-black hover:bg-[#1c1c1c] hover:text-white! group"}>
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 flex-1">
                <span className={`font-bw-gradual font-bold text-2xl md:text-4xl lg:text-5xl leading-tight`}>
                  {c.name} <ChevronDown className="inline align-middle w-6 h-6" />
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-[25px] border text-sm font-semibold border-[#41423c] bg-[#eee] text-black group-hover:border-white group-hover:bg-linear-to-r group-hover:from-[#6D5EFC] group-hover:to-[#4CC9F0] group-hover:text-white transition-colors duration-300`}>{c.tagLabel}</span>
              </div>
              {c.description && <p className="font-roboto text-base md:text-lg font-normal leading-normal text-center md:text-left max-w-xl mx-auto md:mx-0 group-hover:text-white transition-colors duration-300">{c.description}</p>}
              <ArrowUpRight className="w-10 h-10 p-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-full text-black" />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
