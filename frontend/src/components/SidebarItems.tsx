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
      className={`flex items-center text-gray-700 cursor-pointer rounded-lg py-2 transition-all duration-300 w-full ${
        props.open ? "hover:bg-gray-200" : "hover:bg-gray-100"
      }`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      onClick={props.onClick}
    >
      <div className={`flex items-center h-12 ${props.open ? "gap-4" : "justify-center"} w-full`}>
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
      <span className="text-gray-600 text-xl font-medium">{title}</span>
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
      <div className="flex items-center cursor-pointer gap-4" onClick={props.onClick}>
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
        className={`${open ? "w-12 h-12" : "w-9 h-9"}`}
      />
    </div>
  );
}

export function TextComponent({ title }: { title: string }) {
  return (
    <div className="flex">
      <span className="text-black text-2xl font-medium">{title}</span>
    </div>
  );
}