import { motion } from "framer-motion";
import { DeleteIcon } from "../icons/DeleteIcon";
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
      {/* Overlay */}
      <motion.div
        className="w-screen h-screen bg-gray-800 fixed top-0 left-0 opacity-75"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.75 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className="bg-white p-6 rounded-lg shadow-xl relative z-10 w-full max-w-md mx-4">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 transition-all duration-200 cursor-pointer"
          >
            <DeleteIcon className="w-5 h-5 text-gray-600" />
          </button>

          {/* Header */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800">Confirm Deletion</h2>
          </div>

          {/* Body */}
          <div className="mt-4 text-center">
            <p className="text-gray-600">Are you sure you want to delete this item?</p>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <Button
              onClick={onClose}
              variant="secondary"
              text="Cancel"
              className="px-6 py-2.5 font-semibold rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 transition-all duration-200"
            />
            <Button
              onClick={onConfirm}
              variant="primary"
              text="Delete"
              className="px-6 py-2.5 text-white font-semibold rounded-lg bg-red-600 hover:bg-red-700 shadow-md hover:shadow-lg transition-all duration-200"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}