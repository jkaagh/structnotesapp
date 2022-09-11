import React, {useEffect} from 'react'
import ComponentReturner from './ComponentReturner'

export default function ComponentMapper({data}) {

    useEffect(() => {
        // console.log(data)
    }, [data])
    

    return (

        <>
            {
                data &&
                 data.map((item) => {
                    let component = ComponentReturner(item)
                    

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
