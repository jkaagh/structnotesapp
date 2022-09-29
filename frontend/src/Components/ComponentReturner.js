import Accordion from "./Accordion"
import TextField from "./TextField"


const ComponentReturner = (item, patharray, index) => {


    if(item.ComponentType === "TextField"){
        return <TextField content={item.Content} id={item.id} path={patharray}/>
    } 

    if(item.ComponentType === "Accordion"){
        return <Accordion title={item.Title} content={item.Content} id={item.id} path={patharray}/>
    }

}

export default ComponentReturner