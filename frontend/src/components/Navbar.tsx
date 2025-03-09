import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import brain from "../iconImages/brain.png";
import { NavbarIconComponent, NavbarTextComponent } from "./NavbarComponent";
import { TopBar, TopBarComp, TopBarSignin } from "./Topbar";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
    scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
    refs: {
        featuresRef: React.RefObject<HTMLDivElement>;
        howItWorksRef: React.RefObject<HTMLDivElement>; // Renamed from solutionsRef
    };
}

export function Navbar({ scrollToSection, refs }: NavbarProps) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    return (
        <motion.div
            className="pt-4"
            initial={{ opacity: 0, y: -20 }}
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
                            onClick={() => navigate("/")}
                        />
                    </div>

                    {/* Center: Navigation Links (Desktop) */}
                    <div className="hidden md:flex items-center justify-center flex-1">
                        <TopBarComp scrollToSection={scrollToSection} refs={refs} />
                    </div>

                    {/* Right: Auth + Mobile Toggle */}
                    <div className="flex items-center justify-end flex-1 gap-4">
                        {token ? (""
                        ) : (
                            <TopBarSignin />
                        )}
                        <button
                            className="md:hidden"
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                        >
                            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}