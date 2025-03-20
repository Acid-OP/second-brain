import { ReactElement } from "react";
import { motion } from "framer-motion";

// Renamed to match Sidebar usage
export function LogoutText({ title }: { title: string }) {
  return (
    <span className="text-2xl font-medium tracking-tight">
      {title}
    </span>
  );
}

export interface ButtonProps {
  variant: "primary" | "secondary";
  text: ReactElement | string;
  onClick?: () => void;
  loading?: boolean;
  className?: string;
  startIcon?: ReactElement;
}

const variantClasses = {
  primary:
    "bg-gradient-to-r from-[#8b6cf5] to-[#6a5eb3] text-white hover:from-[#7c5de0] hover:to-[#5a4e9f] shadow-md hover:shadow-lg border border-[#6a42c1]/20",
  secondary:
    "bg-[#e9ecef] text-[#7164c0] hover:bg-[#d9ddee] shadow-sm hover:shadow-md border border-[#7164c0]/20",
};

export function LogoutButton({
  variant,
  text,
  onClick,
  loading,
  className,
  startIcon,
}: ButtonProps) {
  return (
    <motion.button
      className={`${variantClasses[variant]} ${
        startIcon ? "w-[80%] py-2.5 px-4" : "w-[50%] py-2 px-3"
      } ${className || ""} rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={onClick}
      disabled={loading}
    >
      {/* Start Icon and Text */}
      {startIcon && (
        <div className="flex items-center gap-2">
          {startIcon}
          {text && (
            <span className="text-sm md:text-base">
              {loading ? "Loading..." : text}
            </span>
          )}
        </div>
      )}
      {/* Text Only (if no startIcon) */}
      {!startIcon && (
        <span className="text-sm md:text-base">
          {loading ? "Loading..." : text}
        </span>
      )}
    </motion.button>
  );
}