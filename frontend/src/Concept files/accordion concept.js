import React from 'react'

// content variable passed through as prop, maps out all components just like mainwrapper.
let content = [
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

export default function Accordion(content) {
  return (
    <div>
        {/* .map() will render out components like this. Now i just need to figure out how this nested TextField */}
        {/* will handle editing/saving of original .json savefile. */}
        <TextField content="Banana"/>
        <TextField content="Apple"/>
        {/* exact same stuff happens here: */}
        <Accordion title="Independent nested accordion" content={content} /> 
    </div>
  )
}
