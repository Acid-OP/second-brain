import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItems";

export function Sidebar({ setFilter }: { setFilter: (filter: "all" | "youtube" | "twitter") => void }) {
    return (
        <div className="h-screen bg-white w-72 fixed left-0 top-0 pl-6">
            <div className="flex text-2xl pt-8 items-center">
                <div className="pr-2 text-purple-600">
                    <Logo />
                </div>
                Brainly
            </div>
            <div className="pt-8 pl-4">
                <SidebarItem text="All" icon={<Logo />} onClick={() => setFilter("all")} />
                <SidebarItem text="Twitter" icon={<TwitterIcon />} onClick={() => setFilter("twitter")} />
                <SidebarItem text="Youtube" icon={<YoutubeIcon />} onClick={() => setFilter("youtube")} />
            </div>
        </div>
    );
}
