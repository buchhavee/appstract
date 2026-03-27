"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import { ArrowUpRight } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

interface DesktopNavLinksProps {
  /** Array of navigation links */
  links: NavLink[];
  /** Callback when a link is clicked */
  onLinkClick: (href: string) => void;
  /** Additional class names for the container */
  className?: string;
}

export default function DesktopNavLinks({ links, onLinkClick, className = "" }: DesktopNavLinksProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const navContainerRef = useRef<HTMLDivElement>(null);
  const navItemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const measurePill = useCallback((index: number | null) => {
    if (index === null || !navContainerRef.current || !navItemRefs.current[index]) return;
    const containerRect = navContainerRef.current.getBoundingClientRect();
    const itemRect = navItemRefs.current[index]!.getBoundingClientRect();
    setPillStyle({
      left: itemRect.left - containerRect.left,
      width: itemRect.width,
    });
  }, []);

  const setNavItemRef = useCallback((el: HTMLButtonElement | null, index: number) => {
    navItemRefs.current[index] = el;
  }, []);

  return (
    <div ref={navContainerRef} className={`relative flex items-center gap-1 ${className}`} onMouseLeave={() => setHoveredIndex(null)}>
      {/* Sliding pill indicator */}
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            className="absolute top-0 bottom-0 rounded-full pointer-events-none"
            style={{ background: "oklch(100% 0 0 / 0.2)" }}
            initial={{ opacity: 0, left: pillStyle.left, width: pillStyle.width }}
            animate={{ opacity: 1, left: pillStyle.left, width: pillStyle.width }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
              mass: 0.8,
            }}
            layoutId="nav-pill"
          />
        )}
      </AnimatePresence>

      {links.map((link, index) => (
        <button
          key={index}
          ref={(el) => setNavItemRef(el, index)}
          onClick={() => onLinkClick(link.href)}
          onMouseEnter={() => {
            setHoveredIndex(index);
            measurePill(index);
          }}
          className="relative text-base font-bw-gradual font-medium leading-normal text-white! cursor-pointer px-4 py-2 rounded-full transition-colors duration-200 z-10 flex items-center gap-1"
        >
          {link.label}
          {link.external && <ArrowUpRight className="w-3.5 h-3.5 opacity-60 -ml-0.5" strokeWidth={2.5} />}
        </button>
      ))}
    </div>
  );
}
