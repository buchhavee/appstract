"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

const SCALE = 0.8;
const GAP = 5;
const DRIFT = 14 * (SCALE / 0.8);
const CHEVRON_W = 18 * SCALE;
const CHEVRON_H = 9 * SCALE;

const chevronAnim = {
  y: [0, 0, DRIFT, DRIFT, DRIFT, DRIFT, 0],
  opacity: [0, 1, 1, 0.6, 0.85, 0, 0],
  transition: {
    duration: 1.8,
    repeat: Infinity,
    repeatType: "loop" as const,
    ease: "easeInOut" as const,
    times: [0, 0.167, 0.5, 0.583, 0.667, 0.833, 1],
  },
};

const glowAnim = {
  filter: ["drop-shadow(0 0 0px rgba(255,255,255,0))", `drop-shadow(0 0 ${2 * SCALE}px rgba(255,255,255,0.35))`, `drop-shadow(0 0 ${2 * SCALE}px rgba(255,255,255,0.2))`, `drop-shadow(0 0 ${4 * SCALE}px rgba(255,255,255,0.4))`, `drop-shadow(0 0 ${4 * SCALE}px rgba(255,255,255,0.4))`, "drop-shadow(0 0 0px rgba(255,255,255,0))", "drop-shadow(0 0 0px rgba(255,255,255,0))"],
  transition: {
    duration: 1.8,
    repeat: Infinity,
    repeatType: "loop" as const,
    ease: "easeInOut" as const,
    times: [0, 0.167, 0.5, 0.583, 0.667, 0.833, 1],
  },
};

export default function ScrollIndicator() {
  const glowControls = useAnimationControls();
  const chevron1 = useAnimationControls();
  const chevron2 = useAnimationControls();

  useEffect(() => {
    glowControls.start(glowAnim);
    chevron1.start(chevronAnim);
    chevron2.start(chevronAnim);
  }, [glowControls, chevron1, chevron2]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <motion.div
        animate={glowControls}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: `${GAP}px`,
        }}
      >
        <motion.svg animate={chevron1} width={CHEVRON_W} height={CHEVRON_H} viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.5 1.5L9 7.5L16.5 1.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
        <motion.svg animate={chevron2} width={CHEVRON_W} height={CHEVRON_H} viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.5 1.5L9 7.5L16.5 1.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.div>
    </div>
  );
}
