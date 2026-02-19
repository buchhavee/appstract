"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingCart, HeartHandshake, MessagesSquare, Unplug } from "lucide-react";
import { Tag } from "@/components/ui";
import conceptData from "@/data/concept.json";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const phoneVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

// Map icon names to Lucide components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingCart,
  HeartHandshake,
  MessagesSquare,
  Unplug,
};

export default function Concept() {
  return (
    <section
      className="relative w-full py-16! px-16 flex justify-center overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, white 16.45%, #4CC9F0 52.2%, #6D5EFC 100%)",
      }}
    >
      <div className="w-full max-w-[1280px] flex flex-col items-center">
        {/* Section Title */}
        <motion.div className="flex flex-col items-center max-w-[768px] text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
          {/* Tagline */}
          <motion.div variants={fadeInUp}>
            <Tag>{conceptData.tagline}</Tag>
          </motion.div>

          {/* Content */}
          <motion.div className="flex flex-col gap-6 items-center mt-6" variants={fadeInUp}>
            {/* Headline */}
            <h2
              className="font-[family-name:var(--font-bw-gradual)] font-bold leading-[1.2]"
              style={{
                fontSize: "clamp(48px, 8vw, 96px)",
                backgroundImage: "linear-gradient(122deg, #6D5EFC 0%, #4CC9F0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {conceptData.headline}
            </h2>

            {/* Description */}
            <div className="font-[family-name:var(--font-roboto)] font-normal text-[#41423c] text-lg leading-[1.5]">
              {conceptData.description.split("\n").map((line, index) => (
                <p key={index} className={index > 0 ? "mt-0" : ""}>
                  {line}
                </p>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Phone Mockups */}
        <motion.div className="relative w-full flex justify-center items-center h-[450px] md:h-[600px] lg:h-[750px] mt-8" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}>
          {/* Left Phone */}
          <motion.div
            className="relative w-[120px] md:w-[200px] lg:w-[320px]"
            style={{
              left: "10%",
              zIndex: 1,
            }}
            variants={phoneVariants}
          >
            <Image src="/images/phone-left.png" alt="Shopping app - Vælg venner" width={375} height={812} className="w-full h-auto drop-shadow-2xl" />
          </motion.div>

          {/* Center Phone (larger, on top) */}
          <motion.div
            className="relative w-[140px] md:w-[240px] lg:w-[350px]"
            style={{
              zIndex: 10,
            }}
            variants={phoneVariants}
            transition={{ delay: 0.2 }}
          >
            <Image src="/images/phone-center.png" alt="Shopping app - Shop sammen" width={414} height={896} className="w-full h-auto drop-shadow-2xl" />
          </motion.div>

          {/* Right Phone */}
          <motion.div
            className="relative w-[120px] md:w-[200px] lg:w-[320px]"
            style={{
              right: "10%",
              zIndex: 1,
            }}
            variants={phoneVariants}
            transition={{ delay: 0.4 }}
          >
            <Image src="/images/phone-right.png" alt="Shopping app - Chat" width={375} height={812} className="w-full h-auto drop-shadow-2xl" />
          </motion.div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
          {conceptData.features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div key={index} className="flex flex-col gap-3 p-4 rounded-[25px]" variants={fadeInUp}>
                {/* Icon */}
                {Icon && <Icon className="w-[42px] h-[42px] text-white" />}

                {/* Title */}
                <h3 className="font-[family-name:var(--font-bw-gradual)] font-bold text-white leading-[1.2] min-h-[77px]" style={{ fontSize: "32px" }}>
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="font-[family-name:var(--font-roboto)] font-normal text-white leading-[1.5]" style={{ fontSize: "16px" }}>
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
