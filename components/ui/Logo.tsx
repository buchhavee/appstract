import Link from "next/link";
import Image from "next/image";

type LogoSize = "sm" | "md" | "lg";

interface LogoProps {
  /** Link destination, defaults to "/" */
  href?: string;
  /** Size variant of the logo */
  size?: LogoSize;
  /** Additional class names */
  className?: string;
}

const sizeClasses: Record<LogoSize, { icon: string; text: string }> = {
  sm: {
    icon: "w-8 h-8",
    text: "h-5",
  },
  md: {
    icon: "w-10 h-10",
    text: "h-6",
  },
  lg: {
    icon: "w-8 h-8 lg:w-10 lg:h-10",
    text: "h-5 lg:h-7",
  },
};

export default function Logo({ href = "/", size = "md", className = "" }: LogoProps) {
  const sizes = sizeClasses[size];

  return (
    <Link href={href} className={`flex items-center gap-2 lg:gap-3 ${className}`}>
      <div className={`relative ${sizes.icon} rounded-[10px] overflow-hidden flex items-center justify-center`}>
        <Image src="/images/logo-icon.svg" alt="" width={40} height={40} className="object-contain" />
      </div>
      <Image src="/images/logo-text.svg" alt="Appstract" width={176} height={29} className={`${sizes.text} w-auto object-contain`} />
    </Link>
  );
}
