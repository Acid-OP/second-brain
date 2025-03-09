import { useContent } from "../hooks/usecontent";
import { DeleteIcon } from "../icons/DeleteIcon";

interface DeleteCompProps {
    _id: string; // Changed to '_id'
}

export function DeleteComp({ _id }: DeleteCompProps) {
    const { deleteContent } = useContent();

    function popup() {
        console.log("Attempting to delete ID:", _id); // Debug
        if (window.confirm("Are you sure you want to delete this content?")) {
            deleteContent(_id); // Use '_id'
        }
    }

    return (
        <div>
            <button onClick={popup} className="focus:outline-none">
                <DeleteIcon className="w-5" />
            </button>
        </div>
    );
}