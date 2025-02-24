import { ReactElement } from "react";

export interface ButtonProps {
    variant: "primary" | "secondary";
    text: string;
    startIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean;
    className?: string; // Add className to the props
}

const variantClasses = {
    "primary": "bg-[#7164c0] text-white py-3 px-6 hover:bg-[#5a4e9f] transition duration-300 cursor-pointer", // Added cursor-pointer
    "secondary": "bg-[#d9ddee] text-purple-400 py-3 px-6 hover:bg-[#c8cde0] transition duration-300 cursor-pointer", // Added cursor-pointer
};

const defaultStyles = "px-4 py-2 rounded-md font-semibold flex items-center";

export function Button({ variant, text, startIcon, onClick, fullWidth, loading, className }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`${variantClasses[variant]} ${defaultStyles} ${fullWidth ? "w-full flex justify-center items-center" : ""} ${loading ? "opacity-45" : ""} ${className || ""}`}
            disabled={loading}
        >
            <div className="pr-2">
                {startIcon}
            </div>
            {text}
        </button>
    );
}