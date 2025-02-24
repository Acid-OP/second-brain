import { ReactElement } from "react";
import { motion } from "framer-motion";

export interface Topbar {
    icon: ReactElement;
    title: ReactElement;
    onClick?: () => void;
}

export function TopBar(props: Topbar) {
    return (
        <motion.div
            className="flex items-center gap-3 cursor-pointer" // Added gap and cursor-pointer
            whileHover={{ scale: 1.02 }} // Subtle scale-up on hover
            transition={{ duration: 0.2 }}
            onClick={props.onClick}
        >
            {/* Icon */}
            <div className="flex justify-center items-center">
                {props.icon}
            </div>

            {/* Title */}
            <div className="text-2xl font-bold text-gray-900 tracking-tight">
                {props.title}
            </div>
        </motion.div>
    );
}
export function TopBarComp() {
    return (
        <div className="flex justify-center gap-6 md:gap-10 w-full max-w-md">
            {["Features", "Solutions", "Resources", "Prices"].map((item, index) => (
                <motion.div
                    key={index}
                    className="text-neutral-800 font-semibold text-base hover:bg-[#f1f1f1] py-2 px-4 rounded-full cursor-pointer transition duration-300"
                    whileHover={{ y: -2 }} // Slight lift on hover
                    transition={{ duration: 0.2 }}
                >
                    {item}
                </motion.div>
            ))}
        </div>
    );
}

export function TopBarSignin() {
    return (
        <motion.div
            className="flex justify-between w-max"
            whileHover={{ scale: 1.05 }} // Subtle scale-up on hover
            transition={{ duration: 0.2 }}
        >
            <button className="bg-[#7950f2] text-white font-semibold text-base py-2.5 px-7 rounded-full hover:bg-[#6a42c1] focus:outline-none focus:ring-2 focus:ring-[#6a42c1] cursor-pointer transition duration-300 shadow-md hover:shadow-lg">
                Sign In
            </button>
        </motion.div>
    );
}