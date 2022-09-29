import React from 'react'

export default function JumpDown(props) {

    const id = props.selectedId[0]

    const handleClick = () => {
        const data = JSON.parse(localStorage.getItem("data"))



        recursion(data)

    }

    const recursion = (array) => {
        //loops through each component in tree
        array.forEach(component => {
            if (component.id === id) {
                console.log("i found it!")
            }



            //if it's a container:
            if (Array.isArray(component.Content)) {

                //if one of it's children has the id of selected textfield
                component.Content.forEach(child => {

          
                    if (child.id === id) {
                        console.log("i found it!")
                    }

                    

                    if (Array.isArray(child.Content)) {
                        recursion(child.Content)
                    }
                });


            }
        });
    }

    return (
        <div className='richButton'
            onClick={handleClick}
        >Jump Out</div>
    )
}
