"use client";

import { useState, useRef, Fragment } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { BarChart3, ShoppingCart, BadgeDollarSign, TrendingDown, Repeat, PackageCheck, Target, Gem, Share2, Wallet, Mails, CirclePlus } from "lucide-react";
import { Tag, Button, Modal } from "@/components/ui";
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
  const imageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const { scrollYProgress: sectionScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.1"],
  });
  const sectionY = useTransform(sectionScrollProgress, [0, 1], [180, 0]);

  return (
    <motion.section
      ref={sectionRef}
      className="relative z-2 w-full py-12 md:py-24 px-4 md:px-8 flex justify-center overflow-x-hidden -mt-28 md:-mt-27"
      style={{
        borderRadius: "24px 24px 0 0",
        backgroundColor: "white",
        boxShadow: "0 -20px 60px oklch(0% 0 0 / 0.3), 0 -8px 24px oklch(0% 0 0 / 0.2), 0 -2px 6px oklch(0% 0 0 / 0.15), inset 0 1px 0 oklch(100% 0 0 / 0.9)",
        y: sectionY,
      }}
    >
      <div className="w-full max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-14 lg:gap-10 xl:gap-20 items-center min-w-0">
          <motion.div className="flex-1 flex flex-col gap-8" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
            <div className="flex flex-col gap-6 md:gap-8">
              <motion.div variants={fadeInUp} className="flex items-center">
                <Tag>{resultsData.tagline}</Tag>
              </motion.div>

              <div className="pb-8 flex flex-col gap-6 md:gap-10 max-w-3xl">
                <motion.h2 variants={fadeInUp} className="gradient-text font-bold font-bw-gradual leading-tight text-3xl md:text-3xl lg:text-3xl">
                  {resultsData.headline}
                </motion.h2>
                <motion.p variants={fadeInUp} className="font-normal font-bw-gradual text-neutral-medium leading-normal text-base md:text-lg">
                  {resultsData.description}
                </motion.p>
              </div>
            </div>

            <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-6 sm:gap-8 py-2">
              {resultsData.features.map((feature, index) => {
                const Icon = iconMap[feature.icon];
                return (
                  <Fragment key={index}>
                    <motion.div
                      className="flex flex-row sm:flex sm:flex-col items-start gap-4 sm:gap-3 md:gap-4"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.1,
                        ease: [0.25, 0.4, 0.25, 1],
                      }}
                    >
                      {Icon && <Icon className="w-8 h-8 shrink-0 text-black/60 sm:w-8 sm:h-8 md:w-10 md:h-10 mt-0.5" />}
                      {/* Vertical divider */}
                      <div className="sm:hidden w-px self-stretch bg-black/20 shrink-0" />
                      <div className="flex flex-col gap-1">
                        <h3 className="font-bold font-bw-gradual! text-black leading-snug text-lg md:text-lg">{feature.title}</h3>
                        <p className="font-normal font-bw-gradual! text-neutral-medium leading-normal text-base md:text-base">{feature.description}</p>
                      </div>
                    </motion.div>
                    {index === 0 && <div className="hidden sm:block w-px bg-black/20" />}
                  </Fragment>
                );
              })}
            </motion.div>

            <motion.div variants={fadeInUp} className="flex gap-6 items-center">
              <Button onClick={() => setOpen(true)} icon>
                {resultsData.actions.label}
              </Button>
            </motion.div>
          </motion.div>

          <motion.div ref={imageRef} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInRight} className="relative min-w-0 w-screen md:w-full lg:w-100 xl:w-126.5 h-75 sm:h-100 lg:h-115 xl:h-135 md:rounded-[25px] overflow-hidden order-last md:order-last lg:order-last -mx-4 md:mx-0">
            <motion.div className="absolute inset-0 -top-[15%] h-[130%]" style={{ y }}>
              <Image src="/images/results/results-image.png" alt="Results" fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 1400px" quality={80} className="object-cover object-[65%_center]" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} panelClassName="lg:pr-18">
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
                      <div className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-lg shrink-0" style={{ background: "var(--gradient-primary)" }}>
                        {LeftIcon && <LeftIcon className="w-4 h-4 md:w-4.5 md:h-4.5 text-white" />}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm md:text-base text-black font-medium leading-snug">{kpi.label}</span>
                        <span className={`text-xs font-medium capitalize ${kpi.trend === "increase" || kpi.trend === "added" ? "text-green-600" : "text-red-500"}`}>{kpi.trend}</span>
                      </div>
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
                      <div className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-lg shrink-0" style={{ background: "var(--gradient-primary)" }}>
                        {LeftIcon && <LeftIcon className="w-4 h-4 md:w-4.5 md:h-4.5 text-white" />}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm md:text-base text-black font-medium leading-snug">{kpi.label}</span>
                        <span className={`text-xs font-medium capitalize ${kpi.trend === "increase" || kpi.trend === "added" ? "text-green-600" : "text-red-500"}`}>{kpi.trend}</span>
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          );
        })()}
      </Modal>
    </motion.section>
  );
}
