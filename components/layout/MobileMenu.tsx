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

const MENU_RADIUS = "0 0 25px 25px";
const MENU_SHADOW = "0 20px 60px oklch(0% 0 0 / 0.5), 0 8px 24px oklch(0% 0 0 / 0.35), 0 4px 16px oklch(50.9% 0.269 273.3 / 0.25)";

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const router = useRouter();

  const panelVariants = useMemo(
    () => ({
      closed: (i: number) => ({
        x: "101%",
        transition: { duration: 0.42, delay: (2 - i) * 0.05, ease: kineticEase },
      }),
      open: (i: number) => ({
        x: "0%",
        transition: { duration: 0.55, delay: i * 0.1, ease: kineticEase },
      }),
    }),
    [],
  );

  const overlayVariants = useMemo(
    () => ({
      closed: { x: "101%", transition: { duration: 0.42, ease: kineticEase } },
      open: { x: "0%", transition: { duration: 0.5, ease: kineticEase } },
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
        transition: { duration: 0.35, ease: kineticEase },
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

  const handleNavigate = (href: string) => {
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
      onClose();
    } else if (href.startsWith("/")) {
      onClose();
      router.push(href);
    } else {
      onClose(href);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 left-0 right-0 z-40 lg:hidden cursor-pointer"
            style={{
              height: "90dvh",
              background: "linear-gradient(to bottom, oklch(0% 0 0 / 0.5) 0%, oklch(0% 0 0 / 0.3) 60%, transparent 100%)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
              borderRadius: MENU_RADIUS,
              touchAction: "none",
            }}
            onClick={() => onClose()}
            onTouchMove={(e) => e.preventDefault()}
            aria-hidden="true"
          />

          <motion.div
            custom={2}
            variants={panelVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 z-40 lg:hidden pointer-events-none"
            style={{
              width: "100vw",
              height: "85dvh",
              borderRadius: MENU_RADIUS,
              boxShadow: MENU_SHADOW,
            }}
            aria-hidden="true"
          />

          {/* Sliding panel */}
          <aside className="fixed top-0 right-0 z-50 lg:hidden w-screen overflow-hidden" style={{ height: "85dvh", borderRadius: MENU_RADIUS, touchAction: "none" }} onTouchMove={(e) => e.preventDefault()} aria-label="Menu">
            {/* Stacked layers create a cascading-reveal effect */}
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
                  borderRadius: MENU_RADIUS,
                  ...(i === 2 && {
                    borderBottom: "1px solid oklch(78.2% 0.121 222.5 / 0.9)",
                  }),
                }}
              />
            ))}

            {/* Liquid background overlay */}
            <motion.div
              custom={2}
              variants={panelVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden"
              style={{
                height: "40%",
                borderRadius: MENU_RADIUS,
                zIndex: 1,
                maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
              }}
            >
              <LiquidBackground opacity={0.3} speed={0.3} />
            </motion.div>

            {/* Navigation links */}
            <motion.nav className="relative flex flex-col justify-center h-full" style={{ zIndex: 2, padding: "72px 32px 40px" }} initial={{ x: "101%" }} animate={{ x: "0%" }} exit={{ x: "101%" }} transition={{ duration: 0.55, delay: 0.2, ease: kineticEase }}>
              <ul className="list-none m-0 p-0 flex flex-col gap-1">
                {navbarData.links.map((link, i) => (
                  <li key={`${link.label}-${i}`} className="overflow-hidden">
                    <motion.div custom={i} variants={linkVariants} initial="closed" animate="open" exit="closed">
                      <button onClick={() => handleNavigate(link.href)} className="group block w-full text-left cursor-pointer bg-transparent border-0 py-3.5" style={{ borderBottom: "1px solid oklch(100% 0 0 / 0.06)" }}>
                        <span className="text-white text-4xl sm:text-5xl font-bw-gradual font-normal leading-none transition-colors duration-250 inline-flex items-center gap-2" style={{ letterSpacing: "-0.02em" }}>
                          {link.label}
                          {(link as { external?: boolean }).external && <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8" />}
                        </span>
                      </button>
                    </motion.div>
                  </li>
                ))}
              </ul>

              <div className="mt-10 pb-6 overflow-hidden">
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
