"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { ContactModal } from "@/components/sections/contact-components";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import aboutData from "@/data/about.json";

export default function AboutCta() {
  const { cta } = aboutData;
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setSubmitted(false), 300);
  };

  return (
    <section className="relative w-full px-4 md:px-8 lg:px-16 flex justify-center" style={{ background: "oklch(100% 0 0)" }}>
      <motion.div className="w-full max-w-3xl py-16 md:py-20 flex flex-col items-center text-center gap-6" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}>
        <motion.h2 className="gradient-text font-bw-gradual font-bold leading-tight" style={{ fontSize: "clamp(28px, 5vw, 48px)" }} variants={fadeInUp}>
          {cta.headline}
        </motion.h2>

        <motion.p className="text-base md:text-lg text-neutral-medium font-bw-gradual max-w-xl leading-relaxed" variants={fadeInUp}>
          {cta.description}
        </motion.p>

        <motion.div variants={fadeInUp}>
          <Button icon onClick={() => setOpen(true)}>
            {cta.buttonLabel}
          </Button>
        </motion.div>
      </motion.div>

      <ContactModal
        open={open}
        submitted={submitted}
        onClose={handleClose}
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      />
    </section>
  );
}
