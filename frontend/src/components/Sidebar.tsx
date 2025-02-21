import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { IconComponent, Mvp, SidebarItem, Text, TextComponent } from "./SidebarItems";
import brain from "../iconImages/brain.png";
import { RedditIcon } from "../icons/RedditIcon";

export function Sidebar({ setFilter }: { setFilter: (filter: "Second Brain" | "youtube" | "twitter" | "reddit") => void }) {
    return (
        <div className="h-screen bg-white w-72 fixed left-0 top-0 pl-6">
            <Mvp icon={<IconComponent src={brain}/>} title={<TextComponent title="Second Brain"/>}  onClick={() => setFilter("Second Brain")} />
            <div className="pt-4 pl-4">
                {/* <SidebarItem text="All" icon={<Logo />} onClick={() => setFilter("all")} /> */}
                <SidebarItem text={<Text title="Twitter"/>} icon={<TwitterIcon />} onClick={() => setFilter("twitter")} />
                <SidebarItem text={<Text title="Youtube"/>}icon={<YoutubeIcon />} onClick={() => setFilter("youtube")} />
                <SidebarItem text={<Text title="Reddit"/>} icon={<RedditIcon />} onClick={() => setFilter("reddit")} />

            </div>
        </div>
    );
}
