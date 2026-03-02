"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "ghost" | "expand";
  size?: "sm" | "md" | "lg";
  icon?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Button({ children, href, variant = "primary", size = "md", icon = false, className = "", onClick }: ButtonProps) {
  const baseStyles = "group relative inline-flex items-center justify-center gap-2 font-medium leading-normal rounded-full cursor-pointer overflow-hidden";

  const variants = {
    primary: "bg-white border border-white shadow-[var(--shadow-button)] hover:shadow-[var(--shadow-md)] transition-shadow duration-300",
    outline: "bg-transparent border border-black hover:bg-black transition-colors duration-300",
    ghost: "bg-transparent border-none",
    expand: "bg-white border border-white shadow-[var(--shadow-button)] hover:shadow-[var(--shadow-md)] transition-all duration-300 ease-out hover:px-10",
  };

  const sizes = {
    sm: "min-h-[34px] min-w-[96px] px-5 py-2 text-[1rem]",
    md: "min-h-[48px] min-w-[117px] px-6 py-3 text-[1rem]",
    lg: "min-h-[56px] min-w-[140px] px-8 py-4 text-[1.125rem]",
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {/* Rotating gradient hover effect */}
      {(variant === "primary" || variant === "expand") && (
        <div className="absolute inset-0 flex items-center justify-center z-1 pointer-events-none">
          <div
            className="w-40 h-40 rounded-full opacity-0 group-hover:opacity-70 transition-all duration-400 group-hover:w-32 group-hover:h-32"
            style={{
              background: "linear-gradient(135deg, #6D5EFC 0%, #4CC9F0 100%)",
              filter: "blur(10px)",
              animation: "spin-slow 3s linear infinite",
            }}
          />
        </div>
      )}
      <div className="flex items-center gap-2">
        <span className={`relative z-10 ${variant === "primary" || variant === "expand" ? "text-black group-hover:text-white" : "text-black"} transition-colors duration-300`}>{children}</span>
        {icon && <ChevronRight className={`relative z-10 w-5 h-5 ${variant === "primary" || variant === "expand" ? "text-black group-hover:text-white" : ""} transition-colors duration-300`} />}
      </div>
    </>
  );

  const hoverAnimation = variant === "expand" ? {} : { scale: 1.05 };

  if (href) {
    return (
      <motion.div whileHover={hoverAnimation} whileTap={{ scale: 0.98 }}>
        <Link href={href} className={combinedClasses}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button whileHover={hoverAnimation} whileTap={{ scale: 0.98 }} className={combinedClasses} onClick={onClick}>
      {content}
    </motion.button>
  );
}
