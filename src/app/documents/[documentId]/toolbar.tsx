'use client'

import { LucideIcon, Redo2Icon, UndoIcon, PrinterIcon, BoldIcon, SpellCheckIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import {cn} from "@/lib/utils";

// Zustand store for editor state
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator"

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
    // access the editor from the Zustand store
    const { editor } = useEditorStore();
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
                        // when clicked on the button, if editor exist, then chain the commands: first focus on editor, then undo the last change and run the commands in chain
                        onClick: () => editor?.chain().focus().undo().run(),
                        isActive: false,
                    },
                    {
                        label: "Redo",
                        icon: Redo2Icon,
                        onClick: () => editor?.chain().focus().redo().run(),
                        isActive: false,
                    },
                    {
                        label: "Print",
                        icon: PrinterIcon,
                        onClick: () => window.print(),
                        isActive: false,
                    },
                    {
                        label: "SpellCheck",
                        icon: SpellCheckIcon,
                        onClick: () => {
                            // Use default browser spell check for its behavior
                            const editorDom = editor?.view.dom;
                            const spellCheckEnabled = editorDom?.getAttribute("spellcheck");
                            editorDom?.setAttribute("spellcheck", spellCheckEnabled === "false" ? "true" : "false")
                        }
                    }
                ],
                [
                    {
                        label: "Bold",
                        icon: BoldIcon,
                        onClick: () => editor?.chain().focus().toggleBold().run(),
                        isActive: editor?.isActive("bold"),
                    },
                    {
                        label: "Italic",
                        icon: ItalicIcon,
                        onClick: () => editor?.chain().focus().toggleItalic().run(),
                        isActive: editor?.isActive("italic"),
                    },
                    {
                        label: "Underline",
                        icon: UnderlineIcon,
                        onClick: () => editor?.chain().focus().toggleUnderline().run(),
                        isActive: editor?.isActive("underline"),
                    },
                ]
            ];

    return (
        <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
            {sections[0].map((item) => {
                return <ToolBarButton key={item.label} {...item}/>;
            })}
            <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
            {/* {FONT FAMILY} */}
            <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
            {/* {HEADING} */}
            <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
            {/* {FONT SIZE} */}
            <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
            {sections[1].map((item) => {
                return <ToolBarButton key={item.label} {...item}/>;
            })}
        </div>
    );
}
 
export default Toolbar;
