import { motion } from "framer-motion";
import brain2 from "../iconImages/brain2.png";
import { HeroButton } from "./HeroButton";

// Define interface for NavbarIconcomponent props
interface NavbarIconProps {
  src: string;
  alt?: string;
  className?: string;
}

export function NavbarIconcomponent2({ src, alt, className }: NavbarIconProps) {
  return (
    <div className={className}>
      <img src={src} alt={alt || "Icon"} width="100" />
    </div>
  );
}

export function Hero() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative h-screen bg-gray-50 overflow-y-hidden">
        {/* Main Content - Centered */}
        <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <NavbarIconcomponent2 src={brain2} className="mb-4" />
          </motion.div>

          <motion.div
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 p-2 text-center leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Save, Organize, Share
          </motion.div>

          <motion.div
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-700 p-2 text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            All in One Place
          </motion.div>

          <motion.div
            className="text-lg md:text-xl lg:text-2xl font-medium text-gray-600 p-2 text-center mt-4 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Store, analyze, and access your Reddit, YouTube, and X links with intelligent embeddings.
          </motion.div>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <HeroButton />
          </motion.div>
        </div>

        {/* Enhanced Shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-[10%] left-[30%] transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg opacity-70 max-[640px]:w-8 max-[640px]:h-8 max-[640px]:top-[5%] max-[640px]:left-[10%]"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 0.7 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/2 left-[10%] w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full shadow-lg opacity-70 max-[640px]:w-6 max-[640px]:h-6 max-[640px]:left-[5%] max-[640px]:top-[60%]"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 0.7 }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
          <motion.div
            className="absolute top-[30%] right-[10%] w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg opacity-70 max-[640px]:w-8 max-[640px]:h-8 max-[640px]:right-[5%] max-[640px]:top-[20%]"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 0.7 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 0.2,
            }}
          />
          <motion.div
            className="absolute top-[15%] left-[5%] w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg shadow-lg opacity-70 max-[640px]:w-6 max-[640px]:h-6 max-[640px]:left-[2%] max-[640px]:top-[10%]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.4 }}
          />
          <motion.div
            className="absolute top-[5%] right-[25%] w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full shadow-lg opacity-70 max-[640px]:w-6 max-[640px]:h-6 max-[640px]:right-[10%] max-[640px]:top-[2%]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.6 }}
          />
          <motion.div
            className="absolute bottom-[20%] left-[20%] w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg opacity-70 max-[640px]:w-8 max-[640px]:h-8 max-[640px]:left-[5%] max-[640px]:bottom-[10%]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.8 }}
          />
          <motion.div
            className="absolute bottom-[30%] right-[15%] w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg shadow-lg opacity-70 max-[640px]:w-6 max-[640px]:h-6 max-[640px]:right-[2%] max-[640px]:bottom-[15%]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 1 }}
          />
        </div>
      </div>
    </div>
  );
}