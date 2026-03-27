"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Button, LiquidBackground } from "@/components/ui";
import { kineticEase } from "@/lib/animations";
import navbarData from "@/data/navbar.json";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: (scrollTarget?: string) => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const router = useRouter();
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
        opacity: 0,
        transition: { duration: 0.35, delay: (navbarData.links.length - i) * 0.04, ease: kineticEase },
      }),
      open: (i: number) => ({
        y: "0%",
        rotate: 0,
        opacity: 1,
        transition: { duration: 0.65, delay: 0.35 + i * 0.07, ease: kineticEase },
      }),
    }),
    [],
  );

  const buttonVariants = useMemo(
    () => ({
      closed: {
        y: "250%",
        rotate: 10,
        opacity: 0,
        transition: { duration: 0.35, delay: 0, ease: kineticEase },
      },
      open: {
        y: "0%",
        rotate: 0,
        opacity: 1,
        transition: { duration: 0.65, delay: 0.35 + navbarData.links.length * 0.07, ease: kineticEase },
      },
    }),
    [],
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark overlay */}
          <motion.div
            custom={0}
            variants={panelVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 left-0 right-0 z-40 lg:hidden"
            style={{
              height: "90dvh",
              background: "linear-gradient(to bottom, oklch(0% 0 0 / 0.5) 0%, oklch(0% 0 0 / 0.3) 60%, transparent 100%)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
              borderRadius: "0 0 25px 25px",
              cursor: "pointer",
              touchAction: "none",
            }}
            onClick={() => onClose()}
            onTouchMove={(e) => e.preventDefault()}
            aria-hidden="true"
          />

          {/* Sliding panel */}
          <aside
            className="fixed top-0 right-0 z-50 lg:hidden"
            style={{
              width: "100vw",
              height: "85dvh",
              overflow: "hidden",
              borderRadius: "0 0 25px 25px",
              touchAction: "none",
            }}
            onTouchMove={(e) => e.preventDefault()}
            aria-label="Menu"
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
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
                    background: "linear-gradient(to bottom, oklch(50.9% 0.269 273.3) 0%, oklch(78.2% 0.121 222.5 / 0.4) 100%)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    opacity: i === 0 ? 0.4 : i === 1 ? 0.6 : 1,
                    borderRadius: "0 0 25px 25px",
                    ...(i === 2
                      ? {
                          boxShadow: "0 20px 60px oklch(0% 0 0 / 0.5), 0 8px 24px oklch(0% 0 0 / 0.35), 0 4px 16px oklch(50.9% 0.269 273.3 / 0.25), inset 0 -1px 0 oklch(100% 0 0 / 0.02)",
                          borderBottom: "1px solid oklch(78.2% 0.121 222.5 / 0.9)",
                        }
                      : {}),
                  }}
                />
              ))}
            </div>

            {/* Liquid background overlay */}
            <motion.div
              custom={2}
              variants={panelVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "40%",
                borderRadius: "0 0 25px 25px",
                overflow: "hidden",
                zIndex: 1,
                pointerEvents: "none",
                maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
              }}
            >
              <LiquidBackground opacity={0.3} speed={0.3} />
            </motion.div>

            {/* Navigation links */}
            <motion.nav className="relative flex flex-col justify-center h-full" style={{ zIndex: 34, padding: "72px 32px 40px" }} initial={{ x: "101%" }} animate={{ x: "0%" }} exit={{ x: "101%" }} transition={{ duration: 0.55, delay: 0.2, ease: kineticEase }}>
              <ul className="list-none m-0 p-0 flex flex-col gap-1">
                {navbarData.links.map((link, i) => (
                  <li key={`${link.label}-${i}`} style={{ overflow: "hidden" }}>
                    <motion.div custom={i} variants={linkVariants} initial="closed" animate="open" exit="closed">
                      <button
                        onClick={() => {
                          if (link.href.startsWith("http")) {
                            window.open(link.href, "_blank", "noopener,noreferrer");
                            onClose();
                          } else if (link.href.startsWith("/")) {
                            onClose();
                            router.push(link.href);
                          } else {
                            onClose(link.href);
                          }
                        }}
                        className="block w-full text-left cursor-pointer"
                        style={{
                          textDecoration: "none",
                          padding: "14px 0",
                          background: "none",
                          border: "none",
                          borderBottomWidth: 1,
                          borderBottomStyle: "solid",
                          borderBottomColor: "oklch(100% 0 0 / 0.06)",
                        }}
                      >
                        <span className="text-white text-4xl sm:text-5xl font-bw-gradual font-normal tracking-tight leading-none transition-colors duration-250 inline-flex items-center gap-2" style={{ letterSpacing: "-0.02em" }} onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(58.5% 0.204 277.1)")} onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(100% 0 0)")}>
                          {link.label}
                          {(link as { external?: boolean }).external && <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8" />}
                        </span>
                      </button>
                    </motion.div>
                  </li>
                ))}
              </ul>

              <div style={{ overflow: "hidden" }} className="mt-10 pb-6">
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
