import { useEffect, useRef, useContext, useState} from "react"
import React from 'react'
import { SaveContext, EnterContext, EditorContext, SelectedIdContext } from "../App"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from '@tiptap/starter-kit'


export default function TextField(props) {

    console.log(props.content)
    
    const HandleEnter = useContext(EnterContext)
    const HandleEditor = useContext(EditorContext)
    const HandleSelect   = useContext(SelectedIdContext)

    const [canUpdate, setCanUpdate] = useState(false)

    const editor = useEditor({
        
        onCreate: (editor) => {

            
            console.log("created!")
            //used to generate array of editor references for rendering menus.
            HandleEditor(editor, props.id);
            
        },
        onFocus: ({editor}) => {
            //tells menu renderer to show the editor i'm currently using.
            HandleSelect(props.id)
            setCanUpdate(true)

            editor.setOptions({
                editorProps:{
                    attributes:{
                        canUpdate: true
                    }
                }
            })
            
            // console.log(editor)
        },
        onUpdate: ({editor}) => {
            handleUpdate({id: props.id, value: editor.getJSON()})

            // console.log(editor)

         

        }, 
        onTransaction({editor, transaction}) {

            

            if(editor.options.editorProps.attributes.canUpdate == false){
                
                // editor.commands.setContent(props.content)

                // editor.setOptions({
                //     editorProps:{
                //         attributes:{
                //             canUpdate: true
                //         }
                //     }
                // })

                return
            }

           

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
        editorProps: {
            attributes: {
                canUpdate: false
            }
        },
        content: props.content,
        
    })

    const editorRef = useRef(editor)


    useEffect(() => {
        console.log("props content changed!")

        if(editorRef.current == null){
            console.log(editorRef.current)
            return
        }      
        
        editorRef.current.commands.setContent(props.content)

    }, [props.content])
    

    const handleUpdate = ({id, value}) => {

        const saveData = JSON.parse(localStorage.getItem("data"))

        //modify savedata array
        recursion(saveData, id, value) 

        //save new edited array to localstorage.
        window.localStorage.setItem("data", JSON.stringify(saveData))
    }
    
    //a function where you pass in an array and loop through each component checking if the ID matches.
    //in the same function, if you encounter a accordion, call itself and put that acc's array into it. 
    //If no accord can be found, break out of function and continue to loop through arrays.
    const recursion = (array, id, value) => {
        
        array.forEach(component => {
            

            //if found matching ID
            if(component.id === id){
                
                //update changes
                component.Content = value

            }

            //if i encounter an accordion, e.g. an array: loop through it.
            if(component.ComponentType === "Accordion"){
                recursion(component.Content, id , value)
            }
        });
    }

    
    return (
        <>
            <EditorContent editor={editor} />   
        </>
    )
}


