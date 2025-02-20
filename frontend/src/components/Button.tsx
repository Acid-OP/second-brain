import { ReactElement } from "react";


export interface ButtonProps {
    variant: "primary" | "secondary";
    text: string;
    startIcon?: ReactElement;
    onClick ?: () => void;
    fullWidth?: boolean;
    loading ?: boolean;
}
const variantClasses = {
    "primary" : "bg-[#7164c0] text-white py-3 px-6",
    "secondary" : "bg-[#d9ddee] text-purple-400 py-3 px-6",
};

const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center";

export function Button({variant , text , startIcon , onClick , fullWidth,loading }: ButtonProps) {
    return <button onClick={onClick} className={variantClasses[variant] + " " + defaultStyles + `${fullWidth ? " w-full flex justify-center items-center" : ""} ${loading ? "opacity-45" : ""}`} disabled = {loading}>
        <div className="pr-2">
        {startIcon}
        </div>
        {text} 
    </button>
}