import "./App.css"
import React, {useState, useEffect} from "react";
import uuid from "react-uuid"

import ComponentMapper from "./Components/ComponentMapper";
import EditorMenu from "./Components/EditorMenu";
import JumpDown from "./Components/JumpDown";


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
        // ParentPath: [2], //2 because its 3rd in array position
        Content: [
            {
                id: "4",
                ComponentType: "TextField",
                Content: "i am inside accordion",
                // ParentPath: [2, 0] //parents path and its own position
            },
            {
                id: "5",
                ComponentType: "TextField",
                Content: "Me too!!!",
            },        
            {
                id: "6",
                ComponentType: "Accordion",
                Title: "accordion title goes here",
                // ParentPath: [2, 2],
                Content: [
                    {
                        id: "7",
                        ComponentType: "TextField",
                        Content: "Me too!!!",
                        // ParentPath: [2, 2, 0]
                       
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

if(localStorage.getItem("data") == undefined){
    localStorage.setItem("data", JSON.stringify(data))
}
export const SaveContext = React.createContext()
export const EnterContext = React.createContext()
export const EditorContext = React.createContext()
export const SelectedIdContext = React.createContext()
export const UpdateSelectedContext = React.createContext()


function App() {

    const devUpdateSave = () => {
        window.localStorage.setItem("data", JSON.stringify(data))
        window.location.reload()
    }


    



    //only used to re-render when nescesarry. essentially setRenderData(saveData) just to rerender.
    const [renderData, setRenderData] = useState(JSON.parse(window.localStorage.getItem("data")))

    //for handling menubar.
    const [menuArray, setMenuArray] = useState([])
    const [selectedId, setSelectedId] = useState([2])


  

    const handleEnter = (props) => {
        
        //generate a new textfield object. todo insert leftover text into content.
        const newComponent = {
            Content: props.value,
            ComponentType: "TextField",
            id: uuid(),
        }

        const copiedData = JSON.parse(localStorage.getItem("data"))
        
        //does get updated/changed, as explained in next comment
        const updatedData = JSON.parse(JSON.stringify( newTextFieldRecursion(copiedData, newComponent, props.id)))

        // console.log(copiedData)
        // console.log(updatedData)

        //works perfectly. when i refresh page its the correct data. 
        window.localStorage.setItem("data", JSON.stringify(updatedData))


        let testData = [
            {   
                id: "1",
                ComponentType: "TextField",
                Content: "LINE ONE"           
            },
            {   
                id: "2",
                ComponentType: "TextField",
                Content: "LINE TWO"           
            },    
        ]

        //setting this to testData sets the correct amount of lines (2) like previous code, 
        //but the text doesn't get updated properly. 
        setRenderData(testData)

    }

    const newTextFieldRecursion = (array, newComponent, id) => {
        //id being the id of the textfield i pressed enter inside of.
        
        array.forEach((component, index) => {
            
            //if found matching ID
            if(component.id === id){
                
                // console.log(array)
                //handle inject newComponent
                array.splice(index+1, 0, newComponent)
                // console.log(array)

            }

            //if i encounter an accordion, e.g. an array: loop through it.
            if(component.ComponentType === "Accordion"){
                newTextFieldRecursion(component.Content, newComponent, id)
            }

        })

        return array
    }

    const generateEditorMenus = (editor, id) => {
        setMenuArray(menuArray => [...menuArray, {editor, id} ])
    }

    const handleSelect = (id) => {
        console.log(id)
        setSelectedId(selectedId => [id])
    }

    const handleJumpDown = () => {

    }


                    

  return (
    <>

        <div className="flex">
            {


                selectedId.map((selectedId) => {

                    return(
                        <div>
                            {
                                menuArray.map(({editor, id}) => {

                                    if(selectedId != id) return null

                                    return(
                                        <>
                                            <EditorMenu editor={editor.editor} id={id} activeId={selectedId}/>                                       
                                        </>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }

            <JumpDown selectedId={selectedId}/>
        </div>


        <div className="textArea">
            <SelectedIdContext.Provider value={handleSelect}>
                <EditorContext.Provider value={generateEditorMenus}>
                    {/* <SaveContext.Provider value={handleUpdateTextField}> */}
                        <EnterContext.Provider value={handleEnter}>
                            <ComponentMapper data={renderData}/>
                        </EnterContext.Provider>
                    {/* </SaveContext.Provider> */}
                </EditorContext.Provider>
            </SelectedIdContext.Provider>
        </div>

        <div className="rounded bg-purple-300 px-4 py-2" onClick={() => {
            devUpdateSave()
        }}> 
            reset data
        </div>

        <div>
 
            
        </div>
        {/* <Tiptaptemp sex={"asd"}/> */}
    </>

  );
}

export default App;

