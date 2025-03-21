import { ReactElement } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface TopbarProps {
    icon: ReactElement;
    title: ReactElement;
    onClick?: () => void;
}

export function TopBar({ icon, title, onClick }: TopbarProps) {
    return (
        <motion.div
            className="flex items-center gap-2 sm:gap-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            onClick={onClick}
        >
            <div className="flex justify-center items-center">{icon}</div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                {title}
            </div>
        </motion.div>
    );
}

interface TopBarCompProps {
    scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
    refs: {
        dashboardRef: React.RefObject<HTMLDivElement>;
        featuresRef: React.RefObject<HTMLDivElement>; // Updated from queryRef
    };
}

export function TopBarComp({ scrollToSection, refs }: TopBarCompProps) {
    const sections = [
        { name: "Dashboard", ref: refs.dashboardRef },
        { name: "Features", ref: refs.featuresRef }, // Updated from "Query"
    ];

    return (
        <div className="hidden md:flex items-center justify-center gap-4 sm:gap-6 md:gap-8 w-full max-w-md">
            {sections.map((item, index) => (
                <motion.div
                    key={index}
                    className="text-neutral-800 font-semibold text-sm sm:text-base md:text-lg hover:bg-[#f1f1f1] py-2 px-4 rounded-full cursor-pointer transition duration-300 text-center"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => scrollToSection(item.ref)}
                >
                    {item.name}
                </motion.div>
            ))}
        </div>
    );
}

export function TopBarSignin() {
    const navigate = useNavigate();

    const redirect = () => {
        navigate("/signup");
    };

    return (
        <motion.div
            className="flex justify-between w-max"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
        >
            <button
                onClick={redirect}
                className="bg-[#7950f2] text-white font-semibold text-base py-2.5 px-7 rounded-full hover:bg-[#6a42c1] focus:outline-none focus:ring-2 focus:ring-[#6a42c1] cursor-pointer transition duration-300 shadow-md hover:shadow-lg"
            >
                Sign Up
            </button>
        </motion.div>
    );
}