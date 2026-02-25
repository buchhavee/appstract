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

      <div className="w-full max-w-7xl">
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
                  className="font-bold leading-tight bg-clip-text text-3xl md:text-3xl lg:text-3xl"
                  style={{
                    backgroundImage: "linear-gradient(161deg, #6D5EFC 0%, #4CC9F0 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {resultsData.headline}
                </motion.h2>
                <motion.p variants={fadeInUp} className="font-normal text-black leading-normal text-base md:text-lg">
                  {resultsData.description}
                </motion.p>
              </div>
            </div>

            {/* Features */}
            <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-6 sm:gap-8 py-2">
              {resultsData.features.map((feature, index) => {
                const Icon = iconMap[feature.icon];
                return (
                  <>
                    <motion.div
                      key={index}
                      className="grid grid-rows-[auto_minmax(3.5rem,auto)_auto] gap-3 md:gap-4"
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
                      <h3 className="font-bold text-black leading-snug text-lg md:text-xl">{feature.title}</h3>
                      <p className="font-normal text-neutral-medium leading-normal text-base md:text-lg">{feature.description}</p>
                    </motion.div>
                    {index === 0 && <div className="hidden sm:block w-px bg-black/20" />}
                  </>
                );
              })}
            </motion.div>

            {/* Actions */}
            <motion.div variants={fadeInUp} className="flex gap-6 items-center">
              <Link href={resultsData.actions.href} className="flex items-center gap-2 font-normal text-black text-base leading-normal group">
                {resultsData.actions.label}
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInRight} className="relative min-w-0 max-w-full w-full lg:w-126.5 h-75 sm:h-100 lg:h-135 rounded-[15px] md:rounded-[25px] overflow-hidden overflow-x-hidden order-last md:order-last lg:order-last">
            <Image src="/images/results-image.png" alt="Results" fill className="object-cover object-[65%_center]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
