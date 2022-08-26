/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/

import { faAngleUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"
import { useContext } from "react"
import { AppContext, ConnectionContext } from "../utils/context"
import AccordionItemOneField from "./AccordionItemOneField"
import AccordionItemPicture from "./AccordionItemPicture"
import AccordionItemMultipleField from "./AccordionItemMultipleField"
import AccordionItemChangePassword from "./AccordionItemChangePassword"
import AccordionItemDeleteAccount from "./AccordionItemDeleteAccount"

/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/
const Container = styled.div`
    position: relative;
    border-radius:${(props)=> props.isMobile ? "" :"5px"};
    background-color: ${(props)=>props.isMobile ? "#EDEDED" : "#FFF"}; 
    margin-bottom: ${(props)=> props.isActive ? "10px" : "2px"};
    box-shadow: 0px 0px 5px #AAA;
`

const StyledTitle = styled.button`
    width: 100%;
    border-radius: ${(props)=> props.isMobile ? "" : "5px"};
    padding: 10px 20px;
    cursor: pointer;
    border: none;
    text-align: left;
    font-size: 12px;
    ${(props)=> props.isMobile ? "" : "background-color: #FFF"};

    h2 {
        font-family: 'Raleway';
        font-weight: 600;
        font-size: 14px;
    }
`
const ContentContainer = styled.div`
    padding: 0px 20px;
    height: auto;
    max-height: ${(props)=> props.isActive? "300px" : "0px"};
    overflow: hidden;

    transition: max-height 0.3s ease-out;
`

const StyledIcon = styled(FontAwesomeIcon)`
    position: absolute;
    right: 20px;
    top: 7px;
    color : #000;
    transform: rotate(${(props)=> props.active === "true" ? "-180deg" : "0deg"});

    transition: transform 0.3s ease-in-out;
`
/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/
function AccordionItem(props){
    const {dataConnection} = useContext(ConnectionContext)
    const {isMobile} = useContext(AppContext)
    
    const urlUpdate = `http://localhost:3000/api/user/${dataConnection.userId}`

    let toReturn;
    switch(props.type){
        case "department":
        case "username":
            toReturn = 
            <AccordionItemOneField 
                type={props.type} 
                data={props.data} 
                urlUpdate={urlUpdate} 
            />
        break;
        case "picture":
            toReturn =  <AccordionItemPicture urlUpdate={urlUpdate}/>
        break;
        case "informations":
            toReturn = 
            <AccordionItemMultipleField 
                type={props.type} 
                urlUpdate={urlUpdate}
            />
        break;
        case "password":
            toReturn = <AccordionItemChangePassword />
        break;
        case "deleteAccount":
            toReturn = <AccordionItemDeleteAccount />
        break;
        default:
            toReturn = <p>Error</p>
    }

    return(
    <>
        {(!(props.type === 'deleteAccount' && (dataConnection.role && dataConnection.role.includes('ROLE_ADMIN')))) ?
            <Container isActive={props.isActive} isMobile={isMobile}>
                <StyledTitle isMobile={isMobile} onClick={props.onClick}>
                    <h2>{props.data}</h2>
                </StyledTitle>
                {/* Revoir Erreur la solution ne me plait pas*/}
                <StyledIcon active={props.isActive.toString()} icon={faAngleUp} />
                <ContentContainer isActive={props.isActive} >
                    {toReturn}
                </ContentContainer>
            </Container>
        :
            <></>
        }
    </>)
}

export default AccordionItem