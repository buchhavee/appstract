"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BarChart3, ShoppingCart, ChevronRight } from "lucide-react";
import { Tag } from "@/components/ui";
import resultsData from "@/data/results.json";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BarChart3,
  ShoppingCart,
};

export default function Results() {
  return (
    <section style={{ marginTop: "120px" }} className="relative w-full bg-white py-28 px-16 flex justify-center">
      <div className="w-full max-w-[1280px]">
        <div className="flex gap-20 items-center">
          {/* Content */}
          <div className="flex-1 flex flex-col gap-8">
            {/* Section Title */}
            <div className="flex flex-col gap-4">
              {/* Tagline */}
              <div className="flex items-center">
                <Tag>{resultsData.tagline}</Tag>
              </div>

              {/* Headline & Description */}
              <div className="flex flex-col gap-6">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="font-[family-name:var(--font-bw-gradual)] font-bold leading-[1.2] bg-clip-text"
                  style={{
                    fontSize: "48px",
                    backgroundImage: "linear-gradient(161deg, #6D5EFC 0%, #4CC9F0 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {resultsData.headline}
                </motion.h2>
                <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="font-[family-name:var(--font-bw-gradual)] font-normal text-black leading-[1.5]" style={{ fontSize: "18px" }}>
                  {resultsData.description}
                </motion.p>
              </div>
            </div>

            {/* Features */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="flex gap-6 py-2">
              {resultsData.features.map((feature, index) => {
                const Icon = iconMap[feature.icon];
                return (
                  <div key={index} className="flex-1 flex flex-col gap-4">
                    {Icon && <Icon className="w-12 h-12 text-black" />}
                    <h3 className="font-[family-name:var(--font-bw-gradual)] font-bold text-black leading-[1.4]" style={{ fontSize: "20px" }}>
                      {feature.title}
                    </h3>
                    <p className="font-[family-name:var(--font-bw-gradual)] font-normal text-[#41423c] leading-[1.5]" style={{ fontSize: "18px" }}>
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </motion.div>

            {/* Actions */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="flex gap-6 items-center">
              <Link href={resultsData.actions.primary.href} className="px-6 py-3 border border-black font-[family-name:var(--font-bw-gradual)] font-normal text-black text-base leading-[1.5] hover:bg-black hover:text-white transition-colors duration-300">
                {resultsData.actions.primary.label}
              </Link>
              <Link href={resultsData.actions.secondary.href} className="flex items-center gap-2 font-[family-name:var(--font-bw-gradual)] font-normal text-black text-base leading-[1.5] group">
                {resultsData.actions.secondary.label}
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative w-[506px] h-[540px] rounded-[25px] overflow-hidden shrink-0">
            <Image src="/images/results-image.png" alt="Results" fill className="object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
