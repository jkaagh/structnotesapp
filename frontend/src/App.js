import './App.css';
import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';

import ComponentMapper from './Components/ComponentMapper';
import EditorMenu from './Components/EditorMenu';

let data = [
  {
    id: '1',
    ComponentType: 'TextField',
    Content: 'I am one line of text.',
  },
  {
    id: '3',
    ComponentType: 'Accordion',
    Title: 'accordion title goes here',
    Content: [
      {
        id: '4',
        ComponentType: 'TextField',
        Content: 'i am inside accordion',
      },
      {
        id: '5',
        ComponentType: 'TextField',
        Content: 'Me too!!!',
      },
      {
        id: '6',
        ComponentType: 'Accordion',
        Title: 'accordion title goes here',
        Content: [
          {
            id: '7',
            ComponentType: 'TextField',
            Content: 'Me too!!!',
          },
        ],
      },
    ],
  },
  {
    id: '8',
    ComponentType: 'TextField',
    Content: 'alskdjaksjkasjdh',
  },
  {
    id: '9',
    ComponentType: 'Accordion',
    Title: 'accordion title goes here',
    Content: [
      {
        id: '10',
        ComponentType: 'TextField',
        Content: 'i am inside accordion',
      },
      {
        id: '11',
        ComponentType: 'TextField',
        Content: 'Me too!!!',
      },
      {
        id: '12',
        ComponentType: 'Accordion',
        Title: 'accordion title goes here',
        Content: [
          {
            id: '13',
            ComponentType: 'TextField',
            Content: 'Me too!!!',
          },
        ],
      },
    ],
  },
];

if (localStorage.getItem('data') == undefined) {
  //   localStorage.setItem('data', JSON.stringify(data));
}

export const SaveContext = React.createContext();
export const EnterContext = React.createContext();
export const EditorContext = React.createContext();
export const SelectedIdContext = React.createContext();
export const UpdateSelectedContext = React.createContext();
export const DataContext = React.createContext();

function App() {
  const devUpdateSave = () => {
    window.localStorage.setItem('data', JSON.stringify(data));
    window.location.reload();
  };

  //expendable. used once to make components render, never touched again.
  //const expData   = JSON.parse(window.localStorage.getItem("data"))

  //copy of savefile, used to update when changes are made.
  //let saveData    = JSON.parse(window.localStorage.getItem("data"))

  //legacy holy shit this was dumb
  // //stores savefile, gets modified and saved to localstorage
  // const [saveData, setSaveData] = useState(JSON.parse(window.localStorage.getItem("data")))

  //only used to re-render when nescesarry. essentially setRenderData(saveData) just to rerender.
  const [renderData, setRenderData] = useState(JSON.parse(window.localStorage.getItem('data')) || data);

  const [menuArray, setMenuArray] = useState([]);

  const [selectedId, setSelectedId] = useState([2]);

  // everytime renderdata array changes set it in the localstorage
  useEffect(() => {
    // window.localStorage.setItem('data', JSON.stringify(renderData));
  }, [renderData]);



  const handleEnter = props => {
    //generate a new textfield object. todo insert leftover text into content.

    const newComponent = {
      Content: '',
      ComponentType: 'TextField',
      id: uuid(),
    };

    const updatedData = newTextFieldRecursion(renderData, newComponent, props.id);

    console.log(updatedData);
    // setRenderData(updatedData);

    // window.localStorage.setItem('data', JSON.stringify(updatedData)); //this works perfectly.

    // //loop throuh entire save file tree to figure out where to inject it.
    // let newSave = newTextFieldRecursion(saveData, newComponent, props.id)

    // //save new edited array to localstorage.
    // window.localStorage.setItem("data", JSON.stringify(newSave)) //this works perfectly.

    // //update renderData to re-render with new dom elements.

    // //literally none of these work.

    // //setRenderData(saveData)
    // setRenderData(newSave)
    // // setRenderData(JSON.parse(window.localStorage.getItem("data")))
    // //https://blog.logrocket.com/a-guide-to-usestate-in-react-ecb9952e406c/#howtoupdatestateinanestedobjectinreactwithhooks
  };

  const newTextFieldRecursion = (array, newComponent, id) => {
    //id being the id of the textfield i pressed enter inside of.

    array.forEach((component, index) => {
      //if found matching ID
      if (component.id === id) {
        //handle inject newComponent
        array.splice(index + 1, 0, newComponent);
      }

      //if i encounter an accordion, e.g. an array: loop through it.
      if (component.ComponentType === 'Accordion') {
        newTextFieldRecursion(component.Content, newComponent, id);
      }
    });

    return array;
  };

  const generateEditorMenus = (editor, id) => {
    setMenuArray(menuArray => [...menuArray, { editor, id }]);
  };

  const handleSelect = id => {
    setSelectedId([id]);
  };

  return (
    <>
      <div>
        {selectedId.map(selectedId => {
          return (
            <div>
              {menuArray.map(({ editor, id }) => {
                if (selectedId != id) return null;

                return (
                  <>
                    <EditorMenu editor={editor.editor} id={id} activeId={selectedId} />
                  </>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="textArea">
        <SelectedIdContext.Provider value={handleSelect}>
          <EditorContext.Provider value={generateEditorMenus}>
            <DataContext.Provider value={[renderData, setRenderData]}>
              {/* <SaveContext.Provider value={handleUpdateTextField}> */}
              <EnterContext.Provider value={handleEnter}>
                <ComponentMapper data={renderData} />
              </EnterContext.Provider>
            </DataContext.Provider>
            {/* </SaveContext.Provider> */}
          </EditorContext.Provider>
        </SelectedIdContext.Provider>
      </div>

      <div
        className="rounded bg-purple-300 px-4 py-2"
        onClick={() => {
          devUpdateSave();
        }}
      >
        reset data
      </div>

      <div></div>
      {/* <Tiptaptemp sex={"asd"}/> */}
    </>
  );
}

export default App;
