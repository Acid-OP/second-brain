import brain from "../iconImages/brain.png";
import { NavbarIconComponent, NavbarTextComponent } from "./NavbarComponent";
import { TopBar, TopBarComp, TopBarSignin } from "./Topbar";
import { motion } from "framer-motion";

export function Navbar() {
    return (
        <motion.div
            className="pt-4" // Increased top padding for better spacing
            initial={{ opacity: 0, y: -20 }} // Fade-in and slide-down animation
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="w-[98vw] max-w-9xl mx-auto bg-white border-[1px] border-gray-100 rounded-4xl py-3 shadow-sm">
                <div className="flex items-center justify-between w-full px-6 md:px-8 lg:px-12">
                    {/* Left: Logo + Title */}
                    <div className="flex items-center flex-1">
                        <TopBar
                            icon={<NavbarIconComponent src={brain} />}
                            title={<NavbarTextComponent title="Second Brain" />}
                        />
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
        </motion.div>
    );
}