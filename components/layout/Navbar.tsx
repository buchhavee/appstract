"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui";
import navbarData from "@/data/navbar.json";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: hidden && !mobileMenuOpen ? -100 : 0, opacity: 1 }} transition={{ duration: 0.3, ease: "easeOut" }} className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center justify-center h-[78px] px-4! md:px-8 lg:px-16">
        <div
          className="relative flex items-center justify-between gap-4 lg:gap-8 w-full max-w-328 h-15 rounded-[20px] overflow-hidden px-4 lg:px-5"
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
            <div className="flex items-center gap-8">
              {navbarData.links.map((link, index) => (
                <div key={index} className="flex items-center justify-center">
                  {link.hasDropdown ? (
                    <div className="flex flex-col items-start">
                      <Link href={link.href} className="group relative flex items-center justify-center gap-1 w-full text-base font-medium font-[family-name:var(--font-bw-gradual)] leading-[1.5] text-white!">
                        {link.label}
                        <ChevronDown className="w-5 h-5" />
                        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-white group-hover:w-full transition-all duration-300 ease-out" />
                      </Link>
                    </div>
                  ) : (
                    <Link href={link.href} className="group relative text-base font-medium font-[family-name:var(--font-bw-gradual)] leading-[1.5] text-white!">
                      {link.label}
                      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-white group-hover:w-full transition-all duration-300 ease-out" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex flex-col items-end justify-center shrink-0">
            <Button href={navbarData.cta.href} size="sm">
              {navbarData.cta.label}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden flex items-center justify-center w-10 h-10 text-white" aria-label={mobileMenuOpen ? "Luk menu" : "Åbn menu"}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-40 lg:hidden">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />

            {/* Menu Content */}
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="absolute top-0 right-0 h-full w-[80%] max-w-[320px] bg-[#1c1c1c] shadow-2xl">
              <div className="flex flex-col h-full pt-24 px-6 pb-8">
                {/* Navigation Links */}
                <nav className="flex flex-col gap-2">
                  {navbarData.links.map((link, index) => (
                    <motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                      <Link href={link.href} onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between py-4 text-lg font-medium font-[family-name:var(--font-bw-gradual)] text-white border-b border-white/10">
                        {link.label}
                        {link.hasDropdown && <ChevronDown className="w-5 h-5" />}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* CTA Button */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8">
                  <Button href={navbarData.cta.href} size="md" className="w-full">
                    {navbarData.cta.label}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
