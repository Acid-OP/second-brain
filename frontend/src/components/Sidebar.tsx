// src/components/Sidebar.tsx
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
// import { LogoutIconcomponent2 } from "../icons/LogoutIcon"; // Adjust path if needed

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

  return (
    <motion.div
      className="h-screen flex flex-col bg-white items-center justify-center fixed left-0 top-0 shadow-lg z-10"
      animate={{ width: open ? "250px" : "80px" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className={`flex flex-col justify-center pt-4 space-y-4 ${open ? "" : "pl-2"}`}>
        <Button
          onClick={() => setOpen(!open)}
          variant="sidebar"
          startIcon={open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          className="bg-white text-gray-700 rounded-lg hover:bg-gray-100 hover:text-[#7950f2] transition-all duration-200 ease-in-out"
        />
        <div className="flex justify-start pl-2">
          <Mvp
            icon={<IconComponent src={brain} open={open} />}
            title={open ? <TextComponent title="Second Brain" /> : undefined}
            onClick={() => {
              navigate("/home");
            }}
          />
        </div>
        <div className={`${open ? "pl-4" : "pl-2"}`}>
          <SidebarItem
            text={open ? <Text title="All" /> : undefined}
            icon={<ALLicon open={open} />}
            onClick={() => setFilter("all")}
            open={open}
          />
          <SidebarItem
            text={open ? <Text title="Twitter" /> : undefined}
            icon={<TwitterIcon open={open}  className={`${open ? "w-12 h-12" : "w-9 h-9"}`} />}
            onClick={() => setFilter("twitter")}
            open={open}
          />
          <SidebarItem
            text={open ? <Text title="Youtube" /> : undefined}
            icon={<YoutubeIcon open={open}  className={`${open ? "w-12 h-12" : "w-9 h-9"}`}/>}
            onClick={() => setFilter("youtube")}
            open={open}
          />
          <SidebarItem
            text={open ? <Text title="Reddit" /> : undefined}
            icon={<RedditIcon open={open}  className={`${open ? "w-12 h-12" : "w-9 h-9"}`}/>}
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
      </div>
      <div className="flex flex-col items-center pb-8 mt-auto">
        <LogoutButton
          onClick={logout}
          variant="primary"
          text={open ? "Logout" : ""}
          startIcon= {<LogoutIcon open={open} />}
          className={`leading-tight text-xl transition-all  duration-200 ${
            open ? "px-8 py-4 rounded-lg" : " hover:bg-gray-300 px-3 py-3 rounded-lg text-transparent"
          }`}
        />
      </div>
    </motion.div>
  );
}