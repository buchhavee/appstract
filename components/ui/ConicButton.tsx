"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ConicButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  borderColor?: string;
  animationDuration?: number;
  blurRadius?: number;
  borderRadius?: number;
  backgroundColor?: string;
  overlayBorderColor?: string;
  overlayMargin?: number;
  textColor?: string;
}

export default function ConicButton({ children, onClick, className = "", borderColor = "#6D5EFC", animationDuration = 4, blurRadius = 2, borderRadius = 999, backgroundColor = "rgba(255, 255, 255, 0.1)", overlayBorderColor = "#6D5EFC", overlayMargin = 2, textColor = "white" }: ConicButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`group relative cursor-pointer ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        position: "relative",
        borderRadius: `${borderRadius}px`,
        minWidth: "12px",
        minHeight: "12px",
        background: "transparent",
        border: "none",
        padding: 0,
      }}
    >
      {/* Rotating conic gradient border - masked to only show border */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: `${borderRadius}px`,
          overflow: "hidden",
          // Mask to only show the border area
          WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMaskComposite: "xor",
          mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          maskComposite: "exclude",
          padding: `${overlayMargin}px`,
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            top: "-450%",
            left: 0,
            right: 0,
            bottom: 0,
            height: "1000%",
            background: `conic-gradient(transparent 200deg, ${borderColor})`,
            zIndex: 1,
          }}
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: animationDuration,
            ease: "linear",
            repeat: Infinity,
            repeatDelay: 0,
          }}
        />
      </div>

      {/* Inner overlay with backdrop blur */}
      <div
        style={{
          position: "absolute",
          top: `${overlayMargin}px`,
          left: `${overlayMargin}px`,
          right: `${overlayMargin}px`,
          bottom: `${overlayMargin}px`,
          backdropFilter: `blur(${blurRadius}px)`,
          WebkitBackdropFilter: `blur(${blurRadius}px)`,
          backgroundColor: backgroundColor,
          border: `1px solid ${overlayBorderColor}`,
          borderRadius: `${Math.max(0, borderRadius - overlayMargin)}px`,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Content layer */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px 32px",
        }}
      >
        <span
          className="font-medium"
          style={{
            color: textColor,
            textAlign: "center",
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          {children}
        </span>
      </div>
    </motion.button>
  );
}
