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