/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/

import { useCallback } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import styled from "styled-components"
import { AppContext, ConnectionContext, SettingsContext } from "../utils/context"
import { fetchGet } from "../utils/function/function"
import AccordionItem from './AccordionItem'

/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/
const Container = styled.div`
    width: 100%;
    min-width: 320px;
    text-align: center;
    ${(props)=> props.isMobile ? "" : "padding: 30px;"}
`
/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/
function Accordion(){
    const {dataConnection} = useContext(ConnectionContext)
    const {isMobile} = useContext(AppContext);
    const {activeIndex, setActiveIndex, setUserData, updatedMessage} = useContext(SettingsContext)

    const loadUserData = useCallback(async()=>{
        const answer = await fetchGet(`http://localhost:3000/api/user/${dataConnection.userId}`)
        //input type date need a date with format : "yyyt-mm-dd"
        if (answer.user.birthday){
            answer.user.birthday = answer.user.birthday.split('T')[0];
        }
        setUserData(answer.user)
    },[dataConnection, setUserData])

    useEffect(()=>{
        // async function loadUserData(){
        //     const answer = await fetchGet(`http://localhost:3000/api/user/${dataConnection.userId}`)
        //     //input type date need a date with format : "yyyt-mm-dd"
        //     if (answer.user.birthday){
        //         answer.user.birthday = answer.user.birthday.split('T')[0];
        //     }
        //     setUserData(answer.user)
        // }
        loadUserData()
    },[dataConnection, loadUserData])

    const tabs = {
        username: "Nom et Prénom",
        picture: "Photo de profil",
        department: "Secteur/Poste",
        informations: "Informations",
        password:  "Mot de passe",
        deleteAccount: "Supprimer le compte"
    }

    const types = Object.keys(tabs)
    
    return(
      <Container role="Accordéon de paramètres" isMobile={isMobile}>
        {types.map((type , index)=>(
            <AccordionItem 
                key={`${type}-${index}`}
                onClick={()=>setActiveIndex(index)}
                type = {type}
                data = {tabs[type]}
                role ="Onglet"
                isActive = {index === activeIndex ? true : false}
                aria-expanded= {index === activeIndex ? true : false}  
            />
        ))}
    
        <p>{updatedMessage}</p>
      </Container>  
    )
}

export default Accordion