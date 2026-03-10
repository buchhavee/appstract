"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface GradientCheckmarkProps {
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-12 h-12",
  md: "w-20 h-20",
  lg: "w-28 h-28",
};

const iconSizes = {
  sm: "w-6 h-6",
  md: "w-10 h-10",
  lg: "w-14 h-14",
};

export default function GradientCheckmark({ size = "md" }: GradientCheckmarkProps) {
  return (
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }} className={`${sizeClasses[size]} rounded-full flex items-center justify-center`} style={{ background: "var(--gradient-primary)" }}>
      <Check className={`${iconSizes[size]} text-white`} strokeWidth={3} />
    </motion.div>
  );
}
