"use client";

import { motion } from "framer-motion";
import { OfficeCardProps } from "./types";

export default function OfficeCard({ office, index }: OfficeCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="p-5 bg-white rounded-lg border border-black/40">
      <h3 className="font-bw-gradual font-bold text-black mb-2 text-sm">{office.city}</h3>
      <p className="font-bw-gradual font-medium text-black text-sm">{office.company}</p>
      <p className="text-black/80 text-sm leading-relaxed">{office.address}</p>
      <p className="text-black/80 text-sm">{office.postalCity}</p>
      <p className="mt-3 text-black/80 text-sm">{office.phone}</p>
    </motion.div>
  );
}
