"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar, Footer } from "@/components/layout";
import { Tag, LiquidBackground, TopGradient } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function NotFound() {
  return (
    <main className="flex flex-col min-h-screen overflow-x-clip bg-white">
      <Navbar />

      <section className="relative z-1 w-full flex flex-col items-center justify-center flex-1 overflow-hidden rounded-b-lg" style={{ background: "linear-gradient(to bottom, var(--color-primary-purple) 0%, var(--color-primary-cyan) 100%)" }}>
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
              <Tag variant="dark">404</Tag>
            </motion.div>

            <motion.h1 className="font-bw-gradual font-bold tracking-tight leading-tight text-white" style={{ fontSize: "clamp(48px, 10vw, 120px)" }} variants={fadeInUp}>
              Page not found
            </motion.h1>

            <motion.p className="text-lg md:text-xl text-white/70 font-bw-gradual max-w-2xl leading-relaxed" variants={fadeInUp}>
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Link href="/" className="inline-flex items-center gap-2 font-bw-gradual font-medium text-base text-white! border border-white/40 rounded-full px-6 py-3 backdrop-blur-sm transition-transform hover:scale-105" style={{ background: "oklch(100% 0 0 / 0.08)" }}>
                <ArrowLeft className="w-4 h-4 opacity-70" />
                Back to home
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
