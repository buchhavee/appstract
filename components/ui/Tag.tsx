interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "gradient" | "dark";
  className?: string;
}

export default function Tag({ children, variant = "default", className = "" }: TagProps) {
  const baseStyles = "inline-flex items-center justify-center px-4 py-1 min-w-20 min-h-6 rounded-2xl text-base font-semibold leading-normal";

  const variants = {
    default: "border border-[var(--border-dark)] bg-black/2 text-[var(--text-secondary)]",
    gradient: "bg-[var(--gradient-primary)] border border-white text-white",
    dark: "border border-white/30 text-white/80 bg-white/5",
  };

  return <span className={`${baseStyles} ${variants[variant]} ${className}`}>{children}</span>;
}
