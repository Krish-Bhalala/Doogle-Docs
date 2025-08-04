// Custom extension for managing font size

import { Extension } from "@tiptap/react";
import "@tiptap/extension-text-style";

// extend the tiptap core to add new commands
declare module "@tiptap/core" {
    // add the interface for defining the new commands with generic return types
    interface Commands<ReturnType> {
        // adding function definitions related to font size
        fontSize: {
            setFontSize: (size: string) => ReturnType
            unsetFontSize: () => ReturnType 
        }
    }
}

// export the custom extension
// addOptions() : lets tiptap know the basic config of the extension (i.e. it deals with textStyle types objects) when initializing it,
// addGlobalAttributes() : lets tiptap know how to define the default attributes
// addCommands() : define the functionality of above defined functions in the interface
export const FontSizeExtension = Extension.create({
    name: "fontSize",
    addOptions() {
        return {
            types: ['textStyle']
        }
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,  // ['textStyle']
                attributes: {
                    fontSize: {
                        default: null,           // Set explicitly as an object with default
                        parseHTML: element => element.style.fontSize || null,
                        renderHTML: attributes => {
                            if (!attributes || !attributes.fontSize) {
                            return {};
                            }
                            return { style: `font-size: ${attributes.fontSize}` };
                        }
                    }
                }
            }
        ];
    },
    addCommands() {
        return {
            setFontSize: (fontSize: string) => ({chain}) => {
                return chain().setMark("textStyle", {fontSize}).run()
            },
            unsetFontSize: () => ({chain}) => {
                return chain().setMark("textStyle", {fontSize: null}).removeEmptyTextStyle().run()
            }
        }
    }
})