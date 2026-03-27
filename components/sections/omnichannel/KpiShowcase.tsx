"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { fadeInUp, staggerContainer, fadeInRight } from "@/lib/animations";
import omnichannelData from "@/data/omnichannel.json";
import { iconMap } from "./types";

export default function KpiShowcase() {
  const { categories } = omnichannelData;

  return (
    <section className="relative w-full bg-white px-4 md:px-8 lg:px-16 flex justify-center">
      <div className="w-full max-w-7xl pb-16 md:pb-24">
        {/* Section heading */}
        <motion.div className="flex flex-col items-center text-center mb-16 md:mb-20" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
          <motion.h2 className="gradient-text font-bw-gradual font-bold leading-tight" style={{ fontSize: "clamp(28px, 5vw, 52px)" }} variants={fadeInUp}>
            Built for modern omnichannel teams
          </motion.h2>
          <motion.p className="text-base md:text-lg text-neutral-medium font-bw-gradual max-w-xl mt-4 leading-relaxed" variants={fadeInUp}>
            Each category connects shared shopping behavior to actionable insights, so you can prioritize what matters.
          </motion.p>
        </motion.div>

        {/* Alternating showcase blocks */}
        <div className="flex flex-col gap-20 md:gap-28">
          {categories.map((category, idx) => {
            const Icon = iconMap[category.icon];
            const isReversed = idx % 2 !== 0;

            return (
              <motion.div key={idx} className={`flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} gap-10 md:gap-16 items-center`} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
                {/* Text side */}
                <motion.div className="flex-1 flex flex-col gap-5" variants={fadeInUp}>
                  <div className="flex items-center gap-3">
                    {Icon && (
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--gradient-primary)" }}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <h3
                      className="font-bw-gradual font-bold text-black leading-tight"
                      style={{
                        fontSize: "clamp(22px, 3vw, 36px)",
                      }}
                    >
                      {category.title}
                    </h3>
                  </div>
                  <p className="text-base md:text-lg text-neutral-medium font-bw-gradual leading-relaxed max-w-lg">{category.description}</p>
                </motion.div>

                {/* KPI card side */}
                <motion.div className="flex-1 w-full" variants={isReversed ? fadeInUp : fadeInRight}>
                  <div
                    className="rounded-2xl p-6 md:p-8"
                    style={{
                      background: "linear-gradient(145deg, oklch(98.0% 0.004 286.3) 0%, oklch(95.7% 0.007 286.3) 100%)",
                      border: "1px solid oklch(0% 0 0 / 0.06)",
                    }}
                  >
                    <ul className="flex flex-col gap-3">
                      {category.kpis.map((kpi, kpiIdx) => (
                        <motion.li
                          key={kpiIdx}
                          className="flex items-center gap-3 bg-white rounded-xl px-4 py-3.5 transition-shadow hover:shadow-md"
                          style={{
                            border: "1px solid oklch(0% 0 0 / 0.06)",
                          }}
                          initial={{ opacity: 0, x: isReversed ? -20 : 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: kpiIdx * 0.08,
                            ease: [0.25, 0.4, 0.25, 1],
                          }}
                        >
                          <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0" style={{ background: "var(--gradient-primary)" }}>
                            <Check className="w-3.5 h-3.5 text-white" />
                          </div>
                          <span className="font-bw-gradual text-neutral-dark text-sm md:text-base leading-snug">{kpi}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
