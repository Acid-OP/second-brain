import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

export function Toast({ message, duration = 3000, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false); // Trigger exit animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleExitComplete = () => {
    if (!visible) onClose();
  };

  if (!visible) return null;

  return (
    <motion.div
      className="fixed bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-4 right-2 sm:right-3 md:right-4 lg:right-4 bg-gray-800 text-white px-2 sm:px-3 md:px-3 lg:px-4 py-1 sm:py-1 md:py-1.5 lg:py-2 rounded-md sm:rounded-md md:rounded-lg lg:rounded-lg shadow-md max-w-[80%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[50%] text-xs sm:text-sm md:text-sm lg:text-base"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      onAnimationComplete={handleExitComplete}
    >
      {message}
    </motion.div>
  );
}