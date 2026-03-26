"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { SpotlightCard } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import omnichannelData from "@/data/omnichannel.json";
import { iconMap } from "./types";

export default function KpiBentoGrid() {
  const { categories } = omnichannelData;

  return (
    <section
      className="relative z-2 w-full px-4 md:px-8 lg:px-16 flex justify-center"
      style={{
        borderRadius: "24px 24px 0 0",
        backgroundColor: "white",
        marginTop: "-24px",
      }}
    >
      <div className="w-full max-w-7xl py-16 md:py-24">
        {/* Section intro */}
        <motion.div className="flex flex-col items-center text-center mb-12 md:mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
          <motion.h2 className="gradient-text font-bw-gradual font-bold leading-tight" style={{ fontSize: "clamp(28px, 5vw, 52px)" }} variants={fadeInUp}>
            Metrics that matter
          </motion.h2>
          <motion.p className="text-base md:text-lg text-neutral-medium font-bw-gradual max-w-xl mt-4 leading-relaxed" variants={fadeInUp}>
            Three pillars of KPIs that define omnichannel success.
          </motion.p>
        </motion.div>

        {/* Bento grid: first card spans full on md, others 1/2 */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}>
          {categories.map((category, idx) => {
            const Icon = iconMap[category.icon];
            const isFirst = idx === 0;

            return (
              <motion.div key={idx} variants={fadeInUp} className={isFirst ? "md:col-span-2" : ""}>
                <SpotlightCard
                  className="h-full"
                  spotlightColor="rgba(146, 222, 246, 0.12)"
                  style={{
                    background: "linear-gradient(145deg, rgba(40, 40, 45, 0.6) 0%, rgba(25, 25, 30, 0.7) 100%)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                    boxShadow: `
                      0 20px 40px rgba(0, 0, 0, 0.25),
                      0 8px 16px rgba(0, 0, 0, 0.15),
                      inset 0 1px 0 rgba(255, 255, 255, 0.08)
                    `,
                  }}
                >
                  {/* Top edge highlight sheen */}
                  <div
                    className="absolute top-0 left-8 right-8 h-px pointer-events-none z-10"
                    style={{
                      background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 20%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.3) 80%, transparent 100%)",
                    }}
                  />

                  <div className={`relative z-10 p-6 md:p-8 lg:p-10 ${isFirst ? "flex flex-col md:flex-row gap-8 md:gap-12" : "flex flex-col gap-6"}`}>
                    {/* Left: header + description */}
                    <div className={`flex flex-col gap-4 ${isFirst ? "md:w-2/5 md:justify-center" : ""}`}>
                      <div className="flex items-center gap-3">
                        {Icon && (
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "var(--gradient-primary)" }}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                        )}
                        <h3 className="font-bw-gradual font-bold text-xl md:text-2xl text-white leading-tight">{category.title}</h3>
                      </div>
                      <p className="text-sm md:text-base text-white/60 font-bw-gradual leading-relaxed max-w-md">{category.description}</p>
                    </div>

                    {/* Right: KPI list */}
                    <div className={isFirst ? "md:flex-1" : ""}>
                      <ul className={`grid gap-3 ${isFirst ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : "grid-cols-1"}`}>
                        {category.kpis.map((kpi, kpiIdx) => (
                          <motion.li
                            key={kpiIdx}
                            className="flex items-center gap-3 rounded-xl px-4 py-3"
                            style={{
                              background: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(255,255,255,0.08)",
                            }}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.4,
                              delay: idx * 0.08 + kpiIdx * 0.05,
                              ease: [0.25, 0.4, 0.25, 1],
                            }}
                          >
                            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "var(--gradient-primary)" }}>
                              <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="font-bw-gradual text-white/80 text-sm leading-snug">{kpi}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
