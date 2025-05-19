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

export const Editor = () => {
    const editor = useEditor({
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