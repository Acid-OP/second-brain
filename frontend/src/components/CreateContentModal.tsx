import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./InputBox";
import { BACKEND_URL } from "../config";
import axios from "axios";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Reddit = "reddit",
  Pdf = "pdf"
}

// @ts-ignore
export function CreateContentModal({ open, onClose }) {
  const titleRef = useRef<HTMLInputElement>(null!);
  const linkRef = useRef<HTMLInputElement>(null!);
  const [type, setType] = useState(ContentType.Youtube);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    if (!title || !link) return;

    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        { link, title, type },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      onClose();
    } catch (error) {
      console.error("Error adding content:", error);
    }
  }

  if (!open) return null;

  return (
    <div>
      {/* Overlay */}
      <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60" />

      {/* Modal */}
      <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center">
        <div className="bg-white p-4 rounded shadow-lg relative">
          {/* Close Button */}
          <div className="flex justify-end">
            <button onClick={onClose} className="cursor-pointer">
              <CrossIcon />
            </button>
          </div>

          {/* Input Fields */}
          <div className="flex flex-col items-center gap-2">
            <Input reference={titleRef} placeholder="Title" />
            <Input reference={linkRef} placeholder="Link" />
          </div>

          {/* Type Selection */}
          <div className="mt-4">
            <div className="font-light">Type</div>
            <div className="flex gap-2 justify-center">
              {Object.values(ContentType).map((content) => (
                <Button
                  key={content}
                  text={content}
                  variant={type === content ? "primary" : "secondary"}
                  onClick={() => setType(content)}
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <Button onClick={addContent} variant="primary" text="Submit" />
          </div>
        </div>
      </div>
    </div>
  );
}
