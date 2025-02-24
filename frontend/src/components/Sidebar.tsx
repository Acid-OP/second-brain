import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { IconComponent, Mvp, SidebarItem, Text, TextComponent } from "./SidebarItems";
import brain from "../iconImages/brain.png";
import { RedditIcon } from "../icons/RedditIcon";
import { motion } from "framer-motion"; // Import motion for animations
import { LogoutButton } from "./LogoutButton";
import { useNavigate } from "react-router-dom";

export function Sidebar({ setFilter }: { setFilter: (filter: "Second Brain" | "youtube" | "twitter" | "reddit") => void }) {
    const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    // alert("You have been logged out!");
    navigate("/home");
  }
    return (
        <motion.div
            className="h-screen flex flex-col bg-white w-72 fixed left-0 top-0 pl-6 shadow-lg"
            initial={{ x: -100, opacity: 0 }} // Slide-in animation
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Logo and Title */}
            <Mvp icon={<IconComponent src={brain} />} title={<TextComponent title="Second Brain" />} onClick={() => setFilter("Second Brain")} />

            {/* Sidebar Items */}
            <div className="flex flex-col flex-grow justify-between">
                <div className="flex flex-col pt-4 pl-4 space-y-2">
                    <SidebarItem text={<Text title="Twitter" />} icon={<TwitterIcon />} onClick={() => setFilter("twitter")} />
                    <SidebarItem text={<Text title="Youtube" />} icon={<YoutubeIcon />} onClick={() => setFilter("youtube")} />
                    <SidebarItem text={<Text title="Reddit" />} icon={<RedditIcon />} onClick={() => setFilter("reddit")} />
                </div>

                {/* Add Content Button */}
                <div className="flex flex-col justify-center items-center pb-8">
                <LogoutButton onClick={logout} variant="primary" text="Logout" className="leading-tight text-xl py-3" />
                </div>
            </div>
        </motion.div>
    );
}