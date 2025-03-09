import { ReactElement } from "react";
import { motion } from "framer-motion";

// Renamed to match Sidebar usage
export function LogoutText({ title }: { title: string }) {
    return (
        <span className="text-3xl">
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
    primary: "bg-[#7164c0] text-white hover:bg-[#5a4e9f] transition duration-300",
    secondary: "bg-[#d9ddee] text-[#7164c0] hover:bg-[#c8cde0] transition duration-300",
};

export function LogoutButton({ variant, text, onClick, loading, className, startIcon }: ButtonProps) {
    return (
<motion.button
            className={`${variantClasses[variant]} ${"w-[70%]"} ${className || ""} rounded-lg font-semibold flex items-center justify-center space-x-2 cursor-pointer`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClick}
            disabled={loading}
        >
            {/* Start Icon and Text */}
            {startIcon && (
                <div className="flex items-center">
                    {startIcon}
                    {text && <span className="ml-2">{loading ? "Loading..." : text}</span>}
                </div>
            )}
            {/* Text Only (if no startIcon) */}
            {!startIcon && <span>{loading ? "Loading..." : text}</span>}
        </motion.button>    );
}