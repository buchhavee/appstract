interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "gradient";
  className?: string;
}

export default function Tag({ children, variant = "default", className = "" }: TagProps) {
  const baseStyles = "inline-flex items-center justify-center px-4 py-1 min-w-[84px] min-h-[24px] rounded-[var(--radius-md)] font-[family-name:var(--font-bw-gradual)] text-base font-semibold leading-[1.5]";

  const variants = {
    default: "border border-[var(--border-dark)] text-[var(--text-secondary)]",
    gradient: "bg-[var(--gradient-primary)] border border-white text-white",
  };

  return <span className={`${baseStyles} ${variants[variant]} ${className}`}>{children}</span>;
}
