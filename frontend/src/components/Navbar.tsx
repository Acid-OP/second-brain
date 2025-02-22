import brain from "../iconImages/brain.png";
import { NavbarIconComponent , NavbarTextComponent } from "./NavbarComponent";
import { TopBar,TopBarComp,TopBarSignin } from "./Topbar";

export function Navbar() {
    return (
        <div className="pt-4">
         <div className="w-[98vw] max-w-9xl mx-auto bg-[#fdfdfd] border-[1px] border-gray-300 rounded-4xl py-2 shadow-lg">
            <div className="flex items-center justify-between w-full px-4 md:px-8 lg:px-16">
                {/* Left: Logo + Title */}
                <div className="flex items-center flex-1">
                    <TopBar icon={<NavbarIconComponent src={brain} />} title={<NavbarTextComponent title="Second Brain" />} />
                </div>

                {/* Center: Navigation Links */}
                <div className="flex items-center justify-center flex-1">
                    <TopBarComp />
                </div>

                {/* Right: Sign In */}
                <div className="flex items-center justify-end flex-1">
                    <TopBarSignin />
                </div>
            </div>
        </div>
        </div>
    );
}


