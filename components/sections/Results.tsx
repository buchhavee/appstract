"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BarChart3, ShoppingCart, ChevronRight } from "lucide-react";
import { Tag } from "@/components/ui";
import resultsData from "@/data/results.json";
import { fadeInUp, fadeInRight, staggerContainer } from "@/lib/animations";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BarChart3,
  ShoppingCart,
};

export default function Results() {
  return (
    <section className="relative w-full bg-white py-12 md:py-24 px-4 md:px-8 flex justify-center overflow-x-hidden">
      <div
        className="absolute left-0 right-0 h-20 md:h-20 lg:h-20 pointer-events-none -top-16 md:-top-20 lg:-top-12"
        style={{
          background: "linear-gradient(to bottom, #4CC9F040 20%, rgba(255,255,255,0) 100%)",
        }}
      />

      <div className="w-full max-w-[1280px]">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-14 lg:gap-20 items-center min-w-0">
          {/* Content */}
          <motion.div className="flex-1 flex flex-col gap-8" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
            {/* Section Title */}
            <div className="flex flex-col gap-4">
              {/* Tagline */}
              <motion.div variants={fadeInUp} className="flex items-center">
                <Tag>{resultsData.tagline}</Tag>
              </motion.div>

              {/* Headline & Description */}
              <div className="flex flex-col gap-4 md:gap-6">
                <motion.h2
                  variants={fadeInUp}
                  className="font-[family-name:var(--font-bw-gradual)] font-bold leading-[1.2] bg-clip-text text-2xl md:text-3xl lg:text-[48px]"
                  style={{
                    backgroundImage: "linear-gradient(161deg, #6D5EFC 0%, #4CC9F0 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {resultsData.headline}
                </motion.h2>
                <motion.p variants={fadeInUp} className="font-[family-name:var(--font-bw-gradual)] font-normal text-black leading-[1.5] text-base md:text-lg">
                  {resultsData.description}
                </motion.p>
              </div>
            </div>

            {/* Features */}
            <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-2">
              {resultsData.features.map((feature, index) => {
                const Icon = iconMap[feature.icon];
                return (
                  <motion.div
                    key={index}
                    className="flex flex-col gap-3 md:gap-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: [0.25, 0.4, 0.25, 1],
                    }}
                  >
                    {Icon && <Icon className="w-10 h-10 md:w-12 md:h-12 text-black" />}
                    <h3 className="font-[family-name:var(--font-bw-gradual)] font-bold text-black leading-[1.4] text-lg md:text-xl">{feature.title}</h3>
                    <p className="font-[family-name:var(--font-bw-gradual)] font-normal text-[#41423c] leading-[1.5] text-base md:text-lg">{feature.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Actions */}
            <motion.div variants={fadeInUp} className="flex gap-6 items-center">
              <Link href={resultsData.actions.href} className="flex items-center gap-2 font-[family-name:var(--font-bw-gradual)] font-normal text-black text-base leading-[1.5] group">
                {resultsData.actions.label}
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInRight} className="relative min-w-0 max-w-full w-full lg:w-[506px] h-[300px] sm:h-[400px] lg:h-[540px] rounded-[15px] md:rounded-[25px] overflow-hidden overflow-x-hidden order-last md:order-last lg:order-last">
            <Image src="/images/results-image.png" alt="Results" fill className="object-cover object-[65%_center]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
