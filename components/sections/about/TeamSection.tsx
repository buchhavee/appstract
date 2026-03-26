"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import aboutData from "@/data/about.json";
import TeamMemberCard from "./TeamMemberCard";

export default function TeamSection() {
  const { team } = aboutData;

  return (
    <section
      className="relative z-2 w-full px-4 md:px-8 lg:px-16 flex justify-center"
      style={{
        borderRadius: "24px 24px 0 0",
        backgroundColor: "white",
        marginTop: "-24px",
      }}
    >
      <div className="w-full max-w-7xl py-16 md:py-24">
        {/* Section intro */}
        <motion.div className="flex flex-col items-center text-center mb-12 md:mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
          <motion.h2 className="gradient-text font-bw-gradual font-bold leading-tight" style={{ fontSize: "clamp(28px, 5vw, 52px)" }} variants={fadeInUp}>
            {team.headline}
          </motion.h2>
          <motion.p className="text-base md:text-lg text-neutral-medium font-bw-gradual max-w-xl mt-4 leading-relaxed" variants={fadeInUp}>
            {team.description}
          </motion.p>
        </motion.div>

        {/*
          Team member grid — add more members in /data/about.json under "team.members".
          Each member needs: name, role, bio, image (path under /public/images/team/).
          Grid auto-fills: 1 col on mobile, 2 on md, 3 on lg.
        */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerContainer}>
          {team.members.map((member, idx) => (
            <TeamMemberCard key={idx} name={member.name} role={member.role} bio={member.bio} image={member.image} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
