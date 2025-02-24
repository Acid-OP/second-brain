import { ReactElement } from "react";
import { motion } from "framer-motion"; // Import motion for animations

export interface Sidebaritem {
    text: ReactElement;
    icon: ReactElement;
    onClick?: () => void;
}

export function SidebarItem(props: Sidebaritem) {
    return (
        <motion.div
            className="flex items-center text-gray-700 cursor-pointer hover:bg-gray-100 rounded-lg pl-4 py-2 max-w-48 transition-all duration-300"
            // whileHover={{ scale: 1.05 }} // Slight scale-up on hover
            whileHover={{ y: -2 }} // Slight lift on hover
            transition={{ duration: 0.2 }} // Smooth transition
            onClick={props.onClick}
        >
            <div className="flex justify-center gap-4 items-center h-12">
                <div className="flex items-center h-full">
                    {props.icon}
                </div>
                <div className="flex items-center h-full">
                    {props.text}
                </div>
            </div>
        </motion.div>
    );
}

export function Text({ title }: { title: string }) {
    return (
        <div className="flex">
            <span className="text-gray-600 text-xl font-medium">{title}</span>
        </div>
    );
}

export interface mvp {
    icon: ReactElement;
    title: ReactElement;
    onClick?: () => void;
}

export function Mvp(props: mvp) {
    return (
        <motion.div
            className="flex mt-8 items-center"
            whileHover={{ scale: 1.02 }} // Slight scale-up on hover
            transition={{ duration: 0.2 }} // Smooth transition
        >
            <div className="flex justify-center pl-4 items-center cursor-pointer" onClick={props.onClick}>
                {props.icon}
                {props.title}
            </div>
        </motion.div>
    );
}

export function IconComponent({ src, alt }: { src: string; alt?: string }) {
    return (
        <div>
            <img src={src} alt={alt || "Icon"} width="45" height="45" />
        </div>
    );
}

export function TextComponent({ title }: { title: string }) {
    return (
        <div className="flex mb-4">
            <span className="text-black text-2xl pl-2 font-medium pt-3">{title}</span>
        </div>
    );
}