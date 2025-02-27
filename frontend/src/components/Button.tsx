import { ReactNode } from "react";

export interface ButtonProps {
  variant: "primary" | "secondary" | "sidebar"; // Added sidebar variant
  text?: string; // Optional for icon-only buttons
  startIcon?: ReactNode; // Optional icon
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; // Optional click handler
  fullWidth?: boolean; // Optional flag for full-width styling
  loading?: boolean; // Optional flag for loading state
  className?: string; // Optional additional CSS classes
}

const variantClasses = {
  primary: "bg-[#7164c0]  py-3 px-6 hover:bg-[#5a4e9f] transition duration-300 cursor-pointer",
  secondary: "bg-[#d9ddee] text-purple-400 py-3 px-6 hover:bg-[#c8cde0] transition duration-300 cursor-pointer",
  sidebar: "bg-white text-gray-700" // Minimal base styling for sidebar toggle
};

const defaultStyles = "px-4 py-2 rounded-md flex items-center";

export function Button({ variant, text, startIcon, onClick, fullWidth, loading, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${variantClasses[variant]} ${defaultStyles} ${fullWidth ? "w-full flex justify-center items-center" : ""} ${loading ? "opacity-45" : ""} ${className || ""}`}
      disabled={loading}
    >
      {startIcon && <div className="pr-2">{startIcon}</div>}
      {text && text}
    </button>
  );
}