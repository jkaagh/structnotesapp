import Accordion from "./Accordion"
import TextField from "./TextField"


const ComponentReturner = (item) => {

    if(item.ComponentType === "TextField"){
        return <TextField content={item.Content} id={item.id}/>
    } 

    if(item.ComponentType === "Accordion"){
        return <Accordion title={item.Title} content={item.Content} id={item.id}/>
    }

}

export default ComponentReturner