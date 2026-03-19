"use client";

import Link from "next/link";
import { Logo } from "@/components/ui";
import footerData from "@/data/footer.json";

export default function Footer() {
  return (
    <footer className="relative z-[2] w-full min-h-[30svh] lg:min-h-[50svh] pt-26 px-5 md:px-20 flex flex-col items-center justify-end" style={{ paddingBottom: "calc(3rem + env(safe-area-inset-bottom, 0px))" }}>
      {/* Background gradient - extends into safe area */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(78,195,239,1) 40%, rgba(109,94,252,1) 100%)",
          bottom: "calc(-1 * env(safe-area-inset-bottom, 0px))",
        }}
      />

      {/* Footer content */}
      <div className="relative w-full max-w-7xl">
        {/* Glass Card */}
        <div
          className="relative w-full rounded-3xl p-6 md:p-10 flex flex-col gap-16 md:gap-24"
          style={{
            background: "rgba(0,0,0,0.2)",
            boxShadow: "0px 4px 20.8px rgba(0,0,0,0.1), inset 0px 4px 29.7px rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          {/* Logo */}
          <Logo href={footerData.logo.href} size="md" />

          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-6">
            {/* Offices */}
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
              {footerData.offices.map((office, index) => (
                <div key={index} className="flex flex-row gap-8 sm:gap-16">
                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-bw-gradual font-bold text-white">{office.city}</h4>
                    {office.lines.map((line, li) => (
                      <p key={li} className="text-sm font-bw-gradual text-white/80 leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                  {index < footerData.offices.length - 1 && <div className="hidden sm:block w-px h-full bg-white/30" />}
                </div>
              ))}
            </div>

            {/* Links */}
            <nav className="flex gap-12 text-sm text-white">
              {/* Left column */}
              <div className="flex flex-col font-bw-gradual order-2 md:order-1 lg:order-1 gap-3">
                {footerData.links
                  .filter((l) => l.label === "LinkedIn" || l.label === "Contact")
                  .map((link, index) =>
                    link.label === "Contact" ? (
                      <button key={index} onClick={() => window.dispatchEvent(new Event("modalOpen"))} className="flex items-center gap-1.5 hover:opacity-80 transition-opacity text-left cursor-pointer">
                        {link.label}
                      </button>
                    ) : (
                      <Link key={index} href={link.href} {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="flex items-center gap-1.5 hover:opacity-80 transition-opacity underline">
                        {link.label}
                        {link.label === "LinkedIn" && (
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        )}
                      </Link>
                    ),
                  )}
              </div>
              {/* Right column */}
              <div className="flex flex-col font-bw-gradual gap-3">
                {footerData.links
                  .filter((l) => l.label !== "LinkedIn" && l.label !== "Contact")
                  .map((link, index) => (
                    <Link key={index} href={link.href} {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="hover:opacity-80 transition-opacity underline">
                      {link.label}
                    </Link>
                  ))}
              </div>
            </nav>
          </div>

          {/* Divider & Copyright */}
          <div className="flex flex-col items-end gap-2 w-full">
            <div className="w-full h-px bg-white/30" />

            {/* Copyright */}
            <p className="text-xs font-bw-gradual text-white/70">{footerData.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
