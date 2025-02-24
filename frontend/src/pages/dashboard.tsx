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
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, refresh } = useContent();
  const [filter, setFilter] = useState<"Second Brain" | "youtube" | "twitter" | "reddit">("Second Brain");

  useEffect(() => {
    refresh();
  }, [modalOpen]);

  const filteredContents = contents.filter(({ type }) =>
    filter === "Second Brain" ? type : type === filter
  );

  return (
    <div className="bg-gray-100 flex min-h-screen overflow-hidden">
      <Sidebar setFilter={setFilter} />
      <div className="bg-black w-110 h-full flex-shrink-0"></div>
      <div className="p-4 flex-1 min-h-screen bg-gray-100 overflow-auto">
        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />
        <div className="flex justify-end gap-4">
          {/* Add Content Button */}
          <Button
            onClick={() => setModalOpen(true)}
            variant="primary"
            text="Add content"
            startIcon={<PlusIcon/>}
            className="px-5 py-2.5  text-white rounded-lg shadow-md hover:bg-[#6a42c1] hover:shadow-lg transition-all duration-200 ease-in-out flex items-center gap-2 text-sm font-semibold"
          />
          {/* Share Brain Button */}
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
            startIcon={<ShareIcon/>}
            className="px-5 py-2.5 text-gray-700 border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 hover:text-[#7950f2] hover:shadow-lg transition-all duration-200 ease-in-out flex items-center gap-2 text-sm font-semibold"
          />
        </div>
        <div className="flex pt-4 pl-4 gap-4 flex-wrap">
          {filteredContents.map(({ type, link, title }) => (
            <Card key={link} type={type} link={link} title={title} />
          ))}
        </div>
      </div>
    </div>
  );
}