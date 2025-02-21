import { ReactElement } from "react";

export function SidebarItem({text , icon , onClick}: {
    text: string;
    icon: ReactElement;
    onClick? : () => void;
}) {
    return <div className="flex text-gray-700 py-2 cursor-pointer hover:bg-gray-200 rounded pl-4 max-w-48 transition-all duration-150"
            onClick={onClick}
            >
        <div className="flex justify-center items-center h-15">
          <div className="pr-2 h-full">
              {icon}
          </div>
          <div className="p-2 h-full">
              {text}
          </div>
        </div>
    </div>
}

export interface mvp{
    icon : ReactElement;
    title : ReactElement;
    onClick? : () => void;
}

export function Mvp(props:mvp){

    return(
        <div className="flex mt-8 items-center">
            <div className="flex justify-center pl-4 items-center" onClick={props.onClick}>
            {props.icon}
            {props.title}
            </div>
        </div>
    )
}

export function IconComponent({src , alt}:{src:string ; alt?:string}){
    return(
        <div>
            <div>
            <img src={src} alt={alt || "Icon"} width="45" height="45"/> 
            </div>
        </div>
    )
}


export function TextComponent({ title }: { title: string }) {
    return (
        <div className="flex mb-4">
            <span className="text-black text-2xl pl-2 font-medium pt-3">{title}</span>
        </div>
    );
}