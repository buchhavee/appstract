"use client";

import { ReactNode, useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Lenis from "lenis";

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const { scrollYProgress } = useScroll();
  const lenisRef = useRef<Lenis | null>(null);

  // Create a smooth spring-based scroll indicator
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Listen for modal open/close events
  useEffect(() => {
    const handleModalOpen = () => {
      if (lenisRef.current) {
        lenisRef.current.stop();
      }
    };

    const handleModalClose = () => {
      if (lenisRef.current) {
        lenisRef.current.start();
      }
    };

    window.addEventListener("modalOpen", handleModalOpen);
    window.addEventListener("modalClose", handleModalClose);

    const handleScrollTo = (e: Event) => {
      const target = (e as CustomEvent<string>).detail;
      if (lenisRef.current && target) {
        lenisRef.current.scrollTo(target, { offset: -80 });
      }
    };
    window.addEventListener("smoothScrollTo", handleScrollTo);

    return () => {
      window.removeEventListener("modalOpen", handleModalOpen);
      window.removeEventListener("modalClose", handleModalClose);
      window.removeEventListener("smoothScrollTo", handleScrollTo);
    };
  }, []);

  return (
    <>
      {/* Progress bar indicator */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-[#6d5efc] to-[#4cc9f0] origin-left z-50" style={{ scaleX }} />
      {children}
    </>
  );
}
