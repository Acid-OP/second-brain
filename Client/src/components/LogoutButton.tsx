import { ReactElement } from "react";
import { motion } from "framer-motion";

// Adjusted LogoutText to match your provided version
export function LogoutText({ title }: { title: string }) {
  return (
    <span className="text-lg sm:text-xl md:text-xl lg:text-2xl font-medium tracking-tight">
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
        startIcon ? "w-[80%] py-2 sm:py-2.5 md:py-2.5 lg:py-3 px-2 sm:px-3 md:px-4 lg:px-4" : "w-[50%] py-1.5 sm:py-2 md:py-2 lg:py-2.5 px-2 sm:px-2 md:px-3 lg:px-3"
      } ${className || ""} rounded-md sm:rounded-md md:rounded-lg lg:rounded-lg font-semibold flex items-center justify-center gap-1 sm:gap-1 md:gap-2 lg:gap-2 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={onClick}
      disabled={loading}
    >
      {/* Start Icon and Text */}
      {startIcon && (
        <div className="flex items-center gap-1 sm:gap-1 md:gap-2 lg:gap-2">
          {startIcon}
          {text && (
            <span className="text-xs sm:text-sm md:text-sm lg:text-base pr-1">
              {loading ? "Loading..." : text}
            </span>
          )}
        </div>
      )}
      {/* Text Only (if no startIcon) */}
      {!startIcon && (
        <span className="text-xs sm:text-sm md:text-sm lg:text-base">
          {loading ? "Loading..." : text}
        </span>
      )}
    </motion.button>
  );
}