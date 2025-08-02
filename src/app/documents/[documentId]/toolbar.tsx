'use client'

import { LucideIcon, Redo2Icon, UndoIcon, PrinterIcon, BoldIcon, SpellCheckIcon, ItalicIcon, UnderlineIcon, MessageSquarePlusIcon, ListTodoIcon, RemoveFormattingIcon, ChevronDownIcon, HighlighterIcon, LinkIcon, ImageIcon, UploadIcon, SearchIcon, AlignCenterIcon, AlignLeftIcon, AlignRightIcon, AlignJustifyIcon, ListOrderedIcon, ListIcon} from "lucide-react";
import {cn} from "@/lib/utils";

// State manager
import { useState } from "react"

// Zustand store for editor state
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator"

// Dropdown imports
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

// Dialogue box imports
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle
} from "@/components/ui/dialog";

// Types
import { type Level } from "@tiptap/extension-heading";
import { type ColorResult, BlockPicker } from "react-color"

// TextBox
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


/*
 * TEXT ALIGN BUTTON
 */
const TextAlignButton = () => {
  const { editor } = useEditorStore();
  const alignments = [ 
    {
        label: 'Align Center',
        value:'center',
        icon: AlignCenterIcon
    },
    {
        label: 'Align Left',
        value:'left',
        icon: AlignLeftIcon
    },
    {
        label: 'Align Right',
        value:'right',
        icon: AlignRightIcon
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
          <button className ="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
              <AlignLeftIcon className="size-4"/>
          </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1 bg-[#F1F4F9] rounded-sm">
        {alignments.map(({ label, value, icon: Icon}) => {
            return (
                <button
                    key={value}
                    onClick={() => editor?.chain().focus().setTextAlign(value).run()}
                    className={cn(
                        "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                        editor?.isActive({ textAlign: value }) && 'bg-neutral-200/80'
                    )}
                >
                    <Icon className="size-4"/>
                    <span className="text-sm">{label}</span>
                </button>
            )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


/*
 * TEXT ALIGN BUTTON
 */
const ListButton = () => {
  const { editor } = useEditorStore();
  const lists = [ 
    {
        label: 'Bullet List',
        icon: ListIcon,
        isActive: () => editor?.isActive('bulletList'),
        onClick: () => editor?.chain().focus().toggleBulletList().run()
    },
    {
        label: 'Ordered List',
        icon: ListOrderedIcon,
        isActive: () => editor?.isActive('orderedList'),
        onClick: () => editor?.chain().focus().toggleOrderedList().run()
    }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
          <button className ="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
              <ListIcon className="size-4"/>
          </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1 bg-[#F1F4F9] rounded-sm">
        {lists.map(({ label, icon: Icon, onClick, isActive}) => {
            return (
                <button
                    key={label}
                    onClick={onClick}
                    className={cn(
                        "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                        isActive() && 'bg-neutral-200/80'
                    )}
                >
                    <Icon className="size-4"/>
                    <span className="text-sm">{label}</span>
                </button>
            )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


/*
 * HEADING BUTTON
 */
const HeadingLevelButton = () => {
  const { editor } = useEditorStore();
  const headings = [
    { label: "Normal", value: 0, fontSize: "16px" },
    { label: "Heading 1", value: 1, fontSize: "32px" },
    { label: "Heading 2", value: 2, fontSize: "28px" },
    { label: "Heading 3", value: 3, fontSize: "24px" },
    { label: "Heading 4", value: 4, fontSize: "20px" },
    { label: "Heading 5", value: 5, fontSize: "16px" }
  ]

  const getCurrentHeading = () => {
    for(let level=0; level<=headings.length; level++){
      if(editor?.isActive("Heading " , {level})) {
        return `Heading ${level}`
      }
      return "Normal";
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
          <button className ="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
              <span className="truncate">
                {getCurrentHeading()}
              </span>
              <ChevronDownIcon className="ml-2 size-4 shrink-0"/>
          </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1 bg-[#F1F4F9] rounded-sm">
          {
              headings.map(
                  ({ label, value, fontSize }) => 
                      (
                          <button 
                              key={label}
                              style={{fontSize}}
                              onClick={()=>{
                                if(value === 0){
                                    editor?.chain().focus().setParagraph().run();
                                }else{
                                    editor?.chain().focus().toggleHeading({ level: value as Level}).run();
                                }
                              }}
                              className={cn(
                                  "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                                  // if no heading is selected then highlight normal text or if a heading is selected. then highlight it
                                  (value === 0 && !editor?.isActive("heading")) || editor?.isActive("Heading ", {level: value}) && "bg-neutral-200/80)"
                                )}
                          >
                          {label}
                          </button>
                      )
              )
          }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


/*
 * ADD IMAGE BUTTON
 */
const ImageButton = () => {
    const { editor } = useEditorStore();
    const [ isDialogOpen, setIsDialogOpen ] = useState(false);
    const [ imageUrl, setImageUrl ] = useState("");

    const onChange = (url: string) => {
        // update the source url of image
        editor?.chain().focus().setImage({ src: url }).run();
    };

    const onUpload = () => {
        //create a new input feild for uploading image
        const input = document.createElement("input");
        input.type = "file";
        //accept all image related extensions
        input.accept = "image/*";
        input.onchange = (e) => {
            //accept the first selected file from user
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file){
                //file loading successful, create a url for it
                const imageUrl = URL.createObjectURL(file);
                //update the url
                onChange(imageUrl);
            }
        }
        //trigger the file selection dialog
        input.click();
    };

    const handleImageUrlSubmit = () => {
        if(imageUrl){
            onChange(imageUrl); //update url
            //reset state variables
            setImageUrl("");
            setIsDialogOpen(false);
        }
    }

    return(
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className ="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                        <ImageIcon className="size-4" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={onUpload}>
                        <UploadIcon className="size-4 mr-2"/>
                        Upload
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                        <SearchIcon className="size-4 mr-2"/>
                        Paste Image URL
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle> Insert Image URL </DialogTitle>
                    </DialogHeader>
                    <Input
                        placeholder="Insert Image URL here"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        onKeyDown={(e) => {
                            if(e.key === "Enter"){
                                handleImageUrlSubmit();
                            }
                        }}
                    />
                    <DialogFooter>
                        <Button onClick={handleImageUrlSubmit}> Insert </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}


/*
 * LINK BUTTON
 */
const LinkButton = () => {
    const { editor } = useEditorStore();
    const [ value, setValue ] = useState(editor?.getAttributes("link").href || "");

    const onChange = (link: string) => {
        // mark the selected text as link
        editor?.chain().focus().extendMarkRange("link").setLink({ href: link }).run();
        setValue("");   // reset the state variable
    }

    return(
        <DropdownMenu onOpenChange={(open) => {
            if (open){
                setValue(editor?.getAttributes("link").href || "");
            }
        }}>
            <DropdownMenuTrigger asChild>
                <button className ="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                    <LinkIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5 flex items-center gap-2">
                <Input placeholder="https://www.example.com" value={value} onChange={(e) => setValue(e.target.value)}/>
                <Button onClick={() => onChange(value)}> Apply </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}


/*
 * HIGHLIGHTER
 */
const TextHighlighterButton = () => {
    const { editor } = useEditorStore();

    // Use current color or default to black
    const value = editor?.getAttributes('highlight').color || "#FFFFFF";

    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setHighlight({color: color.hex}).run();
    } 

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className ="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                    <HighlighterIcon className="size-4" />
                    <div className="h-0.5 w-full" style={{ backgroundColor: value}}></div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0">
                <BlockPicker color={value} onChange={onChange}/>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}


/*
 * COLOR SELECTOR
 */
const TextColorButton = () => {
    const { editor } = useEditorStore();

    // Use current color or default to black
    const value = editor?.getAttributes('textStyle').color || "#000000";

    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setColor(color.hex).run();
    } 

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className ="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                    <span className="text-xs">A</span>
                    <div className="h-0.5 w-full" style={{ backgroundColor: value }}/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0">
                <BlockPicker color={value} onChange={onChange}/>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}


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
            <HeadingLevelButton/>
            <Separator orientation="vertical" className="h-6 bg-neutral-300"/>

            <Separator orientation="vertical" className="h-6 bg-neutral-300"/> 
            {   /* {Text Marker Section} */
                sections[1].map(
                    (item) => <ToolBarButton key={item.label} {...item}/>
                )
            }
            <TextColorButton />
            <TextHighlighterButton />
            <Separator orientation="vertical" className="h-6 bg-neutral-300"/>
            <LinkButton />
            <TextAlignButton />
            <ListButton />
            <ImageButton />
            {   /* {Collaboration Utility Section} */
                sections[2].map(
                    (item) => <ToolBarButton key={item.label} {...item}/>
                )
            }
            <Separator orientation="vertical" className="h-6 bg-neutral-300"/> 
            
        </div>
    );
}
 
export default Toolbar;
