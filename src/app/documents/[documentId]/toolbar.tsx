'use client'

import { LucideIcon, UndoIcon } from "lucide-react";
import {cn} from "@/lib/utils";

interface ToolBarButtonProps {
    onClick: () => void;
    isActive?: boolean;
    icon: LucideIcon;
};

const ToolBarButton = ({ onClick, isActive, icon: Icon }: ToolBarButtonProps) => {
    // cn() function will help in overcoming priority conflicts with tailwind when using dynamic classes (i.e. conditionals)
    return (
        <button
            onClick={onClick}
            className={cn(
                "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
                isActive && "bg-neutral-200/80",
            )}
        >
            <Icon className="size-4" />
        </button>
    );
}

const Toolbar = () => {
    const sections: {
        label: string;
        icon: LucideIcon;
        onClick: () => void;
        isActive?: boolean;
    }[][] = [
                [
                    {
                        label: "Undo",
                        icon: UndoIcon,
                        onClick: () => console.log("Undo clicked"),
                        isActive: false,
                    },
                ],
            ];

    return (
        <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
            {sections[0].map((item) => <ToolBarButton key={item.label} {...item}/>)}
        </div>
    );
}
 
export default Toolbar;
