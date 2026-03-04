"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { BarChart3, ShoppingCart, ChevronRight, ChevronLeft, BadgeDollarSign, TrendingDown, Repeat, PackageCheck, Target, Gem, Share2, Wallet, Mails, CirclePlus } from "lucide-react";
import { Tag } from "@/components/ui";
import resultsData from "@/data/results.json";
import kpiData from "@/data/resultskpi.json";
import { fadeInUp, fadeInRight, staggerContainer } from "@/lib/animations";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BarChart3,
  ShoppingCart,
};

const kpiIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
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
          <motion.div className="flex-1 flex flex-col gap-8" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
            <div className="flex flex-col gap-4">
              <motion.div variants={fadeInUp} className="flex items-center">
                <Tag>{resultsData.tagline}</Tag>
              </motion.div>

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

            <motion.div variants={fadeInUp} className="flex gap-6 items-center">
              <button onClick={() => setOpen(true)} className="flex items-center gap-2 font-normal text-black text-base leading-normal group cursor-pointer">
                {resultsData.actions.label}
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInRight} className="relative min-w-0 max-w-full w-full lg:w-126.5 h-75 sm:h-100 lg:h-135 rounded-[15px] md:rounded-[25px] overflow-hidden overflow-x-hidden order-last md:order-last lg:order-last">
            <Image src="/images/results-image.png" alt="Results" fill className="object-cover object-[65%_center]" />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.25 }} className="fixed inset-0 z-100 flex items-center justify-center bg-linear-to-br from-violet-500/30 to-cyan-400/60 backdrop-blur-sm shadow-2xl overflow-hidden" style={{ touchAction: "none", overscrollBehavior: "contain" }} onClick={() => setOpen(false)} onWheel={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()}>
            <motion.div className="bg-white md:rounded-2xl shadow-lg max-w-3xl md:max-w-4xl lg:max-w-5xl w-full flex flex-col md:flex-row relative max-h-dvh overflow-y-auto mx-0 md:mx-4 h-full md:h-auto" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: 0.25 }} onClick={(e) => e.stopPropagation()}>
              <button className="hidden md:flex flex-col items-center justify-start gap-1 pt-12 px-5 text-neutral-medium hover:text-black transition-colors cursor-pointer shrink-0" onClick={() => setOpen(false)} aria-label="Back">
                <ChevronLeft className="w-4 h-4" />
                <span className="text-[10px] font-medium uppercase tracking-wider">Back</span>
              </button>

              <div className="flex flex-col gap-6 md:gap-8 p-6 md:p-12 flex-1 min-w-0">
                <button className="flex md:hidden items-center gap-1 text-neutral-medium hover:text-black transition-colors cursor-pointer self-start" onClick={() => setOpen(false)} aria-label="Back">
                  <ChevronLeft className="w-4 h-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">Back</span>
                </button>

                <div className="flex flex-col gap-2">
                  <div className="text-xs font-bw-gradual font-semibold text-primary-purple uppercase tracking-wider">Results</div>
                  <h2 className="text-xl md:text-3xl font-bw-gradual font-bold text-black">{kpiData.title}</h2>
                </div>

                {(() => {
                  const half = Math.ceil(kpiData.kpis.length / 2);
                  const leftCol = kpiData.kpis.slice(0, half);
                  const rightCol = kpiData.kpis.slice(half);
                  return (
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-5 md:gap-8">
                      <ul className="flex flex-col gap-4 md:gap-5">
                        {leftCol.map((kpi, index) => {
                          const LeftIcon = kpiIconMap[kpi.leftIcon];
                          return (
                            <motion.li key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.04 }} className="flex items-center gap-3 md:gap-4">
                              <div className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-lg shrink-0" style={{ background: "linear-gradient(135deg, #6d5efc, #4cc9f0)" }}>
                                {LeftIcon && <LeftIcon className="w-4 h-4 md:w-4.5 md:h-4.5 text-white" />}
                              </div>
                              <span className="text-sm md:text-base text-black font-medium leading-snug">{kpi.label}</span>
                            </motion.li>
                          );
                        })}
                      </ul>

                      <div className="hidden md:block w-px bg-black/10" />

                      <ul className="flex flex-col gap-4 md:gap-5">
                        {rightCol.map((kpi, index) => {
                          const LeftIcon = kpiIconMap[kpi.leftIcon];
                          return (
                            <motion.li key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: (index + half) * 0.04 }} className="flex items-center gap-3 md:gap-4">
                              <div className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-lg shrink-0" style={{ background: "linear-gradient(135deg, #6d5efc, #4cc9f0)" }}>
                                {LeftIcon && <LeftIcon className="w-4 h-4 md:w-4.5 md:h-4.5 text-white" />}
                              </div>
                              <span className="text-sm md:text-base text-black font-medium leading-snug">{kpi.label}</span>
                            </motion.li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
