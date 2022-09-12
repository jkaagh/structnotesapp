import React, {useState} from 'react'

export default function EditorMenu({ editor, refresh}) {

    const [isBold, setIsBold] = useState(false)
    const [isItalic, setIsItalic] = useState(false)
    
    if (!editor) {
        return null
    }

    editor.on("transaction", ({editor, transation}) => {
        if(editor.isActive('bold')){
            setIsBold(true)
        }
        else{
            setIsBold(false)
        }



        if(editor.isActive('italic')){
            setIsItalic(true)
        }
        else{
            setIsItalic(false)
        }
    })



   

    return (
        <>
            <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`${isBold ? 'EditorSelected' : ''} font-bold richButton`}
            >
            B
            </button>

            <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`${isItalic ? 'EditorSelected' : ''} richButton`}
            >
            <i>I</i>
            </button>


        </>
    )
}
