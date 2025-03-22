import { motion } from "framer-motion";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { IconComponent, Mvp, SidebarItem, Text, TextComponent } from "./SidebarItems";
import brain from "../iconImages/brain.png";
import { RedditIcon } from "../icons/RedditIcon";
import { LogoutButton } from "./LogoutButton";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Menu, X } from "lucide-react";
import { ALLicon } from "../icons/Allicon";
import { Linkicon } from "../icons/Linkicon";
import { LogoutIcon } from "../icons/LogoutIcon";
import { LogoutText } from "./LogoutButton";
import { QueryInput } from "./QuerySection";
import axios from "axios";

// Helper function for responsive sidebar width
const getSidebarWidth = (open: boolean) => {
  const width = window.innerWidth;
  if (width < 640) {
    return open ? "120px" : "40px";
  } else if (width >= 640 && width < 768) {
    return open ? "150px" : "40px";
  } else if (width >= 768 && width < 1024) {
    return open ? "220px" : "80px";
  } else {
    return open ? "250px" : "80px";
  }
};

export function Sidebar({
  setFilter,
  open,
  setOpen,
  setHighlightedCardId,
}: {
  setFilter: (filter: "all" | "youtube" | "twitter" | "reddit" | "link") => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  setHighlightedCardId: (id: string | null) => void;
}) {
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  function logout() {
    localStorage.removeItem("token");
    navigate("/home");
  }

  const handleQuerySubmit = async (query: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/query`,
        { query },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const card = response.data.card;
      setHighlightedCardId(card.id);
    } catch (error) {
      console.error("Error querying backend:", error);
      setHighlightedCardId(null);
    }
  };

  return (
    <motion.div
      className="h-screen flex flex-col bg-white items-center justify-center fixed left-0 top-0 shadow-lg z-10"
      animate={{ width: getSidebarWidth(open) }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex flex-col items-center pt-2 sm:pt-3 md:pt-3 lg:pt-4 space-y-2 sm:space-y-3 md:space-y-3 lg:space-y-4 w-full">
        <Button
          onClick={() => setOpen(!open)}
          variant="sidebar"
          startIcon={
            open ? (
              <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-5 lg:h-5" />
            ) : (
              <Menu className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5 lg:w-5 lg:h-5" />
            )
          }
          className={`bg-white text-gray-700 py-1.5 sm:py-2 md:py-2 lg:py-2.5 px-2 sm:px-2 md:px-3 lg:px-3 rounded-sm sm:rounded-md md:rounded-md lg:rounded-md hover:bg-gray-100 hover:text-[#7950f2] transition-all duration-200 ${open ? "self-start" : "self-center"}`}
        />
        <div className={`flex w-full ${open ? "justify-start pl-1 sm:pl-1 md:pl-2 lg:pl-2" : "justify-center"}`}>
          <Mvp
            icon={<IconComponent src={brain} open={open} />}
            title={open ? <TextComponent title="Second Brain" /> : undefined}
            onClick={() => navigate("/home")}
          />
        </div>
        <div className={`flex flex-col items-center w-full ${open ? "pl-2 sm:pl-3 md:pl-3 lg:pl-4" : "pl-0"}`}>
          <SidebarItem
            text={open ? <Text title="All" /> : undefined}
            icon={<ALLicon open={open} className={`${open ? "w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" : "w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-9 lg:h-9"}`} />}
            onClick={() => setFilter("all")}
            open={open}
          />
          <SidebarItem
            text={open ? <Text title="Twitter" /> : undefined}
            icon={<TwitterIcon open={open} className={`${open ? "w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" : "w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-9 lg:h-9"}`} />}
            onClick={() => setFilter("twitter")}
            open={open}
          />
          <SidebarItem
            text={open ? <Text title="Youtube" /> : undefined}
            icon={<YoutubeIcon open={open} className={`${open ? "w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" : "w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-9 lg:h-9"}`} />}
            onClick={() => setFilter("youtube")}
            open={open}
          />
          <SidebarItem
            text={open ? <Text title="Reddit" /> : undefined}
            icon={<RedditIcon open={open} className={`${open ? "w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" : "w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-9 lg:h-9"}`} />}
            onClick={() => setFilter("reddit")}
            open={open}
          />
          <SidebarItem
            text={open ? <Text title="Link" /> : undefined}
            icon={<Linkicon open={open} className={`${open ? "w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" : "w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-9 lg:h-9"}`} />}
            onClick={() => setFilter("link")}
            open={open}
          />
        </div>
        <QueryInput open={open} onSubmit={handleQuerySubmit} />
      </div>
      <div className="flex flex-col items-center pb-4 sm:pb-6 md:pb-6 lg:pb-8 mt-auto w-full">
        <LogoutButton
          onClick={logout}
          variant="primary"
          text={open ? <LogoutText title="Logout" /> : ""}
          startIcon={<LogoutIcon open={open} />}
          className={`leading-tight text-lg sm:text-xl md:text-xl lg:text-2xl transition-all duration-200 flex justify-center ${open ? "px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-2.5 lg:px-6 lg:py-3 rounded-md sm:rounded-md md:rounded-lg lg:rounded-lg bg-[#7164c0]" : "bg-white px-0 py-1 sm:py-1.5 md:py-2 lg:py-2.5 rounded-md sm:rounded-md md:rounded-lg lg:rounded-lg hover:bg-gray-300 text-transparent flex justify-center"}`}
        />
      </div>
    </motion.div>
  );
}