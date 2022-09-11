import React, {useState} from 'react'
import ComponentMapper from './ComponentMapper'

export default function Accordion(props) {

    const [closed, setClosed] = useState(false) //todo eventually fetch starting position from savefile
    const [heightClass, setHeightClass] = useState("")

    const handleToggle = () => {

        if(closed === false){
            setHeightClass("h-0")
        }
        else{
            setHeightClass("")
        }


        setClosed(!closed)
    }

  return (
    <>


        <div >

        
            {/* title and button */}
            <div className='flex justify-between '>
                <div className='font-semibold'>
                    {props.title}

                </div>
                <div 
                
                className={`px-2 ${closed ? "rotate-180" : ""}`}
                onClick={() => {
                    handleToggle()
                }}>

                    V
                </div>
            </div>


            {/* stuff inside the thingy */}
            <div className={`rounded border-l px-2 overflow-hidden ${closed ? "h-0" : ""} `} >
                <ComponentMapper data={props.content}/>
            </div>

        </div>
            
            
            
     
    </>
  )
}
