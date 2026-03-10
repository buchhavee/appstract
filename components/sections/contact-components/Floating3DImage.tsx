"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Floating3DImageProps } from "./types";

export default function Floating3DImage({ src, alt, y, rotate, hoverAnimation, positionClasses }: Floating3DImageProps) {
  return (
    <motion.div className={`absolute pointer-events-none z-20 ${positionClasses}`} style={{ y, rotate }}>
      <motion.div animate={hoverAnimation} className="w-full h-full opacity-95">
        <Image src={src} alt={alt} fill className="object-contain z-999" />
      </motion.div>
    </motion.div>
  );
}
