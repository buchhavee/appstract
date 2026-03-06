"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import heroData from "@/data/hero.json";
import { Button, LiquidBackground } from "@/components/ui";

const TAB_DURATION = 10000;
const PAUSE_AFTER_CLICK = 5000;
const SWIPE_THRESHOLD = 50;

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
          <Image src={tab.image} alt="Hero background" fill className="object-cover" style={{ objectPosition: tab.objectPosition || "center center" }} priority={index === 0} />
          {/* Overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(255,255,255,0.1) 100%)" }} />
          {/* Liquid gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-[30%]" style={{ maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 100%)" }}>
            <LiquidBackground opacity={0.3} speed={0.6} />
          </div>
        </motion.div>
      ))}

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-360 w-full min-h-75 md:min-h-87 lg:min-h-102 pt-64 md:pt-72 lg:pt-64">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.6 }} className="flex flex-col items-center gap-6 md:gap-8 max-w-5xl w-full px-2">
            {/* Text Content */}
            <div className="flex flex-col items-center gap-4 md:gap-6 text-white text-center">
              <h1 className="font-bold text-pretty leading-tight" style={{ fontSize: "clamp(1.75rem, 5vw + 1rem, 4rem)" }}>
                {currentTab.headline}
              </h1>
              <p className="font-normal leading-relaxed text-pretty text-white/90 max-w-2xl" style={{ fontSize: "clamp(0.875rem, 1vw + 0.5rem, 1.125rem)" }}>
                {currentTab.description}
              </p>
            </div>

            {/* CTA Button */}
            {/* <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <Button href={heroData.cta.href} variant="expand" size="md">
                {heroData.cta.label}
              </Button>
            </motion.div> */}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tabs Navigation - Desktop & Tablet */}
      <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }} className="hidden md:flex absolute bottom-16 lg:bottom-20 left-1/2 -translate-x-1/2 gap-3 md:gap-3 lg:gap-8 w-full max-w-[95%] lg:max-w-6xl z-10 px-4">
        {heroData.tabs.map((tab, index) => (
          <motion.div key={index} onClick={() => handleTabClick(index)} className="flex-1 flex flex-col items-center md:px-1 lg:px-4 cursor-pointer transition-all">
            <span className={`text-sm md:text-base text-center leading-normal mb-3 md:mb-4 transition-opacity duration-500 ${index === activeTab ? "text-white" : "text-white/60"}`}>{tab.label}</span>

            {/* Progress bar container */}
            <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
              {/* Progress indicator */}
              {index === activeTab ? <motion.div className="h-full" style={{ background: "linear-gradient(to right, #6d5efc, #4cc9f0)" }} initial={{ width: "0%" }} animate={{ width: `${progress}%` }} transition={{ duration: 0.05, ease: "linear" }} /> : index < activeTab ? <div className="h-full w-full bg-white/00" /> : null}
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
