"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, HeartHandshake, MessagesSquare, Unplug, ArrowUpRight } from "lucide-react";
import { Tag, Button } from "@/components/ui";
import StarField from "@/components/ui/StarField";
import conceptData from "@/data/concept.json";
import { fadeInUp, staggerContainer, phoneVariants } from "@/lib/animations";

// Lucide icons map
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingCart,
  HeartHandshake,
  MessagesSquare,
  Unplug,
};

interface Hotspot {
  phone: string;
  top: string;
  left: string;
  label: string;
}

function HotspotDot({ hotspot }: { hotspot: Hotspot }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="absolute z-50 pointer-events-auto" style={{ top: hotspot.top, left: hotspot.left }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {/* Pulse ring */}
      <motion.span
        className="absolute rounded-full"
        style={{
          width: 14,
          height: 14,
          top: 0,
          left: 0,
          border: "2px solid rgba(76,201,240,0.6)",
          willChange: "transform, opacity",
        }}
        animate={{ scale: [1, 2.5], opacity: [0.7, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: [0.4, 0, 0.2, 1], repeatDelay: 0.3 }}
      />

      {/* Dot */}
      <motion.span
        className="block rounded-full cursor-pointer"
        style={{
          width: 14,
          height: 14,
          background: "rgba(76,201,240,0.95)",
          boxShadow: "0 0 8px rgba(76,201,240,0.6), 0 0 20px rgba(76,201,240,0.4)",
        }}
        animate={hovered ? { scale: 1.6, boxShadow: "0 0 14px rgba(76,201,240,0.8), 0 0 30px rgba(76,201,240,0.6)" } : { scale: [1, 1.15, 1] }}
        transition={hovered ? { type: "spring", stiffness: 300, damping: 20 } : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Tooltip */}
      <motion.div
        className="pointer-events-none absolute left-1/2 rounded-sm px-4 py-2.5"
        style={{
          bottom: "calc(100% + 10px)",
          x: "-50%",
          width: "max-content",
          maxWidth: 200,
          background: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(8px)",
          color: "#fff",
          fontSize: 12,
          lineHeight: 1.4,
          whiteSpace: "normal",
        }}
        initial={{ opacity: 0, y: 6 }}
        animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        transition={{ duration: 0.2 }}
      >
        {hotspot.label}
      </motion.div>
    </div>
  );
}

export default function Concept() {
  return (
    <section
      id="concept"
      className="relative z-2 w-full py-12! px-4 md:px-8 lg:px-16 flex justify-center overflow-visible -mt-px"
      style={{
        background: "linear-gradient(to bottom, white 16.45%, #4CC9F0 52.2%, #6D5EFC 100%)",
      }}
    >
      <div className="w-full max-w-7xl flex flex-col items-center">
        {/* Star Field Background */}
        <div className="absolute inset-0 -mx-4 md:-mx-8 lg:-mx-16 overflow-visible pointer-events-none flex justify-center">
          <StarField className="z-0" />
        </div>

        {/* Header */}
        <motion.div className="relative flex flex-col items-center max-w-3xl text-center overflow-visible" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
          <motion.div variants={fadeInUp} className="relative z-10">
            <Tag>{conceptData.tagline}</Tag>
          </motion.div>

          <motion.div className="relative z-10 flex flex-col gap-6 items-center mt-2" variants={fadeInUp}>
            <h2
              className="gradient-text font-bw-gradual font-bold tracking-tight leading-tight"
              style={{
                fontSize: "clamp(54px, 8vw, 96px)",
              }}
            >
              {conceptData.headline}
            </h2>

            <div className="font-normal text-neutral-medium font-bw-gradual text-lg leading-normal">
              {conceptData.description.split("\n").map((line, index) => (
                <p key={index} className={index > 0 ? "mt-0" : ""}>
                  {line}
                </p>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Phones */}
        <motion.div className="relative w-full flex justify-center items-end mt-6" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}>
          {/* Left Phone */}
          <motion.div
            className="relative w-50 sm:w-36 md:w-75 lg:w-96 shrink-0"
            style={{
              zIndex: 1,
            }}
            variants={phoneVariants}
          >
            <Image src="/images/concept/phone-left.png" alt="Shopping app - Vælg venner" width={375} height={812} loading="eager" sizes="(max-width: 640px) 200px, (max-width: 768px) 144px, (max-width: 1024px) 300px, 384px" className="w-full h-auto drop-shadow-2xl" />

            {/* Dynamic Island overlay */}
            <motion.div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-[60%] md:w-[55%]" style={{ rotate: -3.95 }} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}>
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                <motion.div whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="cursor-pointer">
                  <Image src="/images/concept/phone-left-island.png" alt="Dynamic Island" width={200} height={60} className="w-full h-auto rounded-full" style={{ filter: "drop-shadow(0 0 8px rgba(76,201,240,0.1)) drop-shadow(0 0 20px rgba(76,201,240,0.35)) drop-shadow(0 4px 12px rgba(0,0,0,0.25))" }} />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* CTA overlay */}
            <motion.div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-[75%] md:w-[75%]" style={{ rotate: -3.95 }} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.7, ease: [0.25, 0.4, 0.25, 1] }}>
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
                <motion.div whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="cursor-pointer">
                  <Image src="/images/concept/phone-left-cta.png" alt="CTA Button" width={320} height={80} className="w-full h-auto rounded-sm" style={{ filter: "drop-shadow(0 0 8px rgba(109,94,252,0.1)) drop-shadow(0 0 20px rgba(109,94,252,0.35)) drop-shadow(0 4px 12px rgba(0,0,0,0.25))" }} />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Center Phone */}
          <motion.div
            className="relative w-55 sm:w-40 md:w-85 lg:w-105 shrink-0 -mx-22 sm:-mx-20 md:-mx-30 lg:-mx-42"
            style={{
              zIndex: 10,
            }}
            variants={phoneVariants}
            transition={{ delay: 0.4 }}
          >
            <Image src="/images/concept/phone-center.png" alt="Shopping app - Shop sammen" width={414} height={896} loading="eager" sizes="(max-width: 640px) 220px, (max-width: 768px) 160px, (max-width: 1024px) 340px, 420px" className="w-full h-auto drop-shadow-2xl" />

            {/* text overlay */}
            <motion.div className="absolute bottom-[22%] left-1/2 -translate-x-1/2 w-[60%] text-center" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.8, ease: [0.25, 0.4, 0.25, 1] }}>
              <motion.div whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="cursor-pointer">
                <div
                  className="relative rounded-lg overflow-hidden"
                  style={{
                    background: "rgba(0, 0, 0, 0.55)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
                  }}
                >
                  {/* Top edge highlight sheen */}
                  <div
                    className="absolute top-0 left-2 right-2 h-px pointer-events-none z-10"
                    style={{
                      background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 20%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.4) 80%, transparent 100%)",
                    }}
                  />
                  {/* Text */}
                  <p
                    className="relative z-10 font-bw-gradual font-medium leading-snug px-2 py-1.5 md:px-3 md:py-3 text-white"
                    style={{
                      fontSize: "clamp(11px, 2vw, 14px)",
                    }}
                  >
                    {conceptData.phoneOverlayText}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Phone */}
          <motion.div
            className="relative w-50 sm:w-36 md:w-75 lg:w-96 shrink-0"
            style={{
              zIndex: 1,
            }}
            variants={phoneVariants}
            transition={{ delay: 0.4 }}
          >
            <Image src="/images/concept/phone-right.png" alt="Shopping app - Chat" width={375} height={812} sizes="(max-width: 640px) 200px, (max-width: 768px) 144px, (max-width: 1024px) 300px, 384px" className="w-full h-auto drop-shadow-2xl" />

            {/* Message overlay */}
            <motion.div className="absolute top-[22%] left-[59%] -translate-x-1/2 w-[80%] md:w-[73%]" style={{ rotate: 3.31 }} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}>
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                <motion.div whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="cursor-pointer">
                  <Image src="/images/concept/phone-right-msg.png" alt="Chat Message" width={320} height={80} className="w-full h-auto rounded-sm" style={{ filter: "drop-shadow(0 0 8px rgba(109,94,252,0.1)) drop-shadow(0 0 20px rgba(109,94,252,0.35)) drop-shadow(0 4px 12px rgba(0,0,0,0.25))" }} />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Hotspot overlay */}
          <div className="hidden md:flex absolute inset-0 justify-center items-end pointer-events-none" style={{ zIndex: 20 }}>
            {/* Left phone hotspot area */}
            <div className="relative w-50 sm:w-36 md:w-75 lg:w-96 shrink-0 pointer-events-none" style={{ aspectRatio: "375 / 812" }}>
              {conceptData.hotspots
                .filter((h) => h.phone === "left")
                .map((h, i) => (
                  <HotspotDot key={i} hotspot={h} />
                ))}
            </div>
            {/* Center phone hotspot area */}
            <div className="relative w-55 sm:w-40 md:w-85 lg:w-105 shrink-0 -mx-22 sm:-mx-20 md:-mx-30 lg:-mx-42 pointer-events-none" style={{ aspectRatio: "414 / 896" }}>
              {conceptData.hotspots
                .filter((h) => h.phone === "center")
                .map((h, i) => (
                  <HotspotDot key={i} hotspot={h} />
                ))}
            </div>
            {/* Right phone hotspot area */}
            <div className="relative w-50 sm:w-36 md:w-75 lg:w-96 shrink-0 pointer-events-none" style={{ aspectRatio: "375 / 812" }}>
              {conceptData.hotspots
                .filter((h) => h.phone === "right")
                .map((h, i) => (
                  <HotspotDot key={i} hotspot={h} />
                ))}
            </div>
          </div>
        </motion.div>

        {/* Try Demo Button */}
        <motion.div className="relative z-10 flex justify-center -mt-6 md:-mt-10 mb-10" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeInUp}>
          <motion.button whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} onClick={() => window.open(conceptData.demoUrl, "_blank", "noopener,noreferrer")} className="inline-flex items-center gap-2 font-bw-gradual font-medium text-base text-white border border-white/40 rounded-full px-6 py-3 cursor-pointer backdrop-blur-sm" style={{ background: "rgba(255, 255, 255, 0.08)" }}>
            Try Demo
            <ArrowUpRight className="w-4 h-4 opacity-70" />
          </motion.button>
        </motion.div>

        {/* Feature Cards */}
        <motion.div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
          {conceptData.features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div key={index} className="flex flex-col gap-2 md:gap-3 p-0 md:p-4 rounded-[15px] md:rounded-[25px]" variants={fadeInUp}>
                {Icon && <Icon className="w-7 h-7 md:w-10.5 md:h-10.5 p-1.5 outline-1 outline-white/10 shadow-lg rounded-sm bg-primary-purple/20 text-white" />}

                <h3 className="font-bold font-bw-gradual! text-white leading-tight" style={{ fontSize: "clamp(14px, 3vw, 32px)", minHeight: "2.4em" }}>
                  {feature.title}
                </h3>

                <p className="font-normal font-bw-gradual! text-white leading-normal" style={{ fontSize: "clamp(11px, 1.5vw, 16px)" }}>
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
