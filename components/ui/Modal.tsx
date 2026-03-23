"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** Tailwind max-width class for the panel, e.g. "max-w-5xl" */
  maxWidth?: string;
  /** Extra classes appended to the white panel */
  panelClassName?: string;
}

export default function Modal({ open, onClose, children, maxWidth = "max-w-3xl md:max-w-4xl lg:max-w-5xl", panelClassName = "" }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const modal = (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.25 }} className="fixed inset-0 z-[9999] flex items-center justify-center bg-linear-to-br from-violet-500/30 to-cyan-400/60 backdrop-blur-sm shadow-2xl overflow-hidden" style={{ touchAction: "none", overscrollBehavior: "contain" }} onClick={onClose} onWheel={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()}>
          <motion.div className={`bg-white lg:pr-8 md:rounded-2xl shadow-lg ${maxWidth} w-full flex flex-col md:flex-row relative max-h-dvh overflow-y-auto mx-0 h-full md:h-auto ${panelClassName}`} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: 0.25 }} onClick={(e) => e.stopPropagation()}>
            {/* Desktop Back Button */}
            <button className="hidden md:flex flex-col items-center justify-start gap-1 pt-12 px-5 text-neutral-medium hover:text-black transition-colors cursor-pointer shrink-0" onClick={onClose} aria-label="Back">
              <ChevronLeft className="w-4 h-4" />
              <span className="text-[10px] font-medium uppercase tracking-wider">Back</span>
            </button>

            <div className="flex flex-col gap-6 md:gap-8 p-6 md:p-12 flex-1 min-w-0">
              {/* Mobile Back Button */}
              <button className="flex md:hidden items-center gap-1 text-neutral-medium hover:text-black transition-colors cursor-pointer self-start" onClick={onClose} aria-label="Back">
                <ChevronLeft className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Back</span>
              </button>

              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(modal, document.body);
}
