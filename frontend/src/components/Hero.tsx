import brain2 from "../iconImages/brain2.png";
import { HeroButton } from "./HeroButton";
import social from "../iconImages/social.png";
import reddit from "../iconImages/reddit.png";
import x from "../iconImages/x.png";
import youtube from "../iconImages/youtube.png";
import card from "../iconImages/card.png";
import socialIcon from "../iconImages/socialIcon.png";
import { motion } from "framer-motion";

// Update NavbarIconComponent to accept className as a prop
export function NavbarIconComponent({ src, alt, className }: { src: string; alt?: string; className?: string }) {
    return (
        <div className={className}>
            <img src={src} alt={alt || "Icon"} width="100" />
        </div>
    );
}

// Update the other components similarly if needed
export function NavbarIcon2Component({ src, alt, className }: { src: string; alt?: string; className?: string }) {
    return (
        <div className={className}>
            <img src={src} alt={alt || "Icon"} width="330" />
        </div>
    );
}

export function NavbarIcon3Component({ src, alt, className }: { src: string; alt?: string; className?: string }) {
    return (
        <div className={className}>
            <img src={src} alt={alt || "Icon"} width="300" />
        </div>
    );
}

export function Hero() {
    return (
        <div className="flex flex-col justify-center items-center pt-12 md:pt-16 lg:pt-24">
            <NavbarIconComponent src={brain2} />
            <div className="text-7xl pt-4">
                Save, organize, and share
            </div>
            <div className="text-7xl text-gray-500 pt-4">
                all in one place
            </div>
            <div className="pt-12">
                <HeroButton />
            </div>

            {/* Motion Images Container */}
            <div className="relative w-full h-[350px]">
                {/* Static Images (Unrotated) */}
                <NavbarIcon2Component 
                    src={card} 
                    className="absolute bottom-[80%] left-[15%] translate-x-[-15%] translate-y-[-35%]" 
                />
                <MotionImage
                    src={socialIcon} 
                    className="bottom-[90%] right-[15%] translate-x-[10%] translate-y-[-10%] lg:w-32 lg:h-32 md:w-36 md:h-36" 
                />
                {/* Rotated Motion Images with Hover Effects */}
                <MotionImage 
                    src={youtube} 
                    className="top-[40%] right-[25%] translate-x-[20%] translate-y-[-20%] lg:w-32 lg:h-32 md:w-36 md:h-36" 
                    rotate={0} 
                />
<MotionImage 
    src={x} 
    className="bottom-[20%] left-[37%] translate-x-[-10%] translate-y-[5%] w-4 h-4 md:w-20 md:h-20 lg:w-26 lg:h-24" 
    rotate={5} 
/>

            </div>
        </div>
    );
}

interface MotionImageProps {
    src: string;
    className?: string;
    rotate?: number;
}

const MotionImage: React.FC<MotionImageProps> = ({ src, className = "", rotate }) => (
    <motion.img
        src={src}
        alt=""
        className={`absolute md:w-24 md:h-24 lg:w-22 lg:h-20 ${className}`}
        initial={{ opacity: 0, scale: 0.8, rotate }}
        animate={{ opacity: 1, scale: 1, rotate }}
        whileHover={{ scale: 1.1 }}  // Increase scale slightly on hover
        transition={{ duration: 0.8, ease: "easeOut" }}
    />
);

const StaticImage: React.FC<MotionImageProps> = ({ src, className = "" }) => (
    <motion.img
        src={src}
        alt=""
        className={`absolute w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-35 ${className}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
    />
);
