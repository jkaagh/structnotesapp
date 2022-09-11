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
            Content: [ //THIS ARRAY PASSED THROUGH AS PROP
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


        {/* in the map function this accordions content object is passed through as a prop and mapping is handled in there. */}
        <Accordion title="Collapsible list of fruits." content={content} />


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
