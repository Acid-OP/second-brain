import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { IconComponent, Mvp, SidebarItem, TextComponent } from "./SidebarItems";
import brain from "../iconImages/brain.png";

export function Sidebar({ setFilter }: { setFilter: (filter: "all" | "youtube" | "twitter") => void }) {
    return (
        <div className="h-screen bg-white w-72 fixed left-0 top-0 pl-6">
            <Mvp icon={<IconComponent src={brain}/>} title={<TextComponent title="Second Brain"/>}/>
            <div className="pt-8 pl-4">
                <SidebarItem text="All" icon={<Logo />} onClick={() => setFilter("all")} />
                <SidebarItem text="Twitter" icon={<TwitterIcon />} onClick={() => setFilter("twitter")} />
                <SidebarItem text="Youtube" icon={<YoutubeIcon />} onClick={() => setFilter("youtube")} />
            </div>
        </div>
    );
}
