"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import OfficeCard from "./OfficeCard";
import ContactForm from "./ContactForm";
import ConfirmationView from "./ConfirmationView";
import { ContactModalProps, Office, FormField } from "./types";
import contactData from "@/data/contact.json";

// Type assertion for contact data
const offices = contactData.modal.offices as Office[];
const formFields = contactData.modal.form.fields as FormField[];

export default function ContactModal({ open, submitted, onClose, onSubmit }: ContactModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.25 }} className="fixed inset-0 z-100 flex items-center justify-center bg-linear-to-br from-violet-500/30 to-cyan-400/60 backdrop-blur-sm shadow-2xl overflow-hidden" style={{ touchAction: "none", overscrollBehavior: "contain" }} onClick={onClose} onWheel={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()}>
          <motion.div className="bg-white lg:pr-8 md:rounded-2xl shadow-lg max-w-3xl md:max-w-4xl lg:max-w-5xl w-full flex flex-col md:flex-row relative max-h-dvh overflow-y-auto mx-0 h-full md:h-auto" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: 0.25 }} onClick={(e) => e.stopPropagation()}>
            {/* Desktop Back Button */}
            <button className="hidden md:flex flex-col items-center justify-start gap-1 pt-12 px-5 text-neutral-medium hover:text-black transition-colors cursor-pointer shrink-0" onClick={onClose} aria-label="Back">
              <ChevronLeft className="w-4 h-4" />
              <span className="text-[10px] font-medium uppercase tracking-wider">Back</span>
            </button>

            <div className="flex flex-col gap-6 md:gap-8 p-6 md:p-12 flex-1 min-w-0">
              {/* Mobile Back Button */}
              <button className="flex md:hidden items-center gap-1 text-neutral-medium hover:text-black transition-colors cursor-pointer self-start" onClick={onClose} aria-label="Back">
                <ChevronLeft className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Back</span>
              </button>

              {/* Header - hidden in confirmation state */}
              {!submitted && (
                <div className="flex flex-col gap-2">
                  <div className="text-xs font-bw-gradual font-semibold text-primary-purple uppercase tracking-wider">{contactData.modal.tagline}</div>
                  <h2 className="text-xl md:text-3xl font-bw-gradual font-bold text-black">{contactData.modal.headline}</h2>
                </div>
              )}

              {/* Confirmation View or Form */}
              <AnimatePresence mode="wait">
                {submitted ? (
                  <ConfirmationView headline={contactData.modal.confirmation.headline} description={contactData.modal.confirmation.description} closeButtonText={contactData.modal.confirmation.closeButton} onClose={onClose} />
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    {/* Main Content - Two Column Layout */}
                    <div className="w-full flex flex-col md:flex-row gap-8">
                      {/* Left Column - Contact Info */}
                      <div className="w-full md:w-1/3 flex flex-col gap-4 order-2 md:order-1">
                        {/* Office Locations */}
                        {offices.map((office, index) => (
                          <OfficeCard key={index} office={office} index={index} />
                        ))}

                        {/* Email */}
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: offices.length * 0.05 }} className="p-5 bg-neutral-light/40 rounded-lg border border-black/40">
                          <h3 className="font-bw-gradual font-bold text-black mb-2 text-sm">{contactData.modal.email.label}</h3>
                          <a href={`mailto:${contactData.modal.email.address}`} className="text-primary-purple hover:text-primary-cyan transition-colors font-medium text-sm">
                            {contactData.modal.email.address}
                          </a>
                        </motion.div>
                      </div>

                      {/* Right Column - Contact Form */}
                      <div className="w-full md:w-2/3 order-1 md:order-2">
                        <ContactForm fields={formFields} submitButtonText={contactData.modal.form.submitButton} onSubmit={onSubmit} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
