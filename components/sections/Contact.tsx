"use client";

import { useState, useEffect, useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LiquidBackground, ConicButton } from "@/components/ui";
import { Floating3DImage, ContactModal } from "./contact-components";
import contactData from "@/data/contact.json";

// 3D floating images configuration
const floatingImages = [
  {
    src: "/images/3d/3dlinegraph.png",
    alt: "3D Line Graph",
    positionClasses: "-top-13 md:-top-32 lg:-top-36 xl:-top-44 -left-13 md:-left-20 lg:-left-28 xl:-left-36 w-40 h-36 md:w-50 md:h-64 lg:w-65 lg:h-72 xl:w-96 xl:h-110",
    yRange: [100, -100] as [number, number],
    rotateRange: [-5, 5] as [number, number],
    floatClass: "float-a",
  },
  {
    src: "/images/3d/3dchatbubble.png",
    alt: "3D Chat Bubble",
    positionClasses: "-top-13 md:-top-32 lg:-top-36 xl:-top-44 -right-10 md:-right-20 lg:-right-28 xl:-right-36 w-40 h-40 md:w-50 md:h-72 lg:w-62 lg:h-72 xl:w-96 xl:h-110",
    yRange: [80, -120] as [number, number],
    rotateRange: [5, -5] as [number, number],
    floatClass: "float-b",
  },
  {
    src: "/images/3d/3denvelope.png",
    alt: "3D Envelope",
    positionClasses: "-bottom-20 md:-bottom-28 lg:-bottom-32 xl:-bottom-40 -left-12 md:-left-20 lg:-left-28 xl:-left-36 w-40 h-36 md:w-50 md:h-64 lg:w-62 lg:h-72 xl:w-96 xl:h-110",
    yRange: [120, -80] as [number, number],
    rotateRange: [5, -5] as [number, number],
    floatClass: "float-c",
  },
  {
    src: "/images/3d/3dpiechart.png",
    alt: "3D Pie Chart",
    positionClasses: "-bottom-35 md:-bottom-44 lg:-bottom-48 xl:-bottom-56 -right-10 md:-right-20 lg:-right-28 xl:-right-36 w-40 h-36 md:w-50 md:h-64 lg:w-65 lg:h-72 xl:w-96 xl:h-110",
    yRange: [60, -140] as [number, number],
    rotateRange: [-5, 5] as [number, number],
    floatClass: "float-d",
  },
];

export default function ContactSection() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setSubmitted(false), 300);
  };

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y0 = useTransform(scrollYProgress, [0, 1], floatingImages[0].yRange);
  const y1 = useTransform(scrollYProgress, [0, 1], floatingImages[1].yRange);
  const y2 = useTransform(scrollYProgress, [0, 1], floatingImages[2].yRange);
  const y3 = useTransform(scrollYProgress, [0, 1], floatingImages[3].yRange);
  const yValues = [y0, y1, y2, y3];

  const rotate0 = useTransform(scrollYProgress, [0, 1], floatingImages[0].rotateRange);
  const rotate1 = useTransform(scrollYProgress, [0, 1], floatingImages[1].rotateRange);
  const rotate2 = useTransform(scrollYProgress, [0, 1], floatingImages[2].rotateRange);
  const rotate3 = useTransform(scrollYProgress, [0, 1], floatingImages[3].rotateRange);
  const rotateValues = [rotate0, rotate1, rotate2, rotate3];

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
    <section ref={sectionRef} className="section section-padding pt-12! md:pt-40! -mt-16 md:-mt-24 flex flex-col items-center justify-center bg-white relative overflow-x-clip overflow-y-visible z-10">
      <div className="relative w-full flex flex-col items-center justify-center min-h-[60svh] max-w-7xl rounded-3xl border border-black/15 p-8 md:p-16 overflow-visible">
        {/* Background gradient */}
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

        {/* Content */}
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

        {/* Floating 3D Images */}
        {floatingImages.map((image, index) => (
          <Floating3DImage key={image.src} src={image.src} alt={image.alt} positionClasses={image.positionClasses} y={yValues[index]} rotate={rotateValues[index]} floatClass={image.floatClass} />
        ))}
      </div>

      {/* Contact Modal */}
      <ContactModal open={open} submitted={submitted} onClose={handleClose} onSubmit={handleSubmit} />
    </section>
  );
}
