import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useContent } from "../hooks/usecontent";

export function Dashboard() {
  const [open, setOpen] = useState(true); // Manage open state internally
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, refresh } = useContent();
  const [filter, setFilter] = useState<"all" | "youtube" | "twitter" | "reddit" | "link">("all");

  useEffect(() => {
    refresh();
  }, [modalOpen]);

  const filteredContents = contents.filter(({ type }) =>
    filter === "all" ? type : type === filter
  );

  return (
    <div className="bg-gray-100 flex min-h-screen overflow-hidden">
      <Sidebar setFilter={setFilter} open={open} setOpen={setOpen} /> {/* Pass open and setOpen */}
      <div
        className={`p-4 flex-1 min-h-screen bg-gray-100 overflow-auto transition-all duration-300 ease-in-out ${
          open ? "ml-[250px] lg:ml-[250px] md:ml-[200px] sm:ml-0" : "ml-20 lg:ml-20 md:ml-16 sm:ml-0"
        }`}
      >
        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />
        <div className="flex justify-end gap-4">
          <Button
            onClick={() => setModalOpen(true)}
            variant="primary"
            text="Add content"
            startIcon={<PlusIcon />}
            className="px-5 py-2.5 text-white font-bold text-md rounded-lg shadow-md hover:bg-[#6a42c1] hover:shadow-lg transition-all duration-200 ease-in-out flex items-center gap-2"
          />
          <Button
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/brain/share`,
                { share: true },
                {
                  headers: { Authorization: localStorage.getItem("token") },
                }
              );
              const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
              alert(shareUrl);
            }}
            variant="secondary"
            text="Share brain"
            startIcon={<ShareIcon />}
            className="px-5 py-2.5 text-gray-700 border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 hover:text-[#7950f2] hover:shadow-lg transition-all duration-200 ease-in-out flex items-center gap-2 text-md font-bold"
          />
        </div>
        <div className="flex w-full">
          <div className="flex pt-4 pl-4 gap-6 flex-wrap w-full">
            {filteredContents.map(({ id, type, link, title }) => (
              <Card key={id} type={type} link={link} title={title} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}