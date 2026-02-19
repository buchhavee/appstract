"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui";
import navbarData from "@/data/navbar.json";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: hidden ? -100 : 0, opacity: 1 }} transition={{ duration: 0.3, ease: "easeOut" }} className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center justify-center h-[78px] px-16">
      <div
        className="relative flex items-center justify-between gap-8 w-full max-w-[1312px] h-[60px] rounded-[15px]"
        style={{
          padding: "0 20px",
          background: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          border: "1.5px solid rgba(255, 255, 255, 0.4)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
        }}
      >
        {/* Logo Column */}
        <div className="flex items-center shrink-0">
          <Link href={navbarData.logo.href} className="flex items-center gap-3">
            {/* Logo Icon */}
            <div className="relative w-10 h-10 rounded-[10px] overflow-hidden flex items-center justify-center">
              <Image src="/images/logo-icon.svg" alt="" width={40} height={40} className="object-contain" />
            </div>
            {/* Logo Text */}
            <Image src="/images/logo-text.svg" alt="Appstract" width={176} height={29} className="h-7 w-auto object-contain" />
          </Link>
        </div>

        {/* Navigation Links - Flex grow, aligned right */}
        <div className="flex-1 flex flex-col items-end min-w-0">
          <div className="flex items-center gap-8">
            {navbarData.links.map((link, index) => (
              <div key={index} className="flex items-center justify-center">
                {link.hasDropdown ? (
                  <div className="flex flex-col items-start">
                    <Link href={link.href} className="group relative flex items-center justify-center gap-1 w-full text-base font-medium font-[family-name:var(--font-bw-gradual)] leading-[1.5]" style={{ color: "white" }}>
                      {link.label}
                      <ChevronDown className="w-5 h-5" />
                      {/* Animated underline */}
                      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-white group-hover:w-full transition-all duration-300 ease-out" />
                    </Link>
                  </div>
                ) : (
                  <Link href={link.href} className="group relative text-base font-medium font-[family-name:var(--font-bw-gradual)] leading-[1.5]" style={{ color: "white" }}>
                    {link.label}
                    {/* Animated underline */}
                    <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-white group-hover:w-full transition-all duration-300 ease-out" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col items-end justify-center shrink-0">
          <Button href={navbarData.cta.href} size="sm">
            {navbarData.cta.label}
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}
