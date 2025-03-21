import { motion } from "framer-motion";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmationModal({ isOpen, onClose, onConfirm }: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <motion.div
        className="w-screen h-screen bg-gray-800 fixed top-0 left-0 opacity-75"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.75 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />
      <motion.div
        className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className="bg-white p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg shadow-xl relative z-10 w-full max-w-[20rem] sm:max-w-sm md:max-w-md lg:max-w-md mx-2 sm:mx-4 md:mx-4 lg:mx-4">
          <button
            onClick={onClose}
            className="absolute top-1 sm:top-2 md:top-2 lg:top-2 right-1 sm:right-2 md:right-2 lg:right-2 p-1 sm:p-1.5 md:p-2 lg:p-2 rounded-full hover:bg-gray-100 transition-all duration-200 cursor-pointer"
          >
            <CrossIcon className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-5 lg:h-5" />
          </button>
          <div className="text-center">
            <h2 className="text-base sm:text-lg md:text-lg lg:text-xl font-semibold text-gray-800">Confirm Deletion</h2>
          </div>
          <div className="mt-2 sm:mt-3 md:mt-4 lg:mt-4 text-center">
            <p className="text-xs sm:text-sm md:text-sm lg:text-base text-gray-600">Are you sure you want to delete this item?</p>
          </div>
          <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-4 mt-3 sm:mt-4 md:mt-5 lg:mt-6">
            <Button
              onClick={onClose}
              variant="secondary"
              text="Cancel"
              className="px-4 sm:px-5 md:px-6 lg:px-6 py-1.5 sm:py-2 md:py-2 lg:py-2.5 font-semibold rounded-md sm:rounded-md md:rounded-lg lg:rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 transition-all duration-200"
            />
            <Button
              onClick={onConfirm}
              variant="primary"
              text="Delete"
              className="px-4 sm:px-5 md:px-6 lg:px-6 py-1.5 sm:py-2 md:py-2 lg:py-2.5 text-white font-semibold rounded-md sm:rounded-md md:rounded-lg lg:rounded-lg bg-red-600 hover:bg-red-700 shadow-md hover:shadow-lg transition-all duration-200"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}