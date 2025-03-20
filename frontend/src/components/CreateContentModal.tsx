import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./InputBox";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { motion } from "framer-motion";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Reddit = "reddit",
  Link = "link",
}

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
  onContentAdded?: () => void;
}

export function CreateContentModal({ open, onClose, onContentAdded }: CreateContentModalProps) {
  const titleRef = useRef<HTMLInputElement>(null!);
  const linkRef = useRef<HTMLInputElement>(null!);
  const descriptionRef = useRef<HTMLInputElement>(null!);
  const [type, setType] = useState(ContentType.Youtube);
  const [error, setError] = useState<string | null>(null);

  // Simple link validation based on content type
  const validateLink = (link: string, type: ContentType): boolean => {
    const patterns: { [key in ContentType]: RegExp } = {
      [ContentType.Youtube]: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
      [ContentType.Twitter]: /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/.+$/,
      [ContentType.Reddit]: /^(https?:\/\/)?(www\.)?reddit\.com\/.+$/,
      [ContentType.Link]: /^(https?:\/\/).+\..+$/, // Basic URL check
    };
    return patterns[type].test(link);
  };

  async function addContent() {
    const title = titleRef.current?.value.trim();
    const link = linkRef.current?.value.trim();
    const description = descriptionRef.current?.value.trim();

    // Reset error
    setError(null);

    // Validation checks
    if (!title) {
      setError("Title is required.");
      return;
    }
    if (title.length > 30) {
      setError(`Title must be 30 characters or less. Current length: ${title.length}`);.
      return;
    }
    if (!link) {
      setError("Link is required.");
      return;
    }
    if (!validateLink(link, type)) {
      setError(`Invalid ${type} link. Please provide a valid ${type} URL.`);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      console.log("[DEBUG] Sending POST to:", `${BACKEND_URL}/api/v1/content`);
      console.log("[DEBUG] Request headers:", { Authorization: `Bearer ${token}` });
      console.log("[DEBUG] Request body:", { link, title, type, description });

      const response = await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        { link, title, type, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("[DEBUG] Content added:", response.data);

      // Clear inputs
      titleRef.current.value = "";
      linkRef.current.value = "";
      descriptionRef.current.value = "";
      setError(null);

      if (onContentAdded) onContentAdded();
      onClose();
    } catch (error: any) {
      console.error("[ERROR] Error adding content:", error.response?.data || error.message);
      setError(`Failed to add content: ${error.response?.data?.message || error.message}`);
      // Close modal after a delay to show error
      setTimeout(onClose, 2000);
    }
  }

  if (!open) return null;

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
        <div className="bg-white p-6 rounded-lg shadow-xl relative z-10 w-full max-w-md mx-4">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 transition-all duration-200 cursor-pointer"
          >
            <CrossIcon className="w-5 h-5 text-gray-600" />
          </button>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800">Add New Content</h2>
          </div>
          {error && <div className="mt-2 text-red-500 text-sm text-center">{error}</div>}
          <div className="flex flex-col gap-4 mt-6">
            <Input
              reference={titleRef}
              placeholder="Title (max 30 chars)"
              className="w-full border-gray-300 focus:border-[#7950f2] focus:ring-[#7950f2] transition-all duration-200"
            />
            <Input
              reference={linkRef}
              placeholder="Link"
              className="w-full border-gray-300 focus:border-[#7950f2] focus:ring-[#7950f2] transition-all duration-200"
            />
            <Input
              reference={descriptionRef}
              placeholder="Description (optional)"
              className="w-full border-gray-300 focus:border-[#7950f2] focus:ring-[#7950f2] transition-all duration-200"
            />
          </div>
          <div className="mt-6">
            <div className="text-sm font-medium text-gray-600 mb-2">Content Type</div>
            <div className="flex flex-wrap gap-2 justify-center">
              {Object.values(ContentType).map((content) => (
                <Button
                  key={content}
                  text={content.charAt(0).toUpperCase() + content.slice(1)}
                  variant={type === content ? "primary" : "secondary"}
                  onClick={() => setType(content)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                    type === content
                      ? "bg-[#7950f2] hover:bg-[#6a42c1]"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <Button
              onClick={addContent}
              variant="primary"
              text="Submit"
              className="px-6 py-2.5 text-white font-semibold rounded-lg bg-[#7950f2] hover:bg-[#6a42c1] shadow-md hover:shadow-lg transition-all duration-200"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}