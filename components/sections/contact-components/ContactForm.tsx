"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ContactFormProps } from "./types";

export default function ContactForm({ fields, submitButtonText, onSubmit }: ContactFormProps) {
  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
      {fields.map((field, index) =>
        field.type === "textarea" ? (
          <motion.textarea key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} placeholder={field.placeholder} required={field.required} className="font-bw-gradual bg-white text-black text-sm rounded-lg px-5 py-4 border border-black/40 focus:border-primary-purple focus:ring-2 focus:ring-primary-purple/10 focus:outline-none transition-all duration-200 min-h-32 placeholder:text-black/60" />
        ) : (
          <motion.input key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} type={field.type} placeholder={field.placeholder} required={field.required} className="font-bw-gradual bg-white text-black text-sm rounded-lg px-5 py-4 border border-black/40 focus:border-primary-purple focus:ring-1 focus:ring-primary-purple/10 focus:outline-none transition-all duration-200 placeholder:text-black/60" />
        ),
      )}
      <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: fields.length * 0.05 }} type="submit" className="group relative inline-flex items-center justify-center gap-2 font-bw-gradual font-medium cursor-pointer rounded-lg overflow-hidden bg-white outline outline-black/40 shadow-(--shadow-button) hover:shadow-(--shadow-md) transition-all duration-300 px-6 py-4 text-sm mt-2">
        <div className="absolute inset-0 flex items-center justify-center z-1 pointer-events-none">
          <div
            className="w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-400"
            style={{
              background: "linear-gradient(135deg, #6D5EFC 0%, #4CC9F0 100%)",
              filter: "blur(30px)",
              width: "1000px",
              height: "1000px",
              animation: "spin-slow 6s linear infinite",
            }}
          />
        </div>
        <span className="relative z-10 flex items-center gap-2 text-black/80 group-hover:text-white transition-colors duration-300">
          {submitButtonText}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </span>
      </motion.button>
    </form>
  );
}
