"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";
import cookieData from "@/data/cookies.json";
import { useIsMobile } from "@/lib/hooks";

const CONSENT_KEY = "gdpr_cookie_consent";
const CONSENT_VERSION = "1.0";

interface ConsentState {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface SavedConsent {
  v: string;
  t: number;
  e: number;
  c: ConsentState;
}

const Toggle = ({ active, disabled, onChange }: { active: boolean; disabled?: boolean; onChange: () => void }) => (
  <button
    onClick={disabled ? undefined : onChange}
    disabled={disabled}
    role="switch"
    aria-checked={active}
    className="relative shrink-0 transition-colors duration-200"
    style={{
      width: 44,
      height: 24,
      background: active ? "rgba(109, 94, 252, 0.5)" : "rgba(109, 94, 252, 0.15)",
      borderRadius: 12,
      cursor: disabled ? "not-allowed" : "pointer",
      border: "none",
      padding: 0,
      opacity: disabled ? 0.6 : 1,
    }}
  >
    <span
      className="absolute transition-all duration-200"
      style={{
        top: 2,
        left: active ? 22 : 2,
        width: 20,
        height: 20,
        background: active ? "#6D5EFC" : "rgba(109, 94, 252, 0.5)",
        borderRadius: "50%",
        boxShadow: active ? "0 2px 4px rgba(0,0,0,0.2)" : "none",
      }}
    />
  </button>
);

const loadConsent = (): ConsentState | null => {
  if (typeof window === "undefined") return null;
  try {
    const data: SavedConsent = JSON.parse(localStorage.getItem(CONSENT_KEY) || "");
    if (!data || data.e < Date.now() || data.v !== CONSENT_VERSION) {
      localStorage.removeItem(CONSENT_KEY);
      return null;
    }
    return data.c;
  } catch {
    return null;
  }
};

const saveConsent = (consent: ConsentState, expiryDays: number) => {
  if (typeof window === "undefined") return;
  const data: SavedConsent = {
    v: CONSENT_VERSION,
    t: Date.now(),
    e: Date.now() + expiryDays * 86400000,
    c: consent,
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent("cookieConsent", { detail: consent }));
};

export default function CookieConsent() {
  const [showModal, setShowModal] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  const { texts, categories, links, settings } = cookieData;

  useEffect(() => {
    const saved = loadConsent();
    if (saved) {
      setConsent(saved);
      setShowFab(true);
    } else {
      setShowModal(true);
    }
  }, []);

  const openModal = useCallback(() => {
    setShowModal(true);
    setIsExpanded(false);
  }, []);

  const handleAccept = useCallback(() => {
    const newConsent: ConsentState = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setConsent(newConsent);
    saveConsent(newConsent, settings.expiryDays);
    setShowModal(false);
    setShowFab(true);
  }, [settings.expiryDays]);

  const handleReject = useCallback(() => {
    const newConsent: ConsentState = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    setConsent(newConsent);
    saveConsent(newConsent, settings.expiryDays);
    setShowModal(false);
    setShowFab(true);
  }, [settings.expiryDays]);

  const handleSave = useCallback(() => {
    saveConsent(consent, settings.expiryDays);
    setShowModal(false);
    setShowFab(true);
  }, [consent, settings.expiryDays]);

  const toggleCategory = useCallback((cat: keyof ConsentState) => {
    if (cat === "necessary") return;
    setConsent((prev) => ({ ...prev, [cat]: !prev[cat] }));
  }, []);

  const glassStyles = {
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    background: "rgba(28, 28, 28, 0.9)",
  };

  return (
    <>
      {/* FAB Button */}
      <AnimatePresence>
        {showFab && !showModal && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)" }}
            onClick={openModal}
            className="fixed bottom-6 left-6 flex items-center justify-center gap-2 cursor-pointer z-50"
            style={{
              ...glassStyles,
              padding: isMobile ? 16 : "12px 18px",
              width: isMobile ? 56 : "auto",
              height: isMobile ? 56 : "auto",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: 100,
              color: "white",
              opacity: 0.8,
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Cookie size={isMobile ? 28 : 18} />
            {!isMobile && <span className="text-sm font-medium">{texts.settingsButton}</span>}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-99"
              style={{
                background: "rgba(0, 0, 0, 0.6)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
              onClick={() => {
                if (loadConsent()) {
                  setShowModal(false);
                }
              }}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-6 left-6 z-100 overflow-hidden"
              style={{
                ...glassStyles,
                width: "calc(100% - 48px)",
                maxWidth: 420,
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: 16,
                boxShadow: "0 24px 48px rgba(0, 0, 0, 0.4)",
              }}
              role="dialog"
              aria-modal="true"
            >
              {/* Main Content */}
              <div className="p-7">
                <h2 className="text-xl font-semibold text-white mb-3" style={{ letterSpacing: "-0.02em" }}>
                  {texts.title}
                </h2>
                <p className="text-sm text-white/70 mb-6 leading-relaxed">
                  {texts.description}{" "}
                  {links.privacy && (
                    <a href={links.privacy} target="_blank" rel="noopener noreferrer" className="underline hover:text-white/90 transition-colors">
                      {texts.learnMore}
                    </a>
                  )}
                </p>

                {/* Buttons */}
                {!isExpanded && (
                  <div className="flex gap-2.5">
                    <motion.button
                      whileHover={{ opacity: 0.9 }}
                      onClick={handleAccept}
                      className="flex-1 py-3.5 px-5 rounded-lg text-sm font-semibold cursor-pointer border-none transition-colors"
                      style={{
                        background: "#FFFFFF",
                        color: "#000000",
                      }}
                    >
                      {texts.accept}
                    </motion.button>
                    <motion.button
                      whileHover={{ opacity: 0.8 }}
                      onClick={handleReject}
                      className="flex-1 py-3.5 px-5 rounded-lg text-sm font-semibold cursor-pointer transition-colors"
                      style={{
                        background: "transparent",
                        color: "white",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                      }}
                    >
                      {texts.reject}
                    </motion.button>
                  </div>
                )}

                {/* Categories */}
                {isExpanded && (
                  <div className="-mx-2 px-2">
                    {(Object.keys(categories) as Array<keyof typeof categories>).map((key) => {
                      const cat = categories[key];
                      return (
                        <div key={key} className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
                          <div className="flex-1 mr-4">
                            <div className="text-sm font-semibold text-white mb-1">{cat.name}</div>
                            <div className="text-xs text-white/70 leading-relaxed">{cat.description}</div>
                          </div>
                          <Toggle active={consent[key]} disabled={key === "necessary"} onChange={() => toggleCategory(key)} />
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Save */}
                {isExpanded && (
                  <motion.button
                    whileHover={{ opacity: 0.9 }}
                    onClick={handleSave}
                    className="w-full py-3.5 px-6 rounded-lg text-sm font-semibold cursor-pointer border-none mt-6 transition-colors"
                    style={{
                      background: "#FFFFFF",
                      color: "#000000",
                    }}
                  >
                    {texts.save}
                  </motion.button>
                )}

                {/* Customize */}
                {!isExpanded && (
                  <button onClick={() => setIsExpanded(true)} className="block w-full text-center mt-4 text-sm text-white/50 hover:text-white/70 cursor-pointer bg-transparent border-none underline underline-offset-2 transition-colors">
                    {texts.customize}
                  </button>
                )}
              </div>

              {/* Footer Links */}
              <div
                className="flex justify-center gap-6 py-4 px-7"
                style={{
                  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  background: "rgba(0, 0, 0, 0.15)",
                }}
              >
                {links.privacy && (
                  <a href={links.privacy} target="_blank" rel="noopener noreferrer" className="text-xs text-white! hover:opacity-80 transition-opacity">
                    {texts.privacy}
                  </a>
                )}
                {links.cookie && (
                  <a href={links.cookie} target="_blank" rel="noopener noreferrer" className="text-xs text-white! hover:opacity-80 transition-opacity">
                    {texts.cookie}
                  </a>
                )}
                {links.imprint && (
                  <a href={links.imprint} target="_blank" rel="noopener noreferrer" className="text-xs text-white! hover:opacity-80 transition-opacity">
                    {texts.imprint}
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
