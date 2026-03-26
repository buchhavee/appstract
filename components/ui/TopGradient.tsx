"use client";

import { motion } from "framer-motion";

export default function TopGradient() {
  return (
    <motion.div
      initial={{ y: "-20%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1.6, ease: "easeOut", delay: 0.2 }}
      className="absolute top-0 left-0 w-full z-2 pointer-events-none"
      style={{
        height: "130px",
        background: `linear-gradient(to bottom,
          rgba(67,58,251,1)   0%,
          rgba(67,58,251,0.7) 10%,
          rgba(67,58,251,0.5) 22%,
          rgba(67,58,251,0.35) 38%,
          rgba(67,58,251,0.2) 57%,
          rgba(67,58,251,0.05) 75%,
          rgba(67,58,251,0)   100%
        )`,
      }}
    />
  );
}
