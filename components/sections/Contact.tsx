"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import Image from "next/image";

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
    <section ref={sectionRef} className="section section-padding pt-32 md:pt-40 -mt-16 md:-mt-24 flex flex-col items-center justify-center bg-neutral-dark relative overflow-x-clip overflow-y-visible z-10">
      <div className="relative w-full flex flex-col items-center justify-center min-h-[60svh] max-w-7xl rounded-3xl border border-black/15 p-8 md:p-16 overflow-visible">
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: "radial-gradient(ellipse 120% 150% at 50% 100%, rgba(146,126,219,1) 0%, rgba(112,161,229,1) 27%, rgba(78,195,239,1) 54%, rgba(78,195,239,0.8) 100%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center justify-center gap-6">
          <h2 className="text-5xl font-bold font-bw-gradual text-white text-center leading-tight">Get in touch</h2>
          <p className="font-bw-gradual text-lg text-white text-center leading-normal">Choose what fits your needs and scale as you grow</p>

          <button onClick={() => setOpen(true)} className="cursor-pointer font-bw-gradual mt-4 bg-white text-black rounded-full px-8 py-4 flex items-center gap-3 shadow-[0_9px_27px_rgba(255,255,255,0.56)] hover:shadow-[0_10px_60px_rgba(255,255,255,0.56)] transition-all duration-400 font-medium text-lg">
            Schedule Now
            <ArrowRight size={24} />
          </button>
        </div>

        {/* Top Left (Line Graph) */}
        <motion.div className="absolute -top-12 md:-top-20 -left-15 md:-left-5 w-30 h-28 md:w-50 md:h-64 lg:w-65 lg:h-72 xl:w-80 xl:h-90 pointer-events-none z-20" style={{ y: y1, rotate: rotate1 }}>
          <motion.div animate={hoverAnimation} className="w-full h-full opacity-95">
            <Image src="/images/3dlinegraph.png" alt="3D Line Graph" fill className="object-contain z-999" />
          </motion.div>
        </motion.div>

        {/* Top Right (Chat Bubble) */}
        <motion.div className="absolute -top-8 md:-top-20 -right-16 md:-right-8 w-30 h-32 md:w-50 md:h-72 lg:w-62 lg:h-72 xl:w-80 xl:h-90 pointer-events-none z-20" style={{ y: y2, rotate: rotate2 }}>
          <motion.div animate={hoverAnimation2} className="w-full h-full opacity-95">
            <Image src="/images/3dchatbubble.png" alt="3D Chat Bubble" fill className="object-contain z-999" />
          </motion.div>
        </motion.div>

        {/* Bottom Left (Envelope) */}
        <motion.div className="absolute -bottom-6 md:-bottom-15 -left-16 md:-left-12 w-30 h-28 md:w-50 md:h-64 lg:w-62 lg:h-72 xl:w-80 xl:h-90 pointer-events-none z-20" style={{ y: y3, rotate: rotate2 }}>
          <motion.div animate={hoverAnimation3} className="w-full h-full opacity-95">
            <Image src="/images/3denvelope.png" alt="3D Envelope" fill className="object-contain z-999" />
          </motion.div>
        </motion.div>

        {/* Bottom Right (Pie Chart) */}
        <motion.div className="absolute -bottom-22 md:-bottom-30 -right-16 md:-right-15 w-30 h-28 md:w-50 md:h-64 lg:w-65 lg:h-72 xl:w-80 xl:h-90 pointer-events-none z-20" style={{ y: y4, rotate: rotate1 }}>
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

              <div className="text-xs font-bw-gradual font-semibold text-primary-purple uppercase tracking-wider">Contact us</div>
              <h2 className="text-2xl md:text-3xl font-bw-gradual font-bold text-center text-black">Ready to turn shopping into a social, engaging experience?</h2>

              {/* Main Content - Two Column Layout */}
              <div className="w-full flex flex-col md:flex-row gap-8">
                {/* Left Column - Contact Info */}
                <div className="w-full md:w-1/3 flex flex-col gap-4 order-2 md:order-1">
                  {/* Copenhagen Office */}
                  <div className="p-4 bg-neutral-light rounded-xl border border-neutral-medium">
                    <h3 className="font-bold text-black mb-2 text-sm">Copenhagen</h3>
                    <p className="font-semibold text-black text-sm">Appstract ApS</p>
                    <p className="text-gray-600 text-sm">Strandgade 56, 2nd floor</p>
                    <p className="text-gray-600 text-sm">1401 Copenhagen, Denmark</p>
                    <p className="mt-2 text-gray-600 text-sm">+45 2614 8222</p>
                  </div>

                  {/* San Francisco Office */}
                  <div className="p-4 bg-neutral-light rounded-xl border border-neutral-medium">
                    <h3 className="font-bold text-black mb-2 text-sm">San Francisco</h3>
                    <p className="font-semibold text-black text-sm">Appstract System Inc.</p>
                    <p className="text-gray-600 text-sm">1 Ferry Building, Suite 201</p>
                    <p className="text-gray-600 text-sm">San Francisco, CA 94111, USA</p>
                    <p className="mt-2 text-gray-600 text-sm">+1 (628) 289 3629</p>
                  </div>

                  {/* Email */}
                  <div className="p-4 bg-neutral-light rounded-xl border border-neutral-medium">
                    <h3 className="font-bold text-black mb-2 text-sm">Email</h3>
                    <a href="mailto:hey@appstract.co" className="text-primary-purple hover:underline font-medium text-sm">
                      hey@appstract.co
                    </a>
                  </div>
                </div>

                {/* Right Column - Contact Form */}
                <div className="w-full md:w-2/3 order-1 md:order-2">
                  <form className="w-full flex flex-col gap-4">
                    <input type="text" placeholder="Full Name *" required className="bg-neutral-light text-black text-body rounded-xl px-4 py-3 border border-neutral-medium focus:border-primary-purple focus:outline-none transition-colors duration-200" />
                    <input type="text" placeholder="Company Name" className="bg-neutral-light text-black text-body rounded-xl px-4 py-3 border border-neutral-medium focus:border-primary-purple focus:outline-none transition-colors duration-200" />
                    <input type="email" placeholder="Email *" required className="bg-neutral-light text-black text-body rounded-xl px-4 py-3 border border-neutral-medium focus:border-primary-purple focus:outline-none transition-colors duration-200" />
                    <input type="tel" placeholder="Phone" className="bg-neutral-light text-black text-body rounded-xl px-4 py-3 border border-neutral-medium focus:border-primary-purple focus:outline-none transition-colors duration-200" />
                    <textarea placeholder="Message" className="bg-neutral-light text-black text-body rounded-xl px-4 py-3 border border-neutral-medium focus:border-primary-purple focus:outline-none transition-colors duration-200 min-h-32" />
                    <button type="submit" className="cursor-pointer bg-gradient-primary text-white font-bold rounded-full px-6 py-3 shadow-button transition-colors duration-200 hover:bg-primary-purple">
                      Submit
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
