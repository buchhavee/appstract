"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (!autoRotate || items.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [autoRotate, items.length, rotationInterval]);

  const getRelativePosition = (index: number) => {
    const diff = index - activeIndex;
    const halfLength = Math.floor(items.length / 2);

    if (diff > halfLength) return diff - items.length;
    if (diff < -halfLength) return diff + items.length;
    return diff;
  };

  return (
    <div
      className={`relative w-full flex items-center justify-center ${className}`}
      style={{
        height: "420px",
        perspective: "1200px",
        perspectiveOrigin: "center center",
      }}
    >
      {items.map((item, index) => {
        const relativePos = getRelativePosition(index);
        const absPos = Math.abs(relativePos);
        const isActive = relativePos === 0;

        const yOffset = relativePos * 85;
        const zOffset = -absPos * 45;
        const scale = isActive ? 1.05 : 1 - absPos * 0.03;

        const rotateX = relativePos * -8;
        const rotateY = relativePos * 2;

        const shadowBlur = isActive ? 35 : 20 - absPos * 3;
        const shadowOpacity = isActive ? 0.3 : 0.18 - absPos * 0.03;
        const shadowY = isActive ? 24 : 14 - absPos * 2;

        const cardBlur = isActive ? 0 : absPos * 0.4;

        const staggerDelay = absPos * 0.06;

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
              stiffness: 65,
              damping: 18,
              mass: 1.2,
              delay: staggerDelay,
              filter: { duration: 0.2, delay: staggerDelay },
            }}
            style={{
              zIndex: items.length - absPos,
              width: "100%",
              maxWidth: "380px",
              transformStyle: "preserve-3d",
              willChange: "transform, filter",
              backfaceVisibility: "hidden",
            }}
            onClick={() => setActiveIndex(index)}
          >
            {/* Card */}
            <motion.div
              className="flex items-center gap-5 px-6 py-5 rounded-2xl relative"
              style={{
                background: `linear-gradient(145deg, ${item.cardBg} 0%, ${item.cardBg} 100%)`,
                boxShadow: `
                  0 ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity}),
                  0 ${shadowY / 3}px ${shadowBlur / 3}px rgba(0, 0, 0, ${shadowOpacity * 0.6}),
                  0 1px 3px rgba(0, 0, 0, 0.08),
                  inset 0 1px 0 rgba(255, 255, 255, ${isActive ? 0.5 : 0.25}),
                  inset 0 -1px 0 rgba(0, 0, 0, ${isActive ? 0.08 : 0.05})
                `,
                border: `1px solid rgba(255, 255, 255, ${isActive ? 0.35 : 0.15})`,
                borderBottom: `1px solid rgba(0, 0, 0, ${isActive ? 0.1 : 0.05})`,
              }}
              whileHover={
                isActive
                  ? {
                      scale: 1.02,
                      rotateX: 2,
                      rotateY: -2,
                    }
                  : {}
              }
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {/* Top edge highlight */}
              <div
                className="absolute top-0 left-4 right-4 h-px pointer-events-none"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,${isActive ? 0.6 : 0.3}) 20%, rgba(255,255,255,${isActive ? 0.8 : 0.4}) 50%, rgba(255,255,255,${isActive ? 0.6 : 0.3}) 80%, transparent 100%)`,
                }}
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
                style={{
                  background: isActive ? "linear-gradient(160deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 30%, transparent 50%, rgba(0,0,0,0.03) 100%)" : "linear-gradient(160deg, rgba(255,255,255,0.1) 0%, transparent 40%, rgba(0,0,0,0.05) 100%)",
                }}
              />

              {/* Bottom reflection */}
              <div
                className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none rounded-b-2xl"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.04) 0%, transparent 100%)",
                }}
              />

              {/* Icon */}
              <div
                className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center relative z-10"
                style={{
                  backgroundColor: item.iconBg,
                  boxShadow: `
                    0 6px 16px rgba(0, 0, 0, 0.25),
                    0 2px 4px rgba(0, 0, 0, 0.15),
                    inset 0 1px 0 rgba(255, 255, 255, 0.3),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.15)
                  `,
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                }}
              >
                {IconComponent && <IconComponent className="w-7 h-7 text-white drop-shadow-md relative z-10" strokeWidth={2} />}
              </div>

              {/* Title */}
              <span
                className="text-lg font-semibold relative z-10"
                style={{
                  color: "rgba(25, 25, 25, 0.95)",
                  textShadow: "0 1px 0 rgba(255, 255, 255, 0.6)",
                }}
              >
                {item.title}
              </span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
