"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Modal } from "@/components/ui";
import OfficeCard from "./OfficeCard";
import ContactForm from "./ContactForm";
import ConfirmationView from "./ConfirmationView";
import { ContactModalProps, Office, FormField } from "./types";
import contactData from "@/data/contact.json";

const offices = contactData.modal.offices as Office[];
const formFields = contactData.modal.form.fields as FormField[];

export default function ContactModal({ open, submitted, onClose, onSubmit }: ContactModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      {/* Header */}
      {!submitted && (
        <div className="flex flex-col gap-2">
          <div className="text-xs font-bw-gradual font-semibold text-primary-purple uppercase tracking-wider">{contactData.modal.tagline}</div>
          <h2 className="text-xl md:text-3xl font-bw-gradual font-bold text-black">{contactData.modal.headline}</h2>
        </div>
      )}

      {/* Content */}
      <AnimatePresence mode="wait">
        {submitted ? (
          <ConfirmationView headline={contactData.modal.confirmation.headline} description={contactData.modal.confirmation.description} closeButtonText={contactData.modal.confirmation.closeButton} onClose={onClose} />
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            {/* Two Column Layout */}
            <div className="w-full flex flex-col md:flex-row gap-8">
              {/* Contact Info */}
              <div className="w-full md:w-1/3 flex flex-col gap-4 order-2 md:order-1">
                {/* Offices */}
                {offices.map((office, index) => (
                  <OfficeCard key={index} office={office} index={index} />
                ))}

                {/* Email */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: offices.length * 0.05 }} className="p-5 bg-neutral-light/10 rounded-lg border border-black/40">
                  <h3 className="font-bw-gradual font-bold text-black mb-2 text-sm">{contactData.modal.email.label}</h3>
                  <a href={`mailto:${contactData.modal.email.address}`} className="text-primary-purple hover:text-primary-cyan transition-colors font-medium text-sm">
                    {contactData.modal.email.address}
                  </a>
                </motion.div>
              </div>

              {/* Form */}
              <div className="w-full md:w-2/3 order-1 md:order-2">
                <ContactForm fields={formFields} submitButtonText={contactData.modal.form.submitButton} onSubmit={onSubmit} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
}
