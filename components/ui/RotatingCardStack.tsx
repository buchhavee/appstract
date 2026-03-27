"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Zap, Users, Gift, ShieldCheck, TrendingUp, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Users,
  Gift,
  ShieldCheck,
  TrendingUp,
};

interface CardItem {
  id: number;
  icon: string;
  title: string;
  iconBg: string;
  cardBg: string;
}

interface RotatingCardStackProps {
  items: CardItem[];
  autoRotate?: boolean;
  rotationInterval?: number;
  className?: string;
}

export default function RotatingCardStack({ items, autoRotate = true, rotationInterval = 3000, className = "" }: RotatingCardStackProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastClickTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!autoRotate || items.length <= 1) return;

    const startInterval = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        const timeSinceLastClick = Date.now() - lastClickTimeRef.current;
        // Only auto-rotate if at least rotationInterval + 2000ms has passed since last manual click
        if (timeSinceLastClick > rotationInterval + 2000) {
          setActiveIndex((prev) => (prev + 1) % items.length);
        }
      }, rotationInterval);
    };

    startInterval();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoRotate, items.length, rotationInterval]);

  const handleCardClick = (index: number) => {
    lastClickTimeRef.current = Date.now();
    setActiveIndex(index);
  };

  const getRelativePosition = (index: number) => {
    const diff = index - activeIndex;
    const halfLength = Math.floor(items.length / 2);

    if (diff > halfLength) return diff - items.length;
    if (diff < -halfLength) return diff + items.length;
    return diff;
  };

  return (
    <motion.div
      className={`relative w-full flex items-center justify-center ${className}`}
      style={{
        height: "100%",
        minHeight: "480px",
        perspective: "1200px",
        perspectiveOrigin: "center center",
      }}
      animate={{
        y: [0, -5, 0],
      }}
      transition={{
        repeat: Infinity,
        repeatType: "reverse",
        duration: 5,
        ease: "easeInOut",
      }}
    >
      {/* Glow effect behind cards */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          filter: "blur(80px)",
          opacity: 1,
        }}
      >
        <div
          className="w-full h-48 rounded-full"
          style={{
            maxWidth: "500px",
            background: "radial-gradient(ellipse, oklch(100% 0 0 / 0.15) 0%, oklch(85.9% 0.082 219.8 / 0.85) 25%, oklch(60.8% 0.219 292.7 / 0.6) 50%, oklch(58.8% 0.226 281.2 / 0.4) 70%, transparent 90%)",
          }}
        />
      </div>

      {items.map((item, index) => {
        const relativePos = getRelativePosition(index);
        const absPos = Math.abs(relativePos);
        const isActive = relativePos === 0;

        const yOffset = relativePos * 90;
        const zOffset = -absPos * 60;
        const scale = isActive ? 1.06 : 1 - absPos * 0.03;

        const rotateX = relativePos * -9;
        const rotateY = relativePos * 2.5;

        const shadowBlur = isActive ? 35 : 20 - absPos * 3;
        const shadowOpacity = isActive ? 0.3 : 0.18 - absPos * 0.03;
        const shadowY = isActive ? 24 : 14 - absPos * 2;

        const cardBlur = isActive ? 0 : absPos * 0.4;

        const staggerDelay = absPos * 0.08;

        let zIndexValue: number;
        if (isActive) {
          zIndexValue = 50;
        } else if (relativePos === -1) {
          zIndexValue = 40;
        } else if (relativePos === 1) {
          zIndexValue = 30;
        } else if (relativePos < 0) {
          zIndexValue = 20;
        } else {
          zIndexValue = 10;
        }

        const IconComponent = iconMap[item.icon];

        return (
          <motion.div
            key={item.id}
            className="absolute cursor-pointer"
            initial={false}
            animate={{
              y: yOffset,
              z: zOffset,
              scale: Math.max(scale, 0.85),
              rotateX: rotateX,
              rotateY: rotateY,
              filter: `blur(${cardBlur}px)`,
            }}
            transition={{
              type: "spring",
              stiffness: 55,
              damping: 17,
              mass: 0.9,
              delay: staggerDelay,
              filter: { duration: 0.25, delay: staggerDelay },
            }}
            style={{
              zIndex: zIndexValue,
              width: "100%",
              maxWidth: "440px",
              transformStyle: "preserve-3d",
              willChange: "transform, filter",
              backfaceVisibility: "hidden",
            }}
            onClick={() => handleCardClick(index)}
          >
            {/* Card */}
            <motion.div
              className="flex items-center gap-6 px-7 py-6 rounded-2xl relative"
              style={{
                background: `linear-gradient(145deg, ${item.cardBg} 0%, ${item.cardBg} 100%)`,
                boxShadow: `
                  0 ${shadowY}px ${shadowBlur}px oklch(0% 0 0 / ${shadowOpacity}),
                  0 ${shadowY / 3}px ${shadowBlur / 3}px oklch(0% 0 0 / ${shadowOpacity * 0.6}),
                  0 1px 3px oklch(0% 0 0 / 0.08),
                  inset 0 1px 0 oklch(100% 0 0 / ${isActive ? 0.5 : 0.25}),
                  inset 0 -1px 0 oklch(0% 0 0 / ${isActive ? 0.08 : 0.05})
                `,
                border: `1px solid oklch(100% 0 0 / ${isActive ? 0.35 : 0.15})`,
                borderBottom: `1px solid oklch(0% 0 0 / ${isActive ? 0.1 : 0.05})`,
              }}
              whileHover={
                isActive
                  ? {
                      scale: 1.02,
                      rotateX: 2,
                      rotateY: -2,
                      transition: { type: "spring", stiffness: 350, damping: 18 },
                    }
                  : {}
              }
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              {/* Top edge highlight */}
              <div
                className="absolute top-0 left-4 right-4 h-px pointer-events-none"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, oklch(100% 0 0 / ${isActive ? 0.6 : 0.3}) 20%, oklch(100% 0 0 / ${isActive ? 0.8 : 0.4}) 50%, oklch(100% 0 0 / ${isActive ? 0.6 : 0.3}) 80%, transparent 100%)`,
                }}
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
                style={{
                  background: isActive ? "linear-gradient(160deg, oklch(100% 0 0 / 0.2) 0%, oklch(100% 0 0 / 0.05) 30%, transparent 50%, oklch(0% 0 0 / 0.03) 100%)" : "linear-gradient(160deg, oklch(100% 0 0 / 0.1) 0%, transparent 40%, oklch(0% 0 0 / 0.05) 100%)",
                }}
              />

              {/* Bottom reflection */}
              <div
                className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none rounded-b-2xl"
                style={{
                  background: "linear-gradient(to top, oklch(0% 0 0 / 0.04) 0%, transparent 100%)",
                }}
              />

              {/* Icon */}
              <div
                className="shrink-0 w-16 h-16 rounded-xl flex items-center justify-center relative z-10"
                style={{
                  backgroundColor: item.iconBg,
                  boxShadow: `
                    0 6px 16px oklch(0% 0 0 / 0.25),
                    0 2px 4px oklch(0% 0 0 / 0.15),
                    inset 0 1px 0 oklch(100% 0 0 / 0.3),
                    inset 0 -1px 0 oklch(0% 0 0 / 0.15)
                  `,
                  border: "1px solid oklch(100% 0 0 / 0.15)",
                }}
              >
                {IconComponent && <IconComponent className="w-8 h-8 text-white drop-shadow-md relative z-10" strokeWidth={2} />}
              </div>

              {/* Title */}
              <span
                className="text-xl font-semibold relative z-10"
                style={{
                  color: "oklch(21.3% 0 0 / 0.95)",
                  textShadow: "0 1px 0 oklch(100% 0 0 / 0.6)",
                }}
              >
                {item.title}
              </span>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
