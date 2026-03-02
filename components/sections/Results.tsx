"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { BarChart3, ShoppingCart, ChevronRight, X, MoveUpRight, MoveDownRight, BadgeDollarSign, TrendingDown, Repeat, PackageCheck, Target, Gem, Share2, Wallet, Mails, CirclePlus } from "lucide-react";
import { Tag } from "@/components/ui";
import resultsData from "@/data/results.json";
import kpiData from "@/data/resultskpi.json";
import { fadeInUp, fadeInRight, staggerContainer } from "@/lib/animations";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BarChart3,
  ShoppingCart,
};

const kpiIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MoveUpRight,
  MoveDownRight,
  BadgeDollarSign,
  TrendingDown,
  Repeat,
  PackageCheck,
  ShoppingCart,
  Target,
  Gem,
  Share2,
  Wallet,
  Mails,
  CirclePlus,
};

export default function Results() {
  const [open, setOpen] = useState(false);

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
              <button onClick={() => setOpen(true)} className="flex items-center gap-2 font-normal text-black text-base leading-normal group cursor-pointer">
                {resultsData.actions.label}
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInRight} className="relative min-w-0 max-w-full w-full lg:w-126.5 h-75 sm:h-100 lg:h-135 rounded-[15px] md:rounded-[25px] overflow-hidden overflow-x-hidden order-last md:order-last lg:order-last">
            <Image src="/images/results-image.png" alt="Results" fill className="object-cover object-[65%_center]" />
          </motion.div>
        </div>
      </div>

      {/* KPI Modal Popover */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.25 }} className="fixed inset-0 z-100 flex items-center justify-center bg-linear-to-br from-violet-500/30 to-cyan-400/60 backdrop-blur-sm shadow-2xl overflow-hidden" style={{ touchAction: "none", overscrollBehavior: "contain" }} onClick={() => setOpen(false)} onWheel={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()}>
            <motion.div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 max-w-lg w-full flex flex-col gap-6 relative max-h-dvh overflow-y-auto mx-4" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: 0.25 }} onClick={(e) => e.stopPropagation()}>
              <button className="absolute top-4 right-4 text-black bg-neutral-light rounded-full w-10 h-10 flex items-center justify-center hover:bg-neutral-medium transition-colors border border-neutral-medium cursor-pointer" onClick={() => setOpen(false)} aria-label="Close">
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col gap-2">
                <div className="text-xs font-bw-gradual font-semibold text-primary-purple uppercase tracking-wider">Results</div>
                <h2 className="text-2xl md:text-3xl font-bw-gradual font-bold text-black">{kpiData.title}</h2>
              </div>

              <ul className="flex flex-col gap-3">
                {kpiData.kpis.map((kpi, index) => {
                  const LeftIcon = kpiIconMap[kpi.leftIcon];
                  const ArrowIcon = kpiIconMap[kpi.arrow];
                  return (
                    <motion.li key={index} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="flex items-center gap-3">
                      <div
                        className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                        style={{
                          background: "linear-gradient(135deg, #6d5efc, #4cc9f0)",
                        }}
                      >
                        {LeftIcon && <LeftIcon className="w-4 h-4 text-white" />}
                      </div>
                      <span className="flex-1 text-sm md:text-base text-black font-medium">{kpi.label}</span>
                      {ArrowIcon && <ArrowIcon className="w-5 h-5 text-neutral-medium shrink-0" />}
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
