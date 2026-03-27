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
          oklch(50.9% 0.269 273.3)   0%,
          oklch(50.9% 0.269 273.3 / 0.5) 10%,
          oklch(50.9% 0.269 273.3 / 0.4) 22%,
          oklch(50.9% 0.269 273.3 / 0.3) 38%,
          oklch(50.9% 0.269 273.3 / 0.15) 57%,
          oklch(50.9% 0.269 273.3 / 0.05) 75%,
          oklch(50.9% 0.269 273.3 / 0)   100%
        )`,
      }}
    />
  );
}
