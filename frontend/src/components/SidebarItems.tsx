import { ReactElement } from "react";

export function SidebarItem({text , icon}: {
    text: string;
    icon: ReactElement;
}) {
    return <div className="flex text-gray-700 py-2 cursor-pointer hover:bg-gray-200 rounded pl-4 max-w-48 transition-all duration-150">
        <div className="pr-2">
            {icon}
        </div>
        <div className="p-2">
            {text}
        </div>
    </div>
}