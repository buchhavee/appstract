"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/ui";
import { fadeInUp } from "@/lib/animations";

interface TeamMemberCardProps {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export default function TeamMemberCard({ name, role, bio, image }: TeamMemberCardProps) {
  return (
    <motion.div variants={fadeInUp} className="h-full">
      <SpotlightCard
        className="h-full"
        spotlightColor="oklch(85.9% 0.082 219.8 / 0.12)"
        style={{
          background: "linear-gradient(145deg, oklch(27.9% 0.009 285.8 / 0.6) 0%, oklch(21.6% 0.010 285.6 / 0.7) 100%)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid oklch(100% 0 0 / 0.12)",
          borderBottom: "1px solid oklch(0% 0 0 / 0.2)",
          boxShadow: `
            0 20px 40px oklch(0% 0 0 / 0.25),
            0 8px 16px oklch(0% 0 0 / 0.15),
            inset 0 1px 0 oklch(100% 0 0 / 0.08)
          `,
        }}
      >
        {/* Top edge highlight */}
        <div
          className="absolute top-0 left-8 right-8 h-px pointer-events-none z-10"
          style={{
            background: "linear-gradient(90deg, transparent 0%, oklch(100% 0 0 / 0.3) 20%, oklch(100% 0 0 / 0.5) 50%, oklch(100% 0 0 / 0.3) 80%, transparent 100%)",
          }}
        />

        <div className="relative z-10 p-6 md:p-8 flex flex-col gap-5">
          {/* Profile image + name */}
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-full shrink-0 p-0.5"
              style={{
                background: "linear-gradient(135deg, var(--color-primary-purple) 0%, var(--color-primary-cyan) 100%)",
              }}
            >
              <div className="w-full h-full rounded-full overflow-hidden">
                <Image src={image} alt={name} width={64} height={64} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-bw-gradual font-bold text-lg text-white leading-tight">{name}</h3>
              <span
                className="inline-block self-start text-xs font-bw-gradual font-semibold px-3 py-1 rounded-full"
                style={{
                  background: "oklch(100% 0 0 / 0.12)",
                  color: "white",
                  border: "1px solid oklch(100% 0 0 / 0.2)",
                }}
              >
                {role}
              </span>
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm md:text-base text-white/60 font-bw-gradual leading-relaxed">{bio}</p>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
