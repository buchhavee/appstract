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
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchEndRef = useRef<number | null>(null);
  const isHorizontalSwipeRef = useRef(false);

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
    touchStartRef.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
    touchEndRef.current = null;
    isHorizontalSwipeRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;

    const currentX = e.targetTouches[0].clientX;
    const currentY = e.targetTouches[0].clientY;
    const diffX = Math.abs(currentX - touchStartRef.current.x);
    const diffY = Math.abs(currentY - touchStartRef.current.y);

    // Once we detect a predominantly horizontal swipe, lock it in and prevent vertical scroll
    if (!isHorizontalSwipeRef.current && diffX > 10 && diffX > diffY * 1.2) {
      isHorizontalSwipeRef.current = true;
    }

    if (isHorizontalSwipeRef.current) {
      e.preventDefault();
    }

    touchEndRef.current = currentX;
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) {
      touchStartRef.current = null;
      touchEndRef.current = null;
      isHorizontalSwipeRef.current = false;
      return;
    }

    const distance = touchStartRef.current.x - touchEndRef.current;
    const isSwipe = Math.abs(distance) > SWIPE_THRESHOLD;

    if (isSwipe && isHorizontalSwipeRef.current) {
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
    isHorizontalSwipeRef.current = false;
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
    <section className="relative z-1 w-full h-svh flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 bg-primary-purple overflow-hidden" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      {/* Background Images */}
      {heroData.tabs.map((tab, index) => (
        <motion.div key={index} initial={false} animate={{ opacity: index === activeTab ? 1 : 0 }} transition={{ duration: 0.8 }} className="absolute inset-0 w-full h-full" style={{ zIndex: index === activeTab ? 1 : 0 }}>
          <Image src={tab.image} alt="Hero background" fill className="object-cover" style={{ objectPosition: tab.objectPosition || "center center" }} priority={index === 0} />
          {/* Overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(255,255,255,0.1) 100%)" }} />
          {/* Liquid overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-[30%]" style={{ maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 100%)" }}>
            <LiquidBackground opacity={0.3} speed={0.6} />
          </div>
        </motion.div>
      ))}

      {/* Purple gradient overlay */}
      <motion.div
        initial={{ y: "-20%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.6, ease: "easeOut", delay: 0.2 }}
        className="absolute top-0 left-0 w-full z-2 pointer-events-none"
        style={{
          height: "130px",
          background: `linear-gradient(to bottom,
            rgba(109,94,252,1)   0%,
            rgba(109,94,252,0.7) 10%,
            rgba(109,94,252,0.5) 22%,
            rgba(109,94,252,0.35) 38%,
            rgba(109,94,252,0.2) 57%,
            rgba(109,94,252,0.05) 75%,
            rgba(109,94,252,0)   100%
          )`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-360 w-full min-h-75 md:min-h-87 lg:min-h-102 pt-64 md:pt-72 lg:pt-64">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.6 }} className="flex flex-col items-center gap-6 md:gap-8 max-w-5xl w-full px-2">
            <div className="flex flex-col items-center gap-4 md:gap-6 text-white text-center">
              <h1 className="font-bold text-pretty font-bw-gradual leading-tight" style={{ fontSize: "clamp(1.75rem, 5vw + 1rem, 4rem)" }}>
                {currentTab.headline}
              </h1>
              <p className="font-normal leading-relaxed font-bw-gradual text-pretty text-white/90 max-w-2xl" style={{ fontSize: "clamp(0.875rem, 1vw + 0.5rem, 1.125rem)" }}>
                {currentTab.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tabs - Desktop */}
      <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }} className="hidden md:flex absolute bottom-16 lg:bottom-20 left-1/2 -translate-x-1/2 gap-3 md:gap-3 lg:gap-8 w-full max-w-[95%] lg:max-w-6xl z-10 px-4">
        {heroData.tabs.map((tab, index) => (
          <motion.div key={index} onClick={() => handleTabClick(index)} className="flex-1 flex flex-col items-center md:px-1 lg:px-4 cursor-pointer transition-all">
            <span className={`text-sm md:text-base text-nowrap text-center font-bw-gradual leading-normal mb-3 md:mb-4 transition-opacity duration-500 ${index === activeTab ? "text-white" : "text-white/60"}`}>{tab.label}</span>

            {/* Progress bar */}
            <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
              {/* Progress fill */}
              {index === activeTab ? <motion.div className="h-full" style={{ background: "linear-gradient(to right, var(--color-primary-purple), var(--color-primary-cyan))" }} initial={{ width: "0%" }} animate={{ width: `${progress}%` }} transition={{ duration: 0.05, ease: "linear" }} /> : index < activeTab ? <div className="h-full w-full bg-white/00" /> : null}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Tabs - Mobile */}
      <div className="flex md:hidden absolute bottom-8 left-1/2 -translate-x-1/2 gap-2 z-20">
        {heroData.tabs.map((_, index) => (
          <button key={index} onClick={() => handleTabClick(index)} className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeTab ? "bg-white w-6" : "bg-white/40"}`} aria-label={`Go to slide ${index + 1}`} />
        ))}
      </div>
    </section>
  );
}
