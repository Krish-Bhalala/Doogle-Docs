'use client'

import { LucideIcon, Redo2Icon, UndoIcon, PrinterIcon, BoldIcon, SpellCheckIcon, ItalicIcon, UnderlineIcon, MessageSquarePlusIcon, ListTodoIcon, RemoveFormattingIcon, ChevronDown, ChevronDownIcon } from "lucide-react";
import {cn} from "@/lib/utils";

// Zustand store for editor state
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator"

// Font Family support import
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem
} from "@radix-ui/react-dropdown-menu";

/*
 * FONT FAMILY BUTTON
 */
const FontFamilyButton = () => {
    const { editor } = useEditorStore();
    const fonts = [
        { label: "Arial", value: "Arial" },
        { label: "Helvetica", value: "Helvetica" },
        { label: "Times New Roman", value: "Times New Roman" },
        { label: "Courier New", value: "Courier New" },
        { label: "Verdana", value: "Verdana" },
        { label: "Georgia", value: "Georgia" },
        { label: "Palatino", value: "Palatino" },
        { label: "Garamond", value: "Garamond" },
        { label: "Comic Sans MS", value: "Comic Sans MS" },
        { label: "Trebuchet MS", value: "Trebuchet MS" },
        { label: "Arial Black", value: "Arial Black" },
        { label: "Impact", value: "Impact" }
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className ="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                    <span className="truncate">
                        {editor?.getAttributes("textStyle").fontFamily || "Arial"}
                    </span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1 bg-[#F1F4F9] rounded-sm">
                {
                    fonts.map(
                        ({ label, value }) => 
                            (
                                <button 
                                    onClick={ ()=>editor?.chain().focus().setFontFamily(value).run() }
                                    key={label}
                                    className={cn(
                                        "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                                        editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80"
                                    )}
                                    style={{ fontFamily: value }}
                                >
                                    <span className="text-sm">{label}</span>
                                </button>
                            )
                    )
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


/*
 * TOOL BAR BUTTONS
 */
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


/*
 * TOOL BAR
 */
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
                    { // Undo
                        label: "Undo",
                        icon: UndoIcon,
                        // when clicked on the button, if editor exist, then chain the commands: first focus on editor, then undo the last change and run the commands in chain
                        onClick: () => editor?.chain().focus().undo().run(),
                        isActive: false,
                    },
                    { // Redo
                        label: "Redo",
                        icon: Redo2Icon,
                        onClick: () => editor?.chain().focus().redo().run(),
                        isActive: false,
                    },
                    { // Print
                        label: "Print",
                        icon: PrinterIcon,
                        onClick: () => window.print(),
                        isActive: false,
                    },
                    { // Spell Check
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
                    { // Bold
                        label: "Bold",
                        icon: BoldIcon,
                        onClick: () => editor?.chain().focus().toggleBold().run(),
                        isActive: editor?.isActive("bold"),
                    },
                    { // Italic
                        label: "Italic",
                        icon: ItalicIcon,
                        onClick: () => editor?.chain().focus().toggleItalic().run(),
                        isActive: editor?.isActive("italic"),
                    },
                    { // Underline
                        label: "Underline",
                        icon: UnderlineIcon,
                        onClick: () => editor?.chain().focus().toggleUnderline().run(),
                        isActive: editor?.isActive("underline"),
                    },
                ],
                [
                    { // Comments
                        label: "Comments",
                        icon: MessageSquarePlusIcon,
                        onClick: () => console.log("TODO: implement the comments feature"),
                        isActive: false,
                    },
                    { //Task List
                        label: "List Todo",
                        icon: ListTodoIcon,
                        onClick: () => editor?.chain().focus().toggleTaskList().run(),
                        isActive: editor?.isActive("List Todo"),
                    },
                    { //Remove Formatting from Text Marker
                        label: "Remove Formatting",
                        icon: RemoveFormattingIcon,
                        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
                    }
                ]
            ];

    return (
        <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto z-10">
            {   /* {Text Utility} */
                sections[0].map(
                    (item) => <ToolBarButton key={item.label} {...item}/>
                ) 
            }
            <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
            <FontFamilyButton/>
            <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
            {/* {HEADING} */}
            <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
            {/* {FONT SIZE} */}
            <Separator orientation="vertical" className="h-6 bg-neutral-300"/> 
            {   /* {Text Marker Section} */
                sections[1].map(
                    (item) => <ToolBarButton key={item.label} {...item}/>
                )
            }
            <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
            {   /* {Collaboration Utility Section} */
                sections[2].map(
                    (item) => <ToolBarButton key={item.label} {...item}/>
                )
            }
        </div>
    );
}
 
export default Toolbar;
