"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { burgerSpringTransition } from "@/lib/animations";

interface BurgerButtonProps {
  /** Whether the menu is open */
  isOpen: boolean;
  onClick: () => void;
  /** Additional class names */
  className?: string;
}

export default function BurgerButton({ isOpen, onClick, className = "" }: BurgerButtonProps) {
  const containerVariants = useMemo(
    () => ({
      menu: { rotate: 0, transition: burgerSpringTransition },
      close: { rotate: 180, transition: burgerSpringTransition },
    }),
    [],
  );

  const topLineVariants = useMemo(
    () => ({
      menu: {
        rotate: 0,
        x: 0,
        y: 0,
        width: "50%",
        transition: burgerSpringTransition,
      },
      close: {
        rotate: 45,
        x: "1.2px",
        y: "-2.4px",
        width: "55%",
        originX: 0,
        originY: 1,
        transition: burgerSpringTransition,
      },
    }),
    [],
  );

  const middleLineVariants = useMemo(
    () => ({
      menu: {
        rotate: 0,
        width: "100%",
        transition: burgerSpringTransition,
      },
      close: {
        rotate: -45,
        width: "110%",
        transition: burgerSpringTransition,
      },
    }),
    [],
  );

  const bottomLineVariants = useMemo(
    () => ({
      menu: {
        rotate: 0,
        x: 0,
        y: 0,
        width: "50%",
        transition: burgerSpringTransition,
      },
      close: {
        rotate: 45,
        x: "-1.2px",
        y: "2.4px",
        width: "55%",
        originX: 1,
        originY: 0,
        transition: burgerSpringTransition,
      },
    }),
    [],
  );

  const animationState = isOpen ? "close" : "menu";

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-9 h-9 cursor-pointer rounded-full ${className}`}
      style={{
        background: "oklch(100% 0 0)",
        border: "none",
        padding: "8px",
      }}
      aria-label={isOpen ? "Luk menu" : "Åbn menu"}
      aria-expanded={isOpen}
    >
      <motion.div variants={containerVariants} animate={animationState} className="flex flex-col items-center justify-center w-full h-full" style={{ gap: "4px" }}>
        <motion.div variants={topLineVariants} animate={animationState} className="h-0.5 rounded-full self-start" style={{ backgroundColor: "oklch(0% 0 0)" }} />
        <motion.div variants={middleLineVariants} animate={animationState} className="h-0.5 rounded-full" style={{ backgroundColor: "oklch(0% 0 0)" }} />
        <motion.div variants={bottomLineVariants} animate={animationState} className="h-0.5 rounded-full self-end" style={{ backgroundColor: "oklch(0% 0 0)" }} />
      </motion.div>
    </button>
  );
}
