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
  const [open, setOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, refresh } = useContent();
  const [filter, setFilter] = useState<"all" | "youtube" | "twitter" | "reddit" | "link">("all");

  useEffect(() => {
    refresh();
  }, [modalOpen]);

  const filteredContents = contents.filter(({ type }) =>
    filter === "all" ? true : type === filter
  );

  return (
    <div className="bg-gray-100 flex min-h-screen overflow-hidden">
      <Sidebar setFilter={setFilter} open={open} setOpen={setOpen} />
      <div
        className={`p-4 flex-1 min-h-screen bg-gray-100 overflow-auto transition-all duration-300 ease-in-out ${
          open ? "ml-[250px] lg:ml-[250px] md:ml-[200px] sm:ml-0" : "ml-20 lg:ml-20 md:ml-16 sm:ml-0"
        }`}
      >
        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />
        {/* Adjusted for responsiveness */}
        <div className="flex justify-end gap-4 flex-wrap sm:flex-col sm:items-center md:flex-row md:gap-6">
          <Button
            onClick={() => setModalOpen(true)}
            variant="primary"
            text="Add Content"
            startIcon={<PlusIcon />}
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
            text="Share Brain"
            startIcon={<ShareIcon />}
          />
        </div>

        <div className="flex w-full">
          <div className="flex pt-4 pl-4 gap-6 flex-wrap w-full">
            {filteredContents.map((content) => (
              <Card
                key={content._id}
                _id={content._id}
                title={content.title}
                link={content.link}
                type={content.type}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}