'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

// For checkboxes
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'

// For tables
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'

// For images and resizing them
import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image';

// Zustand store for editor state
import { useEditorStore } from '@/store/use-editor-store'

export const Editor = () => {
    // Get the editor instance from Zustand store
    const { setEditor } = useEditorStore();

    const editor = useEditor({
        onCreate({ editor}) {
            //once the editor is created set editor to this in the Zustand store, so it can be used in other components
            //only updates the editor once when its created
            setEditor(editor);
        },
        onUpdate({ editor }) {
            // this will update the editor in the Zustand store whenever the editor is updated
            setEditor(editor);
        },
        onDestroy() {
            setEditor(null);
        },
        onBlur({ editor }) {
            // this will be used to clear the editor when it loses focus
            setEditor(editor);
        },
        onTransaction({ editor }) {
            // this will be used to clear the editor when a transaction is made
            setEditor(editor);
        },
        onSelectionUpdate({ editor }) {
            // this will be used to clear the editor when the selection is updated
            setEditor(editor);
        },
        onContentError({ editor }) {
            // this will be used to clear the editor when there is an error in the content
            setEditor(editor);
        },
        editorProps: {
            attributes: {
                // later these editors will be dynamic and the tailwind wont work
                style: "padding-left: 56px; padding-right: 56px;",
                class: "focus:outline-none border print:border-0 bg-white border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
            }
        },
        extensions: [
            StarterKit,
            TaskList,
            TaskItem.configure({
                // allow checkboxes with lists
                nested: true,
            }),
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
            Image,
            ImageResize,
        ],
        content: `<p>Hello World! 🌎️</p>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>
        <img src="https://placehold.co/800x400" />
        <img src="https://placehold.co/800x400/6A00F5/white" />
        `,
    })
    return (
        <div className="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible">
            <div className='min-w-max flex justify-center w-[816px] py-4 print:p-0 print:w-full print:min-w-0 mx-auto'>
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}