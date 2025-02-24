import { ReactElement } from "react";
import { motion } from "framer-motion"; // Import motion for animations

export interface ButtonProps {
    variant: "primary" | "secondary";
    text: string;
    onClick?: () => void;
    loading?: boolean;
    className?: string;
    startIcon?: ReactElement; // Optional icon
}

const variantClasses = {
    primary: "bg-[#7164c0] text-white hover:bg-[#5a4e9f] transition duration-300",
    secondary: "bg-[#d9ddee] text-[#7164c0] hover:bg-[#c8cde0] transition duration-300",
};

export function SideBarButton({ variant, text, onClick, loading, className, startIcon }: ButtonProps) {
    return (
        <motion.button
            className={`${variantClasses[variant]} ${ "w-[80%]"} ${className || ""} px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 cursor-pointer`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }} // Slight scale-down on click
            transition={{ duration: 0.2 }} // Smooth transition
            onClick={onClick}
            disabled={loading}
        >
            {/* Start Icon */}
            {startIcon && <div className="flex items-center">{startIcon}</div>}

            {/* Button Text */}
            <span>{loading ? "Loading..." : text}</span>
        </motion.button>
    );
}