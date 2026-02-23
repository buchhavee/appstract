"use client";

import { Tag } from "@/components/ui";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { X } from "lucide-react";

export default function ContactSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="section section-padding flex flex-col items-center justify-center bg-neutral-dark">
      <button className="bg-gradient-primary text-white font-bold rounded-full px-8 py-4 shadow-button transition-colors duration-200 hover:bg-primary-purple text-lg mt-16 mb-16" onClick={() => setOpen(true)}>
        Schedule now
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.25 }} className="fixed inset-0 z-modal lg:min-w-[1024px] flex items-center justify-center bg-gradient-to-br from-[#6D5EFC]/30 to-[#4CC9F0]/60 backdrop-blur-sm shadow-2xl" onClick={() => setOpen(false)}>
            <motion.div className="bg-white rounded-2xl shadow-lg p-10 max-w-xl w-full lg:min-w-3xl flex flex-col items-center gap-8 relative" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: 0.25 }} onClick={(e) => e.stopPropagation()}>
              <button className="absolute top-4 right-4 text-black bg-neutral-light rounded-full w-10 h-10 flex items-center justify-center hover:bg-neutral-medium transition-colors border border-neutral-medium" onClick={() => setOpen(false)} aria-label="Close">
                <X className="cursor-pointer w-6 h-6" />
              </button>
              <Tag>Contact</Tag>
              <h2 className="heading-1 text-center">Let's talk about your project</h2>
              <p className="text-body text-secondary">Fill out the form below or reach out directly to start a conversation about how we can help your business grow.</p>
              <form className="w-full flex flex-col gap-6">
                <input type="text" placeholder="Name" className="bg-neutral-light text-black text-body rounded-md px-4 py-3 border border-neutral-medium focus:border-primary-purple focus:outline-none transition-colors duration-200" />
                <input type="email" placeholder="Email" className="bg-neutral-light text-black text-body rounded-md px-4 py-3 border border-neutral-medium focus:border-primary-purple focus:outline-none transition-colors duration-200" />
                <textarea placeholder="Your message" className="bg-neutral-light text-black text-body rounded-md px-4 py-3 border border-neutral-medium focus:border-primary-purple focus:outline-none transition-colors duration-200 min-h-[120px]" />
                <button type="submit" className="cursor-pointer bg-gradient-primary text-white font-bold rounded-full px-6 py-3 shadow-button transition-colors duration-200 hover:bg-primary-purple">
                  Send message
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
