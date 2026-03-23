"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import { Button } from "@/components/ui";
import { kineticEase } from "@/lib/animations";
import navbarData from "@/data/navbar.json";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: (scrollTarget?: string) => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const panelVariants = useMemo(
    () => ({
      closed: (i: number) => ({
        x: "101%",
        transition: { duration: 0.42, delay: (2 - i) * 0.06, ease: kineticEase },
      }),
      open: (i: number) => ({
        x: "0%",
        transition: { duration: 0.55, delay: i * 0.1, ease: kineticEase },
      }),
    }),
    [],
  );

  const linkVariants = useMemo(
    () => ({
      closed: (i: number) => ({
        y: "140%",
        rotate: 10,
        transition: { duration: 0.35, delay: (navbarData.links.length - i) * 0.04, ease: kineticEase },
      }),
      open: (i: number) => ({
        y: "0%",
        rotate: 0,
        transition: { duration: 0.55, delay: 0.3 + i * 0.06, ease: kineticEase },
      }),
    }),
    [],
  );

  const buttonVariants = useMemo(
    () => ({
      closed: {
        y: "250%",
        rotate: 10,
        transition: { duration: 0.35, delay: 0, ease: kineticEase },
      },
      open: {
        y: "0%",
        rotate: 0,
        transition: { duration: 0.55, delay: 0.3 + navbarData.links.length * 0.06, ease: kineticEase },
      },
    }),
    [],
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark overlay */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.45 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="fixed inset-0 z-40 lg:hidden" style={{ background: "#000", cursor: "pointer", touchAction: "none" }} onClick={() => onClose()} onTouchMove={(e) => e.preventDefault()} aria-hidden="true" />

          {/* Sliding panel */}
          <aside className="fixed top-0 right-0 z-50 lg:hidden" style={{ width: "100vw", height: "calc(100dvh - env(safe-area-inset-bottom, 0px))", overflow: "hidden", touchAction: "none" }} onTouchMove={(e) => e.preventDefault()} aria-label="Menu">
            <div style={{ position: "absolute", inset: 0 }}>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={panelVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "0 0 24px 24px",
                    background: "linear-gradient(to bottom, rgba(109, 94, 252, 1) 0%, rgba(76, 201, 240, 0.8) 100%)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    opacity: i === 0 ? 0.4 : i === 1 ? 0.6 : 1,
                  }}
                />
              ))}
            </div>

            {/* Navigation links */}
            <motion.nav className="relative flex flex-col justify-center h-full" style={{ zIndex: 34, padding: "72px 32px" }} initial={{ x: "101%" }} animate={{ x: "0%" }} exit={{ x: "101%" }} transition={{ duration: 0.55, delay: 0.2, ease: kineticEase }}>
              <ul className="list-none m-0 p-0 flex flex-col gap-1">
                {navbarData.links.map((link, i) => (
                  <li key={`${link.label}-${i}`} style={{ overflow: "hidden" }}>
                    <motion.div custom={i} variants={linkVariants} initial="closed" animate="open" exit="closed">
                      <button
                        onClick={() => {
                          onClose(link.href);
                        }}
                        className="block w-full text-left cursor-pointer"
                        style={{
                          textDecoration: "none",
                          padding: "14px 0",
                          background: "none",
                          border: "none",
                          borderBottomWidth: 1,
                          borderBottomStyle: "solid",
                          borderBottomColor: "rgba(255,255,255,0.06)",
                        }}
                      >
                        <span className="text-white text-4xl sm:text-5xl font-bw-gradual font-normal tracking-tight leading-none transition-colors duration-250" style={{ letterSpacing: "-0.02em" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#6366f1")} onMouseLeave={(e) => (e.currentTarget.style.color = "#fff")}>
                          {link.label}
                        </span>
                      </button>
                    </motion.div>
                  </li>
                ))}
              </ul>

              <div style={{ overflow: "hidden" }} className="mt-10 pb-4">
                <motion.div variants={buttonVariants} initial="closed" animate="open" exit="closed">
                  <Button
                    onClick={() => {
                      onClose();
                      window.dispatchEvent(new Event("modalOpen"));
                    }}
                    size="md"
                    className="w-full text-xl!"
                  >
                    {navbarData.cta.label}
                  </Button>
                </motion.div>
              </div>
            </motion.nav>
          </aside>
        </>
      )}
    </AnimatePresence>
  );
}
