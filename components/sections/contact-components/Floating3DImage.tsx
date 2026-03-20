"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Floating3DImageProps } from "./types";

export default function Floating3DImage({ src, alt, y, rotate, floatClass, positionClasses }: Floating3DImageProps) {
  return (
    <motion.div className={`absolute pointer-events-none z-20 ${positionClasses}`} style={{ y, rotate, willChange: "transform", backfaceVisibility: "hidden" }}>
      <div className={`w-full h-full opacity-95 ${floatClass}`} style={{ willChange: "transform" }}>
        <Image src={src} alt={alt} fill className="object-contain z-999" />
      </div>
    </motion.div>
  );
}
