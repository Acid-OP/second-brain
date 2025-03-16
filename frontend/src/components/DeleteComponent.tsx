import { useState } from "react";
import { useContent } from "../hooks/usecontent";
import { DeleteIcon } from "../icons/DeleteIcon";
import { DeleteConfirmationModal } from "./DeleteConfirmationModel"; // Import the modal

interface DeleteCompProps {
  _id: string;
}

export function DeleteComp({ _id }: DeleteCompProps) {
  const { deleteContent } = useContent();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleDelete = () => {
    console.log("Attempting to delete ID:", _id); // Debug
    deleteContent(_id); // Call the delete function
    setIsModalOpen(false); // Close the modal after deletion
  };

  return (
    <div>
      {/* Delete Button */}
      <button
        onClick={() => setIsModalOpen(true)} // Open the modal on click
        className="focus:outline-none flex justify-center cursor-pointer"
      >
        <DeleteIcon className="w-5" />
      </button>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close the modal
        onConfirm={handleDelete} // Handle deletion
      />
    </div>
  );
}