import brain2 from "../iconImages/brain2.png";
import { HeroButton } from "./HeroButton";

export function Hero(){
    return(
        <div className="flex flex-col justify-center items-center pt-12 md:pt-16 lg:pt-24">
        <NavbarIconComponent src={brain2} />
        <div className="text-8xl pt-4">
            Think, plan, and track
        </div>
        <div className="text-7xl text-gray-500 pt-4">
            all in one place
        </div>
        <div className="pt-12">
            <HeroButton/>
        </div>
        </div>
    )
}

export function NavbarIconComponent({src , alt}:{src:string ; alt?:string}){
    return(
        <div>
            <div>
            <img src={src} alt={alt || "Icon"} width="100"  /> 
            </div>
        </div>
    )
}