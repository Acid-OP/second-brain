import { useEffect, useState, useRef } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { CrossIcon } from "../icons/CrossIcon";
import { Sidebar } from "../components/Sidebar";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useContent } from "../hooks/usecontent";
import { motion } from "framer-motion";
import { Toast } from "../components/Toastcomponent";

export function Dashboard() {
  const [open, setOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, refresh } = useContent();
  const [filter, setFilter] = useState<"all" | "youtube" | "twitter" | "reddit" | "link">("all");
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [highlightedCardId, setHighlightedCardId] = useState<string | null>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const scrollContainerRef = useRef<HTMLDivElement>(null); // Step 2: Ref for scrollable container

  useEffect(() => {
    refresh();
    checkShareStatus();
  }, [modalOpen]);

  useEffect(() => {
    if (highlightedCardId) {
      const cardElement = cardRefs.current.get(highlightedCardId);
      console.log("[DEBUG] Highlighted card ID:", highlightedCardId);
      console.log("[DEBUG] Card element found:", cardElement);
      if (cardElement && scrollContainerRef.current) {
        console.log("[DEBUG] Scrolling to card:", cardElement);
        cardElement.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        console.log("[DEBUG] Scroll failed - Card element:", cardElement, "Scroll container:", scrollContainerRef.current);
      }
    }
  }, [highlightedCardId]);

  const filteredContents = contents.filter(({ type }) => filter === "all" ? true : type === filter);

  const checkShareStatus = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, { share: true }, { headers: { Authorization: localStorage.getItem("token") } });
      setShareLink(response.data.link);
    } catch (e) {
      setShareLink(null);
    }
  };

  const handleShare = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, { share: true }, { headers: { Authorization: localStorage.getItem("token") } });
      const link = response.data.link;
      setShareLink(link);
      setShareModalOpen(true);
      setIsCopied(false);
    } catch (e) {
      console.error("Error sharing:", e);
      setToastMessage("Failed to generate share link");
    }
  };

  const handleMakePrivate = async () => {
    try {
      await axios.post(`${BACKEND_URL}/api/v1/brain/share`, { share: false }, { headers: { Authorization: localStorage.getItem("token") } });
      setShareLink(null);
      setShareModalOpen(false);
      setToastMessage("Your content is now private");
    } catch (e) {
      console.error("Error making private:", e);
      setToastMessage("Failed to make content private");
    }
  };

  const handleSetHighlightedCardId = (id: string | null) => {
    setHighlightedCardId(id);
    if (id) {
      setTimeout(() => setHighlightedCardId(null), 5000);
    }
  };

  return (
    <div className="bg-gray-100 flex min-h-screen overflow-hidden">
      <Sidebar setFilter={setFilter} open={open} setOpen={setOpen} setHighlightedCardId={handleSetHighlightedCardId} />
      <div
        ref={scrollContainerRef} // Step 2: Add ref to scrollable div
        className={`p-4 flex-1 min-h-screen bg-gray-100 overflow-auto transition-all duration-300 ease-in-out ${open ? "ml-[250px] lg:ml-[250px] md:ml-[200px] sm:ml-0" : "ml-20 lg:ml-20 md:ml-16 sm:ml-0"}`}
      >
        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />
        {shareModalOpen && (
          <div className="fixed inset-0 z-50">
            <motion.div className="w-screen h-screen bg-gray-800 fixed top-0 left-0 opacity-75" initial={{ opacity: 0 }} animate={{ opacity: 0.75 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={() => setShareModalOpen(false)} />
            <motion.div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
              <div className="bg-white p-6 rounded-lg shadow-xl relative z-10 w-full max-w-md mx-4">
                <button onClick={() => setShareModalOpen(false)} className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 transition-all duration-200 cursor-pointer"><CrossIcon /></button>
                <div className="text-center"><h2 className="text-xl font-semibold text-gray-800">Share Your Brain</h2></div>
                <div className="flex flex-col gap-4 mt-6">
                  <p className="text-gray-600 text-sm">Your share link:</p>
                  <input type="text" value={shareLink || ""} readOnly className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#7950f2] transition-all duration-200" />
                </div>
                <div className="flex justify-center gap-4 mt-6">
                  <Button onClick={() => { navigator.clipboard.writeText(shareLink || ""); setToastMessage("Copied to clipboard!"); setIsCopied(true); }} variant="primary" text={isCopied ? "Copied" : "Copy"} className="px-6 py-2.5 text-white font-semibold rounded-lg bg-[#7950f2] hover:bg-[#6a42c1] shadow-md hover:shadow-lg transition-all duration-200" />
                </div>
              </div>
            </motion.div>
          </div>
        )}
        <div className="flex justify-end gap-4 flex-wrap sm:flex-col sm:items-center md:flex-row md:gap-6">
          <Button onClick={() => setModalOpen(true)} variant="primary" text="Add Content" startIcon={<PlusIcon />} />
          <Button onClick={shareLink ? handleMakePrivate : handleShare} variant="secondary" text={shareLink ? "Make Private" : "Share Brain"} startIcon={<ShareIcon />} />
        </div>
        <div className="flex w-full">
          <div className="flex pt-4 pl-10 gap-6 flex-wrap w-full">
            {filteredContents.map((content) => (
              <Card
                key={content._id}
                _id={content._id}
                title={content.title}
                link={content.link}
                type={content.type}
                description={content.description}
                isHighlighted={content._id === highlightedCardId}
                ref={(el) => el && cardRefs.current.set(content._id, el)}
              />
            ))}
          </div>
        </div>
        {toastMessage && <Toast message={toastMessage} duration={3000} onClose={() => setToastMessage(null)} />}
      </div>
    </div>
  );
}