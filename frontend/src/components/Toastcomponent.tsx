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

  // Call onClose after the exit animation completes
  const handleExitComplete = () => {
    if (!visible) onClose();
  };

  if (!visible) return null; // Remove from DOM after animation starts

  return (
    <motion.div
      className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      onAnimationComplete={handleExitComplete} // Ensure onClose is called after exit
    >
      {message}
    </motion.div>
  );
}