// used for managing the editor state in a React application using Zustand
import {create} from 'zustand';

//imports the type name of the editor for typscript
import {type Editor} from '@tiptap/react';

// defines the shape of the Zustand store state
interface EditorState {
    editor: Editor | null;
    setEditor: (editor: Editor | null) => void;
}

//will create a Zustand store of type EditorState (as defined above)
//takes a function that receives a set function to update the state and returns an object with the initial state and a function to update the editor
export const useEditorStore = create<EditorState>((set) => ({
    editor: null,
    setEditor: (editor: Editor | null) => set({ editor }),
}))


// This store can be used in any component to access or update info about the editor
// Used specifically for the undo button to remember the editor instance