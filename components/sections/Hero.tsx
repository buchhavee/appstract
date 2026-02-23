"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import heroData from "@/data/hero.json";
import { Button } from "@/components/ui";

const TAB_DURATION = 10000; // 10 seconds per tab
const PAUSE_AFTER_CLICK = 5000; // 5 second pause after manual click
const SWIPE_THRESHOLD = 50; // Minimum swipe distance in pixels

export default function Hero() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartRef = useRef<number | null>(null);
  const touchEndRef = useRef<number | null>(null);

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
        return Math.min(100, prev + 100 / (TAB_DURATION / 50));
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

  // Swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) return;

    const distance = touchStartRef.current - touchEndRef.current;
    const isSwipe = Math.abs(distance) > SWIPE_THRESHOLD;

    if (isSwipe) {
      if (distance > 0) {
        // Swipe left - go to next tab
        const nextIndex = (activeTab + 1) % heroData.tabs.length;
        handleTabClick(nextIndex);
      } else {
        // Swipe right - go to previous tab
        const prevIndex = activeTab === 0 ? heroData.tabs.length - 1 : activeTab - 1;
        handleTabClick(prevIndex);
      }
    }

    // Reset touch refs
    touchStartRef.current = null;
    touchEndRef.current = null;
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
    <section className="relative w-full h-svh md:min-h-[85vh] lg:min-h-225 flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 bg-black overflow-hidden " onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      {/* Background Images */}
      {heroData.tabs.map((tab, index) => (
        <motion.div key={index} initial={false} animate={{ opacity: index === activeTab ? 1 : 0 }} transition={{ duration: 0.8 }} className="absolute inset-0 w-full h-full" style={{ zIndex: index === activeTab ? 1 : 0 }}>
          <Image src={tab.image} alt="Hero background" fill className="object-cover" priority={index === 0} />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/25" />
        </motion.div>
      ))}

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-7xl w-full min-h-75 md:min-h-87 lg:min-h-102 pt-20 md:pt-24 lg:pt-0">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.6 }} className="flex flex-col items-center gap-6 md:gap-8 max-w-[768px] w-full px-2">
            {/* Text Content */}
            <div className="flex flex-col items-center gap-4 md:gap-6 text-white text-center">
              <h1 className="font-[family-name:var(--font-bw-gradual)] text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.2]">{currentTab.headline}</h1>
              <p className="font-[family-name:var(--font-bw-gradual)] text-base md:text-lg lg:text-xl font-normal leading-[1.5]">{currentTab.description}</p>
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

      {/* Tabs Navigation - Desktop & Tablet */}
      <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }} className="hidden md:flex absolute bottom-16 lg:bottom-20 left-1/2 -translate-x-1/2 gap-3 md:gap-3 lg:gap-8 w-full max-w-[95%] lg:max-w-6xl z-20 px-4">
        {heroData.tabs.map((tab, index) => (
          <motion.div key={index} onClick={() => handleTabClick(index)} className="flex-1 flex flex-col items-center md:px-1 lg:px-4 cursor-pointer transition-all">
            <span className="font-[family-name:var(--font-bw-gradual)] text-sm md:text-base text-white text-center leading-[1.5] mb-3 md:mb-4">{tab.label}</span>

            {/* Progress bar container */}
            <div className="w-full h-1 bg-white/30 overflow-hidden">
              {/* Progress indicator */}
              {index === activeTab ? <motion.div className="h-full bg-white" initial={{ width: "0%" }} animate={{ width: `${progress}%` }} transition={{ duration: 0.05, ease: "linear" }} /> : index < activeTab ? <div className="h-full w-full bg-white" /> : null}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile Tab Indicators - Dots */}
      <div className="flex md:hidden absolute bottom-8 left-1/2 -translate-x-1/2 gap-2 z-20">
        {heroData.tabs.map((_, index) => (
          <button key={index} onClick={() => handleTabClick(index)} className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeTab ? "bg-white w-6" : "bg-white/40"}`} aria-label={`Go to slide ${index + 1}`} />
        ))}
      </div>
    </section>
  );
}
