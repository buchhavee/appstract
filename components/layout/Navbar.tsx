"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button, Logo, BurgerButton, DesktopNavLinks } from "@/components/ui";
import MobileMenu from "./MobileMenu";
import { useBodyScrollLockWithPendingScroll } from "@/lib/hooks";
import navbarData from "@/data/navbar.json";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const pendingScrollRef = useRef<string | null>(null);
  const scrollUpAccumulator = useRef(0);
  const { scrollY } = useScroll();

  const router = useRouter();
  const pathname = usePathname();

  const SCROLL_UP_THRESHOLD = 30;

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 100) {
      scrollUpAccumulator.current = 0;
      setHidden(true);
    } else {
      scrollUpAccumulator.current += previous - latest;
      if (scrollUpAccumulator.current >= SCROLL_UP_THRESHOLD || latest <= 100) {
        setHidden(false);
        scrollUpAccumulator.current = 0;
      }
    }
  });

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

  useBodyScrollLockWithPendingScroll(mobileMenuOpen, pendingScrollRef);

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      window.dispatchEvent(new CustomEvent("smoothScrollTo", { detail: href }));
    } else if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      router.push(href);
    }
  };

  const handleMobileMenuClose = (scrollTarget?: string) => {
    if (scrollTarget) {
      pendingScrollRef.current = scrollTarget;
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: (hidden && !mobileMenuOpen) || modalOpen ? -100 : 0, opacity: modalOpen ? 0 : 1 }} transition={{ duration: 0.3, ease: "easeOut" }} className="fixed top-0 left-0 right-0 z-60 flex flex-col items-center justify-center h-19.5 px-4! md:px-8 lg:px-16">
        <div
          className="relative flex items-center justify-between gap-4 lg:gap-8 w-full max-w-screen-2xl h-15 rounded-[20px] overflow-hidden px-4 lg:px-5"
          style={{
            background: "oklch(0% 0 0 / 0.3)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid oklch(100% 0 0 / 0.3)",
            boxShadow: "0 8px 32px oklch(0% 0 0 / 0.1), inset 0 1px 0 oklch(100% 0 0 / 0.5), inset 0 -1px 0 oklch(100% 0 0 / 0.1), inset 0 0 30px 15px oklch(100% 0 0 / 0.15)",
          }}
        >
          {/* Top gradient line */}
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent, oklch(100% 0 0 / 0.3), transparent)",
            }}
          />
          {/* Left gradient line */}
          <div
            className="absolute top-0 left-0 w-px h-full pointer-events-none"
            style={{
              background: "linear-gradient(180deg, oklch(100% 0 0 / 0.8), transparent, oklch(100% 0 0 / 0.3))",
            }}
          />

          {/* Logo */}
          <div className="flex items-center shrink-0">
            <Logo
              href={navbarData.logo.href}
              size="lg"
              onClick={(e) => {
                e.preventDefault();
                if (pathname === "/") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  router.push("/");
                }
              }}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 flex-col items-end min-w-0">
            <DesktopNavLinks links={navbarData.links} onLinkClick={scrollToSection} />
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex flex-col items-end justify-center shrink-0">
            <Button onClick={() => window.dispatchEvent(new Event("modalOpen"))} size="sm">
              {navbarData.cta.label}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <BurgerButton isOpen={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={handleMobileMenuClose} />
    </>
  );
}
