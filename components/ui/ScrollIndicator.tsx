"use client";

import { motion } from "framer-motion";

const DELAY = 2;
const ANIM_SPEED = 1;
const PAUSE = 1;
const MOUSE_WIDTH = 25;
const MOUSE_HEIGHT = 44;
const DOT_SIZE = 5;

export default function ScrollIndicator() {
  const animDistance = Math.min(MOUSE_WIDTH, MOUSE_HEIGHT) * 0.25;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: DELAY }} className="flex items-center justify-center">
      {/* Mouse outline */}
      <motion.div
        style={{
          width: MOUSE_WIDTH,
          height: MOUSE_HEIGHT,
          border: "2px solid rgba(255, 255, 255, 0.5)",
          borderRadius: "100px",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          paddingTop: Math.min(MOUSE_WIDTH, MOUSE_HEIGHT) * 0.25,
        }}
        animate={{
          borderColor: ["rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 0.7)", "rgba(255, 255, 255, 0.5)"],
        }}
        transition={{
          duration: ANIM_SPEED,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: PAUSE,
          delay: DELAY,
        }}
      >
        {/* Trackball */}
        <motion.div
          style={{
            width: DOT_SIZE,
            height: DOT_SIZE,
            borderRadius: "50%",
            backgroundColor: "#ffffff",
          }}
          animate={{ y: [0, animDistance, 0] }}
          transition={{
            duration: ANIM_SPEED,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: PAUSE,
            delay: DELAY,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
