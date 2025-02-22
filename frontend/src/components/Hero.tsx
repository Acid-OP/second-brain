import brain2 from "../iconImages/brain2.png";
import { HeroButton } from "./HeroButton";
import social from "../iconImages/social.png";
import reddit from "../iconImages/reddit.png";
import x from "../iconImages/x.png";
import youtube from "../iconImages/youtube.png";



export function Hero(){
    return(
        <div className="flex flex-col justify-center items-center pt-12 md:pt-16 lg:pt-24">
        <NavbarIconComponent src={brain2} />
        <div className="text-7xl pt-4">
        Save, organize, and share
        </div>
        <div className="text-7xl text-gray-500 pt-4">
            all in one place
        </div>
        <div className="pt-12">
            <HeroButton/>
        </div>
        <div className="relative pt-4 right-40"><NavbarIcon2Component src={social} /></div>
        <div className="relative left-90"><NavbarIcon2Component src={reddit} /></div>
        <div className="absolute right-90">
        <NavbarIcon3Component src={x} />
        </div>
        <div className="absolute left-90">
        <NavbarIcon3Component src={youtube} />
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
export function NavbarIcon2Component({src , alt}:{src:string ; alt?:string}){
    return(
        <div>
            <div>
            <img src={src} alt={alt || "Icon"} width="150"  /> 
            </div>
        </div>
    )
}
export function NavbarIcon3Component({src , alt}:{src:string ; alt?:string}){
    return(
        <div>
            <div>
            <img src={src} alt={alt || "Icon"} width="100"  /> 
            </div>
        </div>
    )
}
                {/*
                
                <NavbarIconComponent src={x} />
                <NavbarIconComponent src={youtube} /> */}