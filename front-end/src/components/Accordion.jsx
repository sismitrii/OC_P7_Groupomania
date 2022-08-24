/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/

import { useEffect } from "react"
import { useContext } from "react"
import { useState } from "react"
import styled from "styled-components"
import { ConnectionContext, SettingsContext } from "../utils/context"
import { fetchGet } from "../utils/function/function"
import AccordionItem from './AccordionItem'

/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/
const Container = styled.div`
    min-width: 320px;
    text-align: center;
    ${(props)=> props.isMobile ? "" : "padding: 30px;"}
`
/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/
function Accordion(){
    const {dataConnection} = useContext(ConnectionContext)
    const isMobile = window.matchMedia("(max-width:768px)").matches
    const [activeIndex, setActiveIndex] = useState(0);
    const {setUserData} = useContext(SettingsContext)
    //const [modification, setModification] = useState(false);

    useEffect(()=>{
        async function loadUserData(){
            const answer = await fetchGet(`http://localhost:3000/api/user/${dataConnection.userId}`)
            //input type date need a date with format : "yyyt-mm-dd"
            if (answer.user.birthday){
                answer.user.birthday = answer.user.birthday.split('T')[0];
            }
            setUserData(answer.user)
        }
        loadUserData()
    },[dataConnection])



    const tabs = {
        username: {title: "Nom et Prénom"},
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
    
        <p>Ici on ajoutera un message de modification</p>
      </Container>  
    )
}

export default Accordion