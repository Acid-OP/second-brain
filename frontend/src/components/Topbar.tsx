import { ReactElement } from "react";

export interface Topbar{
    icon : ReactElement;
    title : ReactElement;
    onClick? : () => void;
}
export function NavbarTextComponent({ title }: { title: string }) {
    return (
            <span className=" text-black font-medium text-3xl tracking-tighter">
                {title}
            </span>
    );
}

export function NavbarIconComponent({src , alt}:{src:string ; alt?:string}){
    return(
        <div>
            <div>
            <img src={src} alt={alt || "Icon"} width="50" /> 
            </div>
        </div>
    )
}

export function TopBar(props:Topbar){

    return(
        <div className="flex items-center">
            <div className="flex justify-center items-center" onClick={props.onClick}>
            {props.icon}
            {props.title}
            </div>
        </div>
    )
}

export function TopBarComp() {
    return (
        <div className="flex justify-center gap-16 w-full max-w-md">
            <div className="from-neutral-800 font-normal text-lg ">Features</div>
            <div className="from-neutral-800 font-normal text-lg ">Solutions</div>
            <div className="from-neutral-800 font-normal text-lg ">Resources</div>
            <div className="from-neutral-800 font-normal text-lg ">Prices</div>
        </div>
    );
}


export function TopBarSignin() {
    return (
        <div className="flex justify-between w-max">
            <button className="bg-[#7950f2] text-white py-2 px-6 rounded-full hover:bg-[#6a42c1] focus:outline-none focus:ring-2 focus:ring-[#6a42c1] cursor-pointer transition duration-300">
                Signin
            </button>
        </div>
    );
}
