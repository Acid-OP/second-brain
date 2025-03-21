import { motion } from "framer-motion";
import { useState } from "react";
import ai from "../iconImages/ai.png";

interface QueryInputProps {
  open: boolean;
  onSubmit: (query: string) => void;
}

export function IconComponent({ src, alt, open, className }: { src: string; alt?: string; open: boolean; className?: string }) {
  return (
    <div className="flex items-center justify-center">
      <img
        src={src}
        alt={alt || "AI Icon"}
        className={className || `${open ? "w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-9 lg:h-9" : "w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-5 lg:h-5"} object-contain`}
      />
    </div>
  );
}

export function QueryInput({ open, onSubmit }: QueryInputProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query);
      setQuery("");
    }
  };

  const CustomSubmitButton = () => (
    <button
      type="submit"
      className={`w-full text-xs sm:text-sm md:text-sm lg:text-sm py-1 sm:py-1 md:py-1.5 lg:py-1.5 rounded-md sm:rounded-md md:rounded-lg lg:rounded-lg bg-[#7950f2] hover:bg-[#6a42c1] text-white transition-all duration-200 font-medium shadow-sm hover:shadow-md cursor-pointer ${
        !open ? "p-0 opacity-0" : ""
      }`}
    >
      {open ? "Submit" : ""}
    </button>
  );

  return (
    <motion.div
      className={`flex flex-col mt-1 sm:mt-1 md:mt-2 lg:mt-2 items-center w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[240px] px-2 sm:px-3 md:px-3 lg:px-4 transition-all duration-300 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: open ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-1 sm:gap-1 md:gap-2 lg:gap-2"
      >
        <div className="flex items-center gap-1 sm:gap-1 md:gap-2 lg:gap-2 bg-gray-50 rounded-md sm:rounded-md md:rounded-lg lg:rounded-lg py-0.5 sm:py-0.5 md:py-1 lg:py-1 px-1 sm:px-1 md:px-1.5 lg:px-2 border border-gray-200 hover:border-[#7950f2] transition-all duration-200 shadow-xs hover:shadow-sm">
          <IconComponent src={ai} open={open} className={`${open ? "w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-9 lg:h-9" : "w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-5 lg:h-5"} object-contain`} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find your card"
            className="w-full bg-transparent text-xs sm:text-sm md:text-sm lg:text-base text-gray-700 placeholder-gray-400 focus:outline-none transition-all duration-200"
          />
        </div>
        <CustomSubmitButton />
      </form>
    </motion.div>
  );
}