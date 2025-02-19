import { ReactElement } from "react";

export function SidebarItem({text , icon , onClick}: {
    text: string;
    icon: ReactElement;
    onClick? : () => void;
}) {
    return <div className="flex text-gray-700 py-2 cursor-pointer hover:bg-gray-200 rounded pl-4 max-w-48 transition-all duration-150"
            onClick={onClick}
            >
        <div className="pr-2">
            {icon}
        </div>
        <div className="p-2">
            {text}
        </div>
    </div>
}

export interface mvp{
    icon : ReactElement;
    title : ReactElement
}

export function Mvp(props:mvp){

    return(
        <div className="flex mt-8">
            {props.icon}
            <span className="text-purple">{props.title}</span>
        </div>
    )
}

export function IconComponent({src , alt}:{src:string ; alt?:string}){
    return(
        <div>
            <div>
            <img src={src} alt={alt || "Icon"} width="45" height="45" /> 
            </div>
        </div>
    )
}


export function TextComponent({ title }: { title: string }) {
    return (
        <div className="flex pl">
            <span className="text-black text-2xl font-bold pt-3">{title}</span>
        </div>
    );
}