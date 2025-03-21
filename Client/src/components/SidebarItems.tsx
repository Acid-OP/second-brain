import { ReactElement } from "react";
import { motion } from "framer-motion";

export interface Sidebaritem {
  text?: ReactElement;
  icon: ReactElement;
  onClick?: () => void;
  open?: boolean;
}

export function SidebarItem(props: Sidebaritem) {
  return (
    <motion.div
      className={`flex items-center text-gray-700 cursor-pointer rounded-lg py-0.5 sm:py-1.5 md:py-2 transition-all duration-300 w-full ${
        props.open ? "hover:bg-gray-200" : "hover:bg-gray-100"
      }`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      onClick={props.onClick}
    >
      <div className={`flex items-center h-10 sm:h-12 md:h-12 ${props.open ? "gap-2 sm:gap-3 md:gap-4" : "justify-center"} w-full`}>
        <div className="flex items-center justify-center flex-shrink-0">
          {props.icon}
        </div>
        {props.text && props.open && (
          <div className="flex items-center">
            {props.text}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function Text({ title }: { title: string }) {
  return (
    <div className="flex">
      <span className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl font-medium">{title}</span>
    </div>
  );
}

export interface mvp {
  icon: ReactElement;
  title?: ReactElement;
  onClick?: () => void;
}

export function Mvp(props: mvp) {
  return (
    <motion.div
      className="flex items-center"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center cursor-pointer gap-3 sm:gap-3 md:gap-4" onClick={props.onClick}>
        {props.icon}
        {props.title}
      </div>
    </motion.div>
  );
}

export function IconComponent({ src, alt, open }: { src: string; alt?: string; open: boolean }) {
  return (
    <div className="flex items-center justify-center">
      <img
        src={src}
        alt={alt || "Icon"}
        className={`${open ? "w-7 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" : "w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-9 lg:h-9"}`}
      />
    </div>
  );
}

export function TextComponent({ title }: { title: string }) {
  return (
    <div className="flex">
      <span className="text-black  text-base sm:text-lg md:text-xl lg:text-2xl font-medium">{title}</span>
    </div>
  );
}