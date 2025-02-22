import { ReactElement } from "react";

export interface Topbar{
    icon : ReactElement;
    title : ReactElement;
    onClick? : () => void;
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
            <div className="from-neutral-800 font-normal text-lg hover:bg-[#f1f1f1] py-2 px-4 rounded-full cursor-pointer transition duration-300">
                Features
            </div>
            <div className="from-neutral-800 font-normal text-lg hover:bg-[#f1f1f1] py-2 px-4 rounded-full cursor-pointer transition duration-300">
                Solutions
            </div>
            <div className="from-neutral-800 font-normal text-lg hover:bg-[#f1f1f1] py-2 px-4 rounded-full cursor-pointer transition duration-300">
                Resources
            </div>
            <div className="from-neutral-800 font-normal text-lg hover:bg-[#f1f1f1] py-2 px-4 rounded-full cursor-pointer transition duration-300">
                Prices
            </div>
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
