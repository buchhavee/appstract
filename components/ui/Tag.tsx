interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "gradient";
  className?: string;
}

export default function Tag({ children, variant = "default", className = "" }: TagProps) {
  const baseStyles = "inline-flex items-center justify-center px-4 py-1 min-w-20 min-h-6 rounded-2xl text-base font-semibold leading-normal";

  const variants = {
    default: "border border-[var(--border-dark)] text-[var(--text-secondary)]",
    gradient: "bg-[var(--gradient-primary)] border border-white text-white",
  };

  return <span className={`${baseStyles} ${variants[variant]} ${className}`}>{children}</span>;
}
