import { useEffect, useRef, useContext, useState} from "react"
import React from 'react'
import { SaveContext, EnterContext, EditorContext, SelectedIdContext } from "../App"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from '@tiptap/starter-kit'


export default function TextField(props) {

    const HandleSave = useContext(SaveContext)
    const HandleEnter = useContext(EnterContext)
    const HandleEditor = useContext(EditorContext)
    const HandleSelect   = useContext(SelectedIdContext)

    const editor = useEditor({
        
        onCreate: (editor) => {
            //used to generate array of editor references for rendering menus.
            HandleEditor(editor, props.id);
        },
        onFocus: (editor) => {
            //tells menu renderer to show the editor i'm currently using.
            HandleSelect(props.id)
        },
        onUpdate: ({editor}) => {
            
        }, 
        onTransaction({editor, transaction}) {
            HandleSave({id: props.id, value: editor.getJSON()})
            console.log("t")

            //run this if on a newline at position 0
            if(transaction.curSelection.$head.parentOffset == 0 && transaction.curSelection.head != 1){
                
             
                //grabs stuff from next line
                let restOfLine = editor.getJSON().content[1]

                //delete the line
                editor.chain().selectNodeForward().deleteNode('paragraph').setTextSelection(2).run() 

                // console.log(editor.getJSON())
                // console.log(restOfLine)
         
            
                //create new TextField component
                HandleEnter({id: props.id, value: restOfLine})
            }
      
        },
        extensions: [
            StarterKit,
        ],
        content: props.content,
        
    })

    
    return (
        <>
            <EditorContent editor={editor} />   
        </>
    )
}


