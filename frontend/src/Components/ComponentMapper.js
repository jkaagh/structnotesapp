import React, {useEffect} from 'react'
import ComponentReturner from './ComponentReturner'

export default function ComponentMapper(props) {



    return (

        <>
            {
                props.data &&
                 props.data.map((item, index) => {



                    let patharray = []
                    if(props.path == undefined){
                        patharray = [index]
                    }
                    else{
                        
                        patharray = props.path.concat([index])
                    }


                    let component = ComponentReturner(item, patharray, index )
                    

                    return (
                        <>
                            {component}
                        </>

                    )
                })
            }
        </>
    )
}
