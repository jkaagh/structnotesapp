function App() {

    //every line of text is a component that the ability to contain components.
    //every object in the array is mapped out onto the screen.

    let data =
    [
        {   
            ComponentType: "TextField",
            Content: "I am one line of text."           
        },
        {
            ComponentType: "TextField",
            Content: "I am on a new line!"
        },
        {
            ComponentType: "Accordion",
            Title: "Collapsible list of fruits.",
            Content: [
                {   
                    ComponentType: "TextField",
                    Content: "Banana"           
                },
                {   
                    ComponentType: "TextField",
                    Content: "Apple"           
                },
                {
                    ComponentType: "Accordion",
                    Title: "Independent nested accordion",
                    Content: [
                        {   
                            ComponentType: "TextField",
                            Content: "Hello"           
                        },
                        {   
                            ComponentType: "TextField",
                            Content: "World"           
                        },
                    ]
                },
            ]
        }


    ]

  return (
    <div className="MainWrapper">
        {/* A .map() function is given the json file and in this case will render components like this: */}
        <TextField content="I am one line of text."/>
        <TextField content="I am on a new line!"/>
        <Accordion title="Collapsible list of fruits.">
            <TextField content="Banana"/>
            <TextField content="Apple"/>
            <Accordion title="Independent nested accordion">
                <TextField content="Hello"/>
                <TextField content="World"/>
            </Accordion>
        </Accordion>
    </div>
  );
}

export default App;
