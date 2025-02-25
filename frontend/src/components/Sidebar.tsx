import { useState } from "react";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { IconComponent, Mvp, SidebarItem, Text, TextComponent } from "./SidebarItems";
import brain from "../iconImages/brain.png";
import { RedditIcon } from "../icons/RedditIcon";
import { motion } from "framer-motion";
import { LogoutButton } from "./LogoutButton";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Menu, X } from "lucide-react";

export function Sidebar({ setFilter }: { setFilter: (filter: "Second Brain" | "youtube" | "twitter" | "reddit") => void }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  function logout() {
    localStorage.removeItem("token");
    navigate("/home");
  }

  return (
    <motion.div
      className="h-screen flex flex-col bg-white fixed left-0 top-0 shadow-lg overflow-hidden"
      animate={{ width: open ? "250px" : "80px" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Toggle Button and Second Brain in Same Div */}
      <div className={`flex flex-col pt-4 space-y-4 ${open ? "": "pl-2"}`}>
      <Button
          onClick={() => setOpen(!open)}
          variant="sidebar"
          startIcon={open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          className=" bg-white text-gray-700 rounded-lg hover:bg-gray-100 hover:text-[#7950f2] transition-all duration-200 ease-in-out "
        />
      </div>
      <div className="flex flex-col pt-4 pl-4 space-y-4">

        <div className="flex justify-start">
          <Mvp
            icon={<IconComponent src={brain} open={open} />}
            title={open ? <TextComponent title="Second Brain" /> : undefined}
            onClick={() => setFilter("Second Brain")}
          />
        </div>

        {/* Sidebar Items */}
        <SidebarItem
          text={open ? <Text title="Twitter" /> : undefined}
          icon={<TwitterIcon open={open} />}
          onClick={() => setFilter("twitter")}
        />
        <SidebarItem
          text={open ? <Text title="Youtube" /> : undefined}
          icon={<YoutubeIcon open={open} />}
          onClick={() => setFilter("youtube")}
        />
        <SidebarItem
          text={open ? <Text title="Reddit" /> : undefined}
          icon={<RedditIcon open={open} />}
          onClick={() => setFilter("reddit")}
        />
      </div>

      {/* Logout Button */}
      <div className="flex flex-col items-center pb-8 mt-auto">
        <LogoutButton
          onClick={logout}
          variant="primary"
          text={open ? "Logout" : ""}
          className={`leading-tight text-xl py-3 transition-all duration-200 ${open ? "w-56" : "w-12 text-transparent"}`}
        />
      </div>
    </motion.div>
  );
}