import { ReactNode } from "react";

export interface ButtonProps {
  variant: "primary" | "secondary" | "sidebar";
  text?: string;
  startIcon?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  fullWidth?: boolean;
  loading?: boolean;
  className?: string;
}

const variantClasses = {
  primary:
    "bg-[#7164c0] text-white hover:bg-[#5a4e9f] focus:ring-2 focus:ring-[#7164c0] focus:ring-opacity-50 cursor-pointer shadow-md",
  secondary:
    "bg-[#d9ddee] text-purple-400 hover:bg-[#c8cde0] border border-purple-200 hover:text-purple-500 cursor-pointer shadow-sm",
  sidebar: "bg-white text-gray-700 hover:bg-gray-50",
};

// Responsive styles with base for lg and above, scaling down for md and sm
const defaultStyles =
  "px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 text-sm sm:text-base md:text-md rounded-lg flex items-center gap-2 transition-all duration-300 ease-in-out group relative overflow-hidden";

export function Button({
  variant,
  text,
  startIcon,
  onClick,
  fullWidth,
  loading,
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`group ${variantClasses[variant]} ${defaultStyles} ${
        fullWidth ? "w-full justify-center" : ""
      } ${loading ? "opacity-50 cursor-not-allowed" : ""} ${className || ""}`}
      disabled={loading}
    >
      {/* Background layer that moves upward on hover */}
      <span className="absolute inset-0 bg-inherit rounded-lg transition-transform duration-300 ease-in-out group-hover:-translate-y-1 group-active:scale-95 z-0" />
      
      {/* Content stays stationary */}
      <div className="relative z-10 flex items-center gap-2">
        {startIcon && <div className="flex items-center">{startIcon}</div>}
        {text && (
          <span className={variant === "primary" ? "font-semibold" : "font-bold"}>
            {text}
          </span>
        )}
      </div>
    </button>
  );
}