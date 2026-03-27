"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import aboutData from "@/data/about.json";

export default function TeamPhoto() {
  const { teamPhoto } = aboutData;

  return (
    <section className="relative w-full px-4 md:px-8 lg:px-16 flex justify-center bg-white">
      <motion.div className="w-full max-w-7xl pb-16 md:pb-24 flex flex-col items-center gap-10" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
        {/* Text */}
        <motion.div className="flex flex-col items-center text-center gap-4" variants={fadeInUp}>
          <h2 className="gradient-text font-bw-gradual font-bold leading-tight" style={{ fontSize: "clamp(28px, 5vw, 52px)" }}>
            {teamPhoto.headline}
          </h2>
          <p className="text-base md:text-lg text-neutral-medium font-bw-gradual max-w-xl leading-relaxed">{teamPhoto.description}</p>
        </motion.div>

        {/* Team photo */}
        <motion.div
          className="w-full rounded-3xl overflow-hidden"
          style={{
            border: "1px solid oklch(0% 0 0 / 0.08)",
            boxShadow: "0 20px 60px oklch(0% 0 0 / 0.08), 0 4px 16px oklch(0% 0 0 / 0.05)",
            aspectRatio: "16 / 7",
            position: "relative",
          }}
          variants={fadeInUp}
        >
          <Image src={teamPhoto.image} alt="The Appstract team" fill className="object-cover" />
        </motion.div>
      </motion.div>
    </section>
  );
}
