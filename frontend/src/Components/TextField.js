import { useEffect, useRef, useContext} from "react"
import React from 'react'
import { SaveContext, EnterContext } from "../App"


export default function TextField(props) {

    const HandleSave = useContext(SaveContext)
    const HandleEnter = useContext(EnterContext)
   

    const inputRef = useRef(null)   
    useEffect(() => {
        inputRef.current.value = props.content
    }, [])
    

    return (
        <input ref={inputRef} 
        onChange={(e) =>    {HandleSave({id: props.id, value: e.target.value})  }}
        onKeyDown={(e) =>   {
            if(e.key === "Enter"){
                // console.log("i clicked enter on id:" + props.id)

                console.log(e.target.selectionStart)
                //todo





                HandleEnter({id: props.id})
            }
        }}
        />
    )
}

