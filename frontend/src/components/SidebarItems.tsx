import { ReactElement } from "react";

export interface Sidebaritem{
    text: ReactElement;
    icon: ReactElement;
    onClick? : () => void;
}

export function SidebarItem(props:Sidebaritem) {

    return <div className="flex text-gray-700 cursor-pointer hover:bg-gray-200 rounded pl-4 py-0.5 max-w-48 transition-all duration-150"
            onClick={props.onClick}
            >
        <div className="flex justify-center gap-4 items-center h-15">
          <div className=" h-full">
              {props.icon}
          </div>
          <div className=" h-full">
              {props.text}
          </div>
        </div>
    </div>
}
export function Text({ title }: { title: string }) {
    return (
        <div className="flex">
            <span className="text-gray-600 text-xl font-medium">{title}</span>
        </div>
    );
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