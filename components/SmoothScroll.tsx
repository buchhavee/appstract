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

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false, // Native scroll on iOS – required for Safari address bar transparency (default, but explicit)
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
    window.addEventListener("mobileMenuOpen", handleModalOpen);
    window.addEventListener("mobileMenuClose", handleModalClose);

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
      window.removeEventListener("mobileMenuOpen", handleModalOpen);
      window.removeEventListener("mobileMenuClose", handleModalClose);
      window.removeEventListener("smoothScrollTo", handleScrollTo);
    };
  }, []);

  return (
    <>
      {/* Progress bar indicator */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 origin-left z-50" style={{ background: "linear-gradient(to right, var(--color-primary-purple), var(--color-primary-cyan))", scaleX }} />
      {children}
    </>
  );
}
