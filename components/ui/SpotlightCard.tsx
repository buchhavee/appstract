"use client";

import { useRef, useState, ReactNode, CSSProperties } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  style?: CSSProperties;
}

export default function SpotlightCard({ children, className = "", spotlightColor = "rgba(146, 222, 246, 0.5)", style }: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div ref={divRef} onMouseMove={handleMouseMove} onFocus={handleFocus} onBlur={handleBlur} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={`relative rounded-3xl ${className}`} style={style}>
      {/* Spotlight effect */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 rounded-3xl overflow-hidden"
        style={{
          opacity,
          background: `radial-gradient(900px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 90%)`,
        }}
      />
      <div className="relative rounded-3xl h-full overflow-hidden">{children}</div>
    </div>
  );
}
