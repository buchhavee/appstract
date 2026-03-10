"use client";

import { motion } from "framer-motion";
import GradientCheckmark from "./GradientCheckmark";
import { ConfirmationViewProps } from "./types";

export default function ConfirmationView({ headline, description, closeButtonText, onClose }: ConfirmationViewProps) {
  return (
    <motion.div key="confirmation" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }} className="flex flex-col items-center justify-center text-center py-12 md:py-16 gap-6">
      <GradientCheckmark size="md" />
      <div className="flex flex-col gap-3">
        <h3 className="text-2xl md:text-3xl font-bw-gradual font-bold text-black">{headline}</h3>
        <p className="text-black/70 max-w-md text-base">{description}</p>
      </div>
      <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} onClick={onClose} className="mt-4 px-8 py-3 text-white font-bw-gradual font-medium rounded-lg hover:opacity-90 transition-opacity cursor-pointer" style={{ background: "var(--gradient-primary)" }}>
        {closeButtonText}
      </motion.button>
    </motion.div>
  );
}
