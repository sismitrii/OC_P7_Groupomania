/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/

import { useState } from "react"
import styled from "styled-components"
import AccordionItem from './AccordionItem'

/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/
const Container = styled.div`
    min-width: 320px;
    ${(props)=> props.isMobile ? "" : "padding: 30px;"}
`
/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/
function Accordion(){
    const isMobile = window.matchMedia("(max-width:768px)").matches
    const [activeIndex, setActiveIndex] = useState(0)

    const tabs = {
        name: {title: "Nom et Prénom"},
        picture: {title: "Photo de profil"},
        department: {title: "Secteur/Poste"},
        informations: {title: "Informations"},
        password: {title: "Mot de passe"},
        deleteAccount: {title: "Supprimer le compte"}
    }

    const types = Object.keys(tabs)
    
    return(
      <Container isMobile={isMobile}>
        {types.map((type , index)=>(
            <AccordionItem 
                key={`${type}-${index}`}
                onClick={()=>setActiveIndex(index)}
                type = {type}
                data = {tabs[type]}
                isActive = {index === activeIndex ? true : false}  
            />
        ))}
      </Container>  
    )
}

export default Accordion