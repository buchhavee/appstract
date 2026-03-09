"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Users, Gift, ShieldCheck, TrendingUp, LucideIcon } from "lucide-react";

// Map icon names to Lucide components
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

  // Calculate position relative to active card (can be negative for cards above)
  const getRelativePosition = (index: number) => {
    const diff = index - activeIndex;
    const halfLength = Math.floor(items.length / 2);

    // Wrap around for circular positioning
    if (diff > halfLength) return diff - items.length;
    if (diff < -halfLength) return diff + items.length;
    return diff;
  };

  return (
    <div className={`relative w-full flex items-center justify-center ${className}`} style={{ height: "380px" }}>
      {items.map((item, index) => {
        const relativePos = getRelativePosition(index);
        const absPos = Math.abs(relativePos);
        const isActive = relativePos === 0;

        // Cards spread above (negative y) and below (positive y) the center
        const yOffset = relativePos * 65;
        const scale = isActive ? 1.05 : 1 - absPos * 0.05;
        const blur = absPos * 0.5; // Very subtle blur

        const IconComponent = iconMap[item.icon];

        return (
          <motion.div
            key={item.id}
            className="absolute cursor-pointer"
            initial={false}
            animate={{
              y: yOffset,
              scale: Math.max(scale, 0.8),
              filter: `blur(${blur}px)`,
            }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 18,
              mass: 1.2,
            }}
            style={{
              zIndex: items.length - absPos,
              width: "100%",
              maxWidth: "380px",
            }}
            onClick={() => setActiveIndex(index)}
          >
            {/* Card */}
            <motion.div
              className="flex items-center gap-5 px-6 py-5 rounded-2xl shadow-lg"
              style={{
                backgroundColor: item.cardBg,
              }}
              whileHover={isActive ? { scale: 1.02 } : {}}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {/* Icon */}
              <div
                className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center shadow-md"
                style={{
                  backgroundColor: item.iconBg,
                }}
              >
                {IconComponent && <IconComponent className="w-7 h-7 text-white" strokeWidth={2} />}
              </div>

              {/* Title */}
              <span className="text-lg font-semibold text-neutral-800">{item.title}</span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
