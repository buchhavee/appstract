"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingCart, HeartHandshake, MessagesSquare, Unplug } from "lucide-react";
import { Tag } from "@/components/ui";
import conceptData from "@/data/concept.json";
import { fadeInUp, staggerContainer, phoneVariants } from "@/lib/animations";

// Lucide icons map
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingCart,
  HeartHandshake,
  MessagesSquare,
  Unplug,
};

export default function Concept() {
  return (
    <section
      id="concept"
      className="relative w-full py-12! px-4 md:px-8 lg:px-16 flex justify-center overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, white 16.45%, #4CC9F0 52.2%, #6D5EFC 100%)",
      }}
    >
      <div className="w-full max-w-7xl flex flex-col items-center">
        {/* Header */}
        <motion.div className="flex flex-col items-center max-w-3xl text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
          {/* Tagline */}
          <motion.div variants={fadeInUp}>
            <Tag>{conceptData.tagline}</Tag>
          </motion.div>

          <motion.div className="flex flex-col gap-6 items-center mt-2" variants={fadeInUp}>
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
            <Image src="/images/concept/phone-left.png" alt="Shopping app - Vælg venner" width={375} height={812} className="w-full h-auto drop-shadow-2xl" />
          </motion.div>

          {/* Center Phone */}
          <motion.div
            className="relative w-55 sm:w-40 md:w-85 lg:w-105 shrink-0 -mx-22 sm:-mx-20 md:-mx-30 lg:-mx-42"
            style={{
              zIndex: 10,
            }}
            variants={phoneVariants}
            transition={{ delay: 0.2 }}
          >
            <Image src="/images/concept/phone-center.png" alt="Shopping app - Shop sammen" width={414} height={896} className="w-full h-auto drop-shadow-2xl" />
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
            <Image src="/images/concept/phone-right.png" alt="Shopping app - Chat" width={375} height={812} className="w-full h-auto drop-shadow-2xl" />
          </motion.div>
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
