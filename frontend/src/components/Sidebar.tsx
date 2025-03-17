import { motion } from "framer-motion";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { IconComponent, Mvp, SidebarItem, Text, TextComponent } from "./SidebarItems";
import brain from "../iconImages/brain.png";
import { RedditIcon } from "../icons/RedditIcon";
import { LogoutButton } from "./LogoutButton"; // Contains LogoutButton and LogoutText
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Menu, X } from "lucide-react";
import { ALLicon } from "../icons/Allicon";
import { Linkicon } from "../icons/Linkicon";
import { LogoutIcon } from "../icons/LogoutIcon"; // Adjust if in a different file
import { LogoutText } from "./LogoutButton";
import { QueryInput } from "./QuerySection"; // Import the new component
import axios from "axios";
import { BACKEND_URL } from "../config";
export function Sidebar({
  setFilter,
  open,
  setOpen,
}: {
  setFilter: (filter: "all" | "youtube" | "twitter" | "reddit" | "link") => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/home");
  }

  const handleQuerySubmit = async (query: string) => {
    console.log("Query submitted:", query);
    try {
      const token = localStorage.getItem("token");
      console.log("[DEBUG] Token used for query:", token); // Add this
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/query`,
        { query },
        { headers: { Authorization: token } } // Raw token, no "Bearer"
      );
      const card = response.data.card;
      console.log("Queried card from backend:", card);
      
    } catch (error) {
      console.error("Error querying backend:", error);
      
    }
  };

  return (
    <motion.div
      className="h-screen flex flex-col bg-white items-center justify-center fixed left-0 top-0 shadow-lg z-10"
      animate={{ width: open ? "250px" : "80px" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex flex-col items-center pt-4 space-y-4 w-full">
        <Button
          onClick={() => setOpen(!open)}
          variant="sidebar"
          startIcon={open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          className={`bg-white text-gray-700 rounded-lg hover:bg-gray-100 hover:text-[#7950f2] transition-all duration-200 ${
            open ? "self-start" : "self-center"
          }`}
        />
        <div className={`flex w-full ${open ? "justify-start pl-2" : "justify-center"}`}>
          <Mvp
            icon={<IconComponent src={brain} open={open} />}
            title={open ? <TextComponent title="Second Brain" /> : undefined}
            onClick={() => navigate("/home")}
          />
        </div>
        <div className={`flex flex-col items-center w-full ${open ? "pl-4" : "pl-0"}`}>
          <SidebarItem
            text={open ? <Text title="All" /> : undefined}
            icon={<ALLicon open={open} />}
            onClick={() => setFilter("all")}
            open={open}
          />
          <SidebarItem
            text={open ? <Text title="Twitter" /> : undefined}
            icon={<TwitterIcon open={open} className={`${open ? "w-12 h-12" : "w-9 h-9"}`} />}
            onClick={() => setFilter("twitter")}
            open={open}
          />
          <SidebarItem
            text={open ? <Text title="Youtube" /> : undefined}
            icon={<YoutubeIcon open={open} className={`${open ? "w-12 h-12" : "w-9 h-9"}`} />}
            onClick={() => setFilter("youtube")}
            open={open}
          />
          <SidebarItem
            text={open ? <Text title="Reddit" /> : undefined}
            icon={<RedditIcon open={open} className={`${open ? "w-12 h-12" : "w-9 h-9"}`} />}
            onClick={() => setFilter("reddit")}
            open={open}
          />
          <SidebarItem
            text={open ? <Text title="Link" /> : undefined}
            icon={<Linkicon open={open} className={`${open ? "w-12 h-12" : "w-9 h-9"}`} />}
            onClick={() => setFilter("link")}
            open={open}
          />
        </div>

        {/* Use the QueryInput component */}
        <QueryInput open={open} onSubmit={handleQuerySubmit} />
      </div>

      <div className="flex flex-col items-center pb-8 mt-auto w-full">
        <LogoutButton
          onClick={logout}
          variant="primary"
          text={open ? <LogoutText title="Logout" /> : ""} // Pass title prop
          startIcon={<LogoutIcon open={open} />}
          className={`leading-tight text-2xl transition-all duration-200 flex justify-center ${
            open
              ? "px-6 py-3 rounded-lg bg-[#7164c0]"
              : "bg-white px-0 py-3 rounded-lg hover:bg-gray-300 text-transparent flex justify-center"
          }`}
        />
      </div>
    </motion.div>
  );
}