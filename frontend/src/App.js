import "./App.css"
import React, {useState, useEffect} from "react";
import uuid from "react-uuid"

import ComponentMapper from "./Components/ComponentMapper";

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

let data = [
    {   
        id: "1",
        ComponentType: "TextField",
        Content: "I am one line of text."           
    },
    {   
        id: "2",
        ComponentType: "TextField",
        Content: "alskdjaksjkasjdh"           
    },
    {
        id: "3",
        ComponentType: "Accordion",
        Title: "accordion title goes here",
        Content: [
            {
                id: "4",
                ComponentType: "TextField",
                Content: "i am inside accordion"
            },
            {
                id: "5",
                ComponentType: "TextField",
                Content: "Me too!!!"
            },        
            {
                id: "6",
                ComponentType: "Accordion",
                Title: "accordion title goes here",
                Content: [
                    {
                        id: "7",
                        ComponentType: "TextField",
                        Content: "Me too!!!"
                    },     
                ]
            }    
        ]
    },
    {   
        id: "8",
        ComponentType: "TextField",
        Content: "alskdjaksjkasjdh"           
    },
    {
        id: "9",
        ComponentType: "Accordion",
        Title: "accordion title goes here",
        Content: [
            {
                id: "10",
                ComponentType: "TextField",
                Content: "i am inside accordion"
            },
            {
                id: "11",
                ComponentType: "TextField",
                Content: "Me too!!!"
            },        
            {
                id: "12",
                ComponentType: "Accordion",
                Title: "accordion title goes here",
                Content: [
                    {
                        id: "13",
                        ComponentType: "TextField",
                        Content: "Me too!!!"
                    },     
                ]
            }    
        ]
    },
    
]

export const SaveContext = React.createContext()
export const EnterContext = React.createContext()

function App() {

    const devUpdateSave = () => {
        window.localStorage.setItem("data", JSON.stringify(data))
    }


    

    //todo experiment with literally just let variables, since this entire component is never re-rendered.


    //expendable. used once to make components render, never touched again.
    //const expData   = JSON.parse(window.localStorage.getItem("data"))
    
    //copy of savefile, used to update when changes are made.
    //let saveData    = JSON.parse(window.localStorage.getItem("data"))


    //stores savefile, gets modified and saved to localstorage
    const [saveData, setSaveData] = useState(JSON.parse(window.localStorage.getItem("data")))

    //only used to re-render when nescesarry. essentially setRenderData(saveData) just to rerender.
    const [renderData, setRenderData] = useState(JSON.parse(window.localStorage.getItem("data")))

    useEffect(() => {
        console.log(renderData)
    }, [renderData])  

    const handleUpdateTextField = ({id, value}) => {
        //modify savedata array
        recursion(saveData, id, value) //i didnt think a usestate could be mutated like this and work perfecly, what the fuck?

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


    const handleEnter = ({id}) => {
        return
        let test = [...saveData]

        

        
      
        //generate a new textfield object. todo insert leftover text into content.
        let newid = uuid()
        let newComponent = {
            
            Content:  newid.toString(), 
            ComponentType: "TextField",
            id: newid,
       
        }

        //loop throuh entire save file tree to figure out where to inject it.
        let newSave = newTextFieldRecursion(saveData, newComponent, id)
        

        //save new edited array to localstorage.
        window.localStorage.setItem("data", JSON.stringify(newSave)) //this works perfectly.



        //update renderData to re-render with new dom elements.

        //literally none of these work.

        //setRenderData(saveData) 
        setRenderData(newSave) 
        // setRenderData(JSON.parse(window.localStorage.getItem("data")))
        //https://blog.logrocket.com/a-guide-to-usestate-in-react-ecb9952e406c/#howtoupdatestateinanestedobjectinreactwithhooks



    }

    const newTextFieldRecursion = (array, newComponent, id) => {
        //id being the id of the textfield i pressed enter inside of.

        array.forEach((component, index) => {
            
            //if found matching ID
            if(component.id === id){
                
                //handle inject newComponent
                array.splice(index+1, 0, newComponent)
                console.log(array)

            }

            //if i encounter an accordion, e.g. an array: loop through it.
            if(component.ComponentType === "Accordion"){
                newTextFieldRecursion(component.Content, newComponent, id)
            }

        })

        return array
    }
   

  return (
    <>


        <div className="textArea">
            <SaveContext.Provider value={handleUpdateTextField}>
                <EnterContext.Provider value={handleEnter}>
                    <ComponentMapper data={renderData}/>
                </EnterContext.Provider>
            </SaveContext.Provider>
        </div>

        <div className="rounded bg-purple-300 px-4 py-2" onClick={() => {
            devUpdateSave()
        }}> 
            asda
        </div>
    </>

  );
}

export default App;
