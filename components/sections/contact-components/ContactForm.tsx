"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ContactFormProps } from "./types";
import { Button } from "@/components/ui";

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
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: fields.length * 0.05 }} className="mt-2">
        <Button type="submit" icon className="font-bw-gradual rounded-lg w-full">
          {submitButtonText}
        </Button>
      </motion.div>
    </form>
  );
}
