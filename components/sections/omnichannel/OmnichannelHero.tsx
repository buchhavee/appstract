"use client";

import { motion } from "framer-motion";
import { Tag, LiquidBackground, TopGradient } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import omnichannelData from "@/data/omnichannel.json";

export default function OmnichannelHero() {
  const { hero } = omnichannelData;

  return (
    <section className="relative z-1 w-full flex flex-col items-center justify-center overflow-hidden" style={{ background: "linear-gradient(to bottom, var(--color-primary-purple) 0%, var(--color-primary-cyan) 100%)" }}>
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 40%, oklch(78.2% 0.121 222.5 / 0.15) 0%, transparent 70%)",
        }}
      />

      {/* Liquid gradient overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <LiquidBackground opacity={0.4} speed={0.8} zoom={1.0} warpStrength={0.5} />
      </div>

      <TopGradient />

      {/* Content */}
      <div className="relative w-full max-w-5xl px-4 md:px-8 lg:px-16 pt-44 pb-24 md:pt-52 md:pb-32">
        <motion.div className="flex flex-col items-center text-center gap-6" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}>
          <motion.div variants={fadeInUp}>
            <Tag variant="dark">{hero.tagline}</Tag>
          </motion.div>

          <motion.h1 className="font-bw-gradual font-bold tracking-tight leading-tight text-white" style={{ fontSize: "clamp(32px, 6vw, 72px)" }} variants={fadeInUp}>
            {hero.headline}
          </motion.h1>

          <motion.p className="text-lg md:text-xl text-white/70 font-bw-gradual max-w-2xl leading-relaxed" variants={fadeInUp}>
            {hero.description}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
