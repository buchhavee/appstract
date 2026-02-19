"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import heroData from "@/data/hero.json";
import { Button } from "@/components/ui";

const TAB_DURATION = 10000; // 10 seconds per tab
const PAUSE_AFTER_CLICK = 5000; // 5 second pause after manual click

export default function Hero() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotate tabs
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % heroData.tabs.length);
      setProgress(0);
    }, TAB_DURATION);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Progress animation
  useEffect(() => {
    if (isPaused) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 100 / (TAB_DURATION / 50);
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [activeTab, isPaused]);

  const handleTabClick = (index: number) => {
    // Clear any existing pause timeout
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }

    setActiveTab(index);
    setProgress(0);
    setIsPaused(true);

    // Resume auto-rotation after 5 seconds
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, PAUSE_AFTER_CLICK);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  const currentTab = heroData.tabs[activeTab];

  return (
    <section className="relative w-full h-screen min-h-[900px] flex flex-col items-center justify-center px-[var(--padding-page)] bg-black overflow-hidden mb-28">
      {/* Background Images - stacked for crossfade */}
      {heroData.tabs.map((tab, index) => (
        <motion.div key={index} initial={false} animate={{ opacity: index === activeTab ? 1 : 0 }} transition={{ duration: 0.8 }} className="absolute inset-0 w-full h-full" style={{ zIndex: index === activeTab ? 1 : 0 }}>
          <Image src={tab.image} alt="Hero background" fill className="object-cover" priority={index === 0} />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/25" />
        </motion.div>
      ))}

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-[1280px] w-full h-[411px]">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.6 }} className="flex flex-col items-center gap-8 max-w-[768px] w-full">
            {/* Text Content */}
            <div className="flex flex-col items-center gap-6 text-white text-center">
              <h1 className="font-[family-name:var(--font-bw-gradual)] text-4xl font-bold leading-[1.2]">{currentTab.headline}</h1>
              <p className="font-[family-name:var(--font-bw-gradual)] text-xl font-normal leading-[1.5]">{currentTab.description}</p>
            </div>

            {/* CTA Button */}
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <Button href={heroData.cta.href} variant="primary" size="md">
                {heroData.cta.label}
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tabs Navigation */}
      <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }} className="absolute bottom-[80px] left-1/2 -translate-x-1/2 flex gap-4 max-w-[1024px] w-[1024px] z-20">
        {heroData.tabs.map((tab, index) => (
          <motion.div key={index} onClick={() => handleTabClick(index)} className="flex-1 flex flex-col items-center px-8 cursor-pointer transition-all">
            <span className="font-[family-name:var(--font-bw-gradual)] text-base text-white text-center leading-[1.5] mb-4">{tab.label}</span>

            {/* Progress bar container */}
            <div className="w-full h-[4px] bg-white/30 overflow-hidden">
              {/* Progress indicator */}
              {index === activeTab ? <motion.div className="h-full bg-white" initial={{ width: "0%" }} animate={{ width: `${progress}%` }} transition={{ duration: 0.05, ease: "linear" }} /> : index < activeTab ? <div className="h-full w-full bg-white" /> : null}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
