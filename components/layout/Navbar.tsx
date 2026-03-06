"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Button } from "@/components/ui";
import MobileMenu from "./MobileMenu";
import navbarData from "@/data/navbar.json";

// Kinetic easing curve from SterlingGateKineticNavigation
const kineticEase: [number, number, number, number] = [0.65, 0.01, 0.05, 0.99];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const navItemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pendingScrollRef = useRef<string | null>(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const { scrollY } = useScroll();

  const burgerTransition = { type: "spring" as const, bounce: 0.2, duration: 0.8 };

  const burgerContainerVariants = useMemo(
    () => ({
      menu: { rotate: 0, transition: burgerTransition },
      close: { rotate: 180, transition: burgerTransition },
    }),
    [],
  );

  const topLineVariants = useMemo(
    () => ({
      menu: { rotate: 0, x: 0, y: 0, width: "50%", transition: burgerTransition },
      close: { rotate: 45, x: "1.2px", y: "-2.4px", width: "55%", originX: 0, originY: 1, transition: burgerTransition },
    }),
    [],
  );

  const middleLineVariants = useMemo(
    () => ({
      menu: { rotate: 0, width: "100%", transition: burgerTransition },
      close: { rotate: -45, width: "110%", transition: burgerTransition },
    }),
    [],
  );

  const bottomLineVariants = useMemo(
    () => ({
      menu: { rotate: 0, x: 0, y: 0, width: "50%", transition: burgerTransition },
      close: { rotate: 45, x: "-1.2px", y: "2.4px", width: "55%", originX: 1, originY: 0, transition: burgerTransition },
    }),
    [],
  );

  const measurePill = useCallback((index: number | null) => {
    if (index === null || !navContainerRef.current || !navItemRefs.current[index]) return;
    const containerRect = navContainerRef.current.getBoundingClientRect();
    const itemRect = navItemRefs.current[index]!.getBoundingClientRect();
    setPillStyle({
      left: itemRect.left - containerRect.left,
      width: itemRect.width,
    });
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Listen for modal open/close events
  useEffect(() => {
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);
    window.addEventListener("modalOpen", handleModalOpen);
    window.addEventListener("modalClose", handleModalClose);
    return () => {
      window.removeEventListener("modalOpen", handleModalOpen);
      window.removeEventListener("modalClose", handleModalClose);
    };
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      window.dispatchEvent(new CustomEvent("smoothScrollTo", { detail: href }));
    }
  };

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Prevent body scroll when mobile menu is open (also stop Lenis)
  useEffect(() => {
    if (mobileMenuOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      window.dispatchEvent(new Event("mobileMenuOpen"));
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      window.dispatchEvent(new Event("mobileMenuClose"));

      // If there's a pending scroll target, dispatch after Lenis restarts
      if (pendingScrollRef.current) {
        const href = pendingScrollRef.current;
        pendingScrollRef.current = null;
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("smoothScrollTo", { detail: href }));
        }, 200);
      }
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      window.dispatchEvent(new Event("mobileMenuClose"));
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: (hidden && !mobileMenuOpen) || modalOpen ? -100 : 0, opacity: modalOpen ? 0 : 1 }} transition={{ duration: 0.3, ease: "easeOut" }} className="fixed top-0 left-0 right-0 z-60 flex flex-col items-center justify-center h-19.5 px-4! md:px-8 lg:px-16">
        <div
          className="relative flex items-center justify-between gap-4 lg:gap-8 w-full max-w-screen-2xl h-15 rounded-[20px] overflow-hidden px-4 lg:px-5"
          style={{
            background: "rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(255, 255, 255, 0.1), inset 0 0 30px 15px rgba(255, 255, 255, 0.15)",
          }}
        >
          {/* Top gradient line */}
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
            }}
          />
          {/* Left gradient line */}
          <div
            className="absolute top-0 left-0 w-px h-full pointer-events-none"
            style={{
              background: "linear-gradient(180deg, rgba(255, 255, 255, 0.8), transparent, rgba(255, 255, 255, 0.3))",
            }}
          />

          {/* Logo */}
          <div className="flex items-center shrink-0">
            <Link href={navbarData.logo.href} className="flex items-center gap-2 lg:gap-3">
              <div className="relative w-8 h-8 lg:w-10 lg:h-10 rounded-[10px] overflow-hidden flex items-center justify-center">
                <Image src="/images/logo-icon.svg" alt="" width={40} height={40} className="object-contain" />
              </div>
              <Image src="/images/logo-text.svg" alt="Appstract" width={176} height={29} className="h-5 lg:h-7 w-auto object-contain" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 flex-col items-end min-w-0">
            <div ref={navContainerRef} className="relative flex items-center gap-1" onMouseLeave={() => setHoveredIndex(null)}>
              {/* Sliding pill indicator */}
              <AnimatePresence>{hoveredIndex !== null && <motion.div className="absolute top-0 bottom-0 rounded-full pointer-events-none" style={{ background: "rgba(255, 255, 255, 0.2)" }} initial={{ opacity: 0, left: pillStyle.left, width: pillStyle.width }} animate={{ opacity: 1, left: pillStyle.left, width: pillStyle.width }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }} layoutId="nav-pill" />}</AnimatePresence>

              {navbarData.links.map((link, index) => (
                <button
                  key={index}
                  ref={(el) => {
                    navItemRefs.current[index] = el;
                  }}
                  onClick={() => scrollToSection(link.href)}
                  onMouseEnter={() => {
                    setHoveredIndex(index);
                    measurePill(index);
                  }}
                  className="relative text-base font-medium leading-normal text-white! cursor-pointer px-4 py-2 rounded-full transition-colors duration-200 z-10"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex flex-col items-end justify-center shrink-0">
            <Button onClick={() => window.dispatchEvent(new Event("modalOpen"))} size="sm">
              {navbarData.cta.label}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden flex items-center justify-center w-9 h-9 cursor-pointer rounded-full" style={{ background: "rgba(255, 255, 255, 1)", border: "none", padding: "8px" }} aria-label={mobileMenuOpen ? "Luk menu" : "Åbn menu"} aria-expanded={mobileMenuOpen}>
            <motion.div variants={burgerContainerVariants} animate={mobileMenuOpen ? "close" : "menu"} className="flex flex-col items-center justify-center w-full h-full" style={{ gap: "4px" }}>
              {/* Top line - left aligned, short */}
              <motion.div variants={topLineVariants} animate={mobileMenuOpen ? "close" : "menu"} className="h-0.5 rounded-full self-start" style={{ backgroundColor: "rgb(0, 0, 0)" }} />
              {/* Middle line - full width */}
              <motion.div variants={middleLineVariants} animate={mobileMenuOpen ? "close" : "menu"} className="h-0.5 rounded-full" style={{ backgroundColor: "rgb(0, 0, 0)" }} />
              {/* Bottom line - right aligned, short */}
              <motion.div variants={bottomLineVariants} animate={mobileMenuOpen ? "close" : "menu"} className="h-0.5 rounded-full self-end" style={{ backgroundColor: "rgb(0, 0, 0)" }} />
            </motion.div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={(scrollTarget) => {
          if (scrollTarget) {
            pendingScrollRef.current = scrollTarget;
          }
          setMobileMenuOpen(false);
        }}
      />
    </>
  );
}
