"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import Image from "next/image";
import { LiquidBackground, ConicButton } from "@/components/ui";
import contactData from "@/data/contact.json";

export default function ContactSection() {
  const [open, setOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [80, -120]);
  const y3 = useTransform(scrollYProgress, [0, 1], [120, -80]);
  const y4 = useTransform(scrollYProgress, [0, 1], [60, -140]);

  const rotate1 = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [5, -5]);

  const hoverAnimation = {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  const hoverAnimation2 = {
    y: [0, -10, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: 1,
    },
  };

  const hoverAnimation3 = {
    y: [0, -6, 0],
    transition: {
      duration: 4.5,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: 0.5,
    },
  };

  const hoverAnimation4 = {
    y: [0, -12, 0],
    transition: {
      duration: 5.5,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: 1.5,
    },
  };

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener("modalOpen", handleOpen);
    return () => window.removeEventListener("modalOpen", handleOpen);
  }, []);

  useEffect(() => {
    if (open) {
      window.dispatchEvent(new Event("modalOpen"));
    } else {
      window.dispatchEvent(new Event("modalClose"));
    }
  }, [open]);

  return (
    // Contact section container
    <section ref={sectionRef} className="section section-padding pt-32! md:pt-40 -mt-16 md:-mt-24 flex flex-col items-center justify-center bg-neutral-dark relative overflow-x-clip overflow-y-visible z-10">
      <div className="relative w-full flex flex-col items-center justify-center min-h-[60svh] max-w-7xl rounded-3xl border border-black/15 p-8 md:p-16 overflow-visible">
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: "radial-gradient(ellipse 120% 150% at 50% 100%, rgba(146,126,219,1) 0%, rgba(112,161,229,0.8) 27%, rgba(78,195,239,0.8) 54%, rgba(78,195,239,0.8) 100%)",
          }}
        />
        {/* Liquid gradient overlay */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <LiquidBackground opacity={0.4} speed={0.8} zoom={1.0} warpStrength={0.5} />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center gap-4 md:gap-6 max-w-3xl px-4">
          <h2 className="font-bold font-bw-gradual text-white text-center text-pretty leading-tight tracking-tight" style={{ fontSize: "clamp(2rem, 4vw + 1rem, 3.5rem)" }}>
            {contactData.headline}
          </h2>
          <p className="font-bw-gradual text-white/90 text-center leading-relaxed max-w-xl" style={{ fontSize: "clamp(0.95rem, 1vw + 0.5rem, 1.25rem)" }}>
            {contactData.description}
          </p>

          <ConicButton onClick={() => setOpen(true)} borderColor="#4CC9F0" overlayBorderColor="rgba(76, 201, 240, 0.3)" backgroundColor="rgba(255, 255, 255, 0.1)" textColor="white" animationDuration={4} blurRadius={4} borderRadius={999} overlayMargin={2} className="mt-4 font-bw-gradual group">
            <span className="flex items-center gap-3">
              {contactData.button.label}
              <ArrowRight size={24} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </ConicButton>

          <p className="text-white/70 text-center mt-1" style={{ fontSize: "clamp(0.75rem, 0.5vw + 0.5rem, 0.875rem)" }}>
            {contactData.Trust}
          </p>
        </div>

        {/* Top Left (Line Graph) */}
        <motion.div className="absolute -top-13 md:-top-32 lg:-top-36 xl:-top-44 -left-13 md:-left-20 lg:-left-28 xl:-left-36 w-40 h-36 md:w-50 md:h-64 lg:w-65 lg:h-72 xl:w-96 xl:h-110 pointer-events-none z-20" style={{ y: y1, rotate: rotate1 }}>
          <motion.div animate={hoverAnimation} className="w-full h-full opacity-95">
            <Image src="/images/3dlinegraph.png" alt="3D Line Graph" fill className="object-contain z-999" />
          </motion.div>
        </motion.div>

        {/* Top Right (Chat Bubble) */}
        <motion.div className="absolute -top-13 md:-top-32 lg:-top-36 xl:-top-44 -right-10 md:-right-20 lg:-right-28 xl:-right-36 w-40 h-40 md:w-50 md:h-72 lg:w-62 lg:h-72 xl:w-96 xl:h-110 pointer-events-none z-20" style={{ y: y2, rotate: rotate2 }}>
          <motion.div animate={hoverAnimation2} className="w-full h-full opacity-95">
            <Image src="/images/3dchatbubble.png" alt="3D Chat Bubble" fill className="object-contain z-999" />
          </motion.div>
        </motion.div>

        {/* Bottom Left (Envelope) */}
        <motion.div className="absolute -bottom-16 md:-bottom-28 lg:-bottom-32 xl:-bottom-40 -left-12 md:-left-20 lg:-left-28 xl:-left-36 w-40 h-36 md:w-50 md:h-64 lg:w-62 lg:h-72 xl:w-96 xl:h-110 pointer-events-none z-20" style={{ y: y3, rotate: rotate2 }}>
          <motion.div animate={hoverAnimation3} className="w-full h-full opacity-95">
            <Image src="/images/3denvelope.png" alt="3D Envelope" fill className="object-contain z-999" />
          </motion.div>
        </motion.div>

        {/* Bottom Right (Pie Chart) */}
        <motion.div className="absolute -bottom-32 md:-bottom-44 lg:-bottom-48 xl:-bottom-56 -right-10 md:-right-20 lg:-right-28 xl:-right-36 w-40 h-36 md:w-50 md:h-64 lg:w-65 lg:h-72 xl:w-96 xl:h-110 pointer-events-none z-20" style={{ y: y4, rotate: rotate1 }}>
          <motion.div animate={hoverAnimation4} className="w-full h-full opacity-95">
            <Image src="/images/3dpiechart.png" alt="3D Pie Chart" fill className="object-contain z-999" />
          </motion.div>
        </motion.div>
      </div>

      {/* Contact Modal Popover */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.25 }} className="fixed inset-0 z-100 flex items-center justify-center bg-linear-to-br from-violet-500/30 to-cyan-400/60 backdrop-blur-sm shadow-2xl overflow-hidden" style={{ touchAction: "none", overscrollBehavior: "contain" }} onClick={() => setOpen(false)} onWheel={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()}>
            <motion.div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 max-w-5xl w-full flex flex-col items-center gap-6 relative max-h-dvh overflow-y-auto" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: 0.25 }} onClick={(e) => e.stopPropagation()}>
              <button className="absolute top-4 right-4 text-black bg-neutral-light rounded-full w-10 h-10 flex items-center justify-center hover:bg-neutral-medium transition-colors border border-neutral-medium" onClick={() => setOpen(false)} aria-label="Close">
                <X className="cursor-pointer w-6 h-6" />
              </button>

              <div className="text-xs font-bw-gradual font-semibold text-primary-purple uppercase tracking-wider">{contactData.modal.tagline}</div>
              <h2 className="text-2xl md:text-3xl font-bw-gradual font-bold text-center text-black">{contactData.modal.headline}</h2>

              {/* Main Content - Two Column Layout */}
              <div className="w-full flex flex-col md:flex-row gap-8">
                {/* Left Column - Contact Info */}
                <div className="w-full md:w-1/3 flex flex-col gap-4 order-2 md:order-1">
                  {/* Office Locations */}
                  {contactData.modal.offices.map((office, index) => (
                    <div key={index} className="p-4 bg-neutral-light rounded-xl border border-neutral-medium">
                      <h3 className="font-bold text-black mb-2 text-sm">{office.city}</h3>
                      <p className="font-semibold text-black text-sm">{office.company}</p>
                      <p className="text-gray-600 text-sm">{office.address}</p>
                      <p className="text-gray-600 text-sm">{office.postalCity}</p>
                      <p className="mt-2 text-gray-600 text-sm">{office.phone}</p>
                    </div>
                  ))}

                  {/* Email */}
                  <div className="p-4 bg-neutral-light rounded-xl border border-neutral-medium">
                    <h3 className="font-bold text-black mb-2 text-sm">{contactData.modal.email.label}</h3>
                    <a href={`mailto:${contactData.modal.email.address}`} className="text-primary-purple hover:underline font-medium text-sm">
                      {contactData.modal.email.address}
                    </a>
                  </div>
                </div>

                {/* Right Column - Contact Form */}
                <div className="w-full md:w-2/3 order-1 md:order-2">
                  <form className="w-full flex flex-col gap-4">
                    {contactData.modal.form.fields.map((field, index) => (field.type === "textarea" ? <textarea key={index} placeholder={field.placeholder} required={field.required} className="bg-neutral-light text-black text-body rounded-xl px-4 py-3 border border-neutral-medium focus:border-primary-purple focus:outline-none transition-colors duration-200 min-h-32" /> : <input key={index} type={field.type} placeholder={field.placeholder} required={field.required} className="bg-neutral-light text-black text-body rounded-xl px-4 py-3 border border-neutral-medium focus:border-primary-purple focus:outline-none transition-colors duration-200" />))}
                    <button type="submit" className="cursor-pointer bg-gradient-primary text-white font-bold rounded-full px-6 py-3 shadow-button transition-colors duration-200 hover:bg-primary-purple">
                      {contactData.modal.form.submitButton}
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
