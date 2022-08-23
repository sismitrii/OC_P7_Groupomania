/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/

import { faAngleUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"
import PostButton from "./PostButton"
import PictureBloc from "./PictureBloc"
import Deleted from '../assets/Deleted.jpg'
import { useContext } from "react"
import { AppContext } from "../utils/context"
import PasswordBloc from "./PasswordBloc"
import { useState } from "react"

/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/
    const Container = styled.div`
        position: relative;
        background-color: ${(props)=>props.isMobile ? "#EDEDED" : "#FFF"}; 
        margin-bottom: ${(props)=> props.isActive ? "10px" : "2px"};
        box-shadow: 0px 0px 5px #AAA;
        `

    const StyledTitle = styled.button`
        width: 100%;
        padding: 10px 20px;
        cursor: pointer;
        border: none;
        text-align: left;
        font-size: 14px;
        font-weight: bold;
        ${(props)=> props.isMobile ? "" : "background-color: #FFF"}
    `


const ContentContainer = styled.div`
    padding: 0px 20px;
    height: auto;
    max-height: ${(props)=> props.isActive? "300px" : "0px"};
    overflow: hidden;

    transition: max-height 0.3s ease-out;
`

const StyledInput = styled.input`
    
    ${(props)=>props.forInformation ? "width: 100%; min-width: 150px;max-width: 300px;": "flex:1;"}
    height: 25px;
    border: 1px solid #AAA;
    outline: none;
    padding-left: 10px;
    margin-bottom: 10px;

    &[type="date"] {
        font-family: arial, sans-serif;
        font-size: 14px;
        background:#FFF;
        padding:5px;
        color : #888;
    }
`

const StyledIcon = styled(FontAwesomeIcon)`
    position: absolute;
    right: 20px;
    top: 7px;
    color : #000;
    transform: rotate(${(props)=> props.isActive ? "-180deg" : "0deg"});

    transition: transform 0.3s ease-in-out;
`
const GeneralContainer = styled.div`
    display: flex;
    flex-direction: ${(props)=> props.column ? "column" : "row"};
    justify-content: center;
    ${(props)=> props.column && "align-items: center;"}
    
    p{
        font-size: 14px;
        text-align: center;
        margin-bottom: 10px;
    }

    div {
        display: flex;
        justify-content: space-between;
        width: 200px;
    }
`
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`
const Information = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const StyledLabel = styled.label`
    min-width: 120px;
    font-size:12px
`

const PasswordContainer = styled.div`
    margin: 0px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
        border-radius: 0px;
        border: 1px solid #AAA;
    }

    button {
        margin: 10px;
    }
`

const StyledButton = styled.button`
    min-width : 90px;
    background-color: ${(props)=> props.cancel ? "#AAA" : "red"};
    color: #FFF;
    border: none;
    padding: 5px;
    border-radius: 2px;
    margin-bottom: 10px;
    cursor: pointer;
`


/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/
function AccordionItem(props){
    const isMobile = window.matchMedia("(max-width:768px)").matches
    const {parameters} = useContext(AppContext)
    const [passwordIsOK, setPasswordIsOk] = useState(false)
    const [confirmation, setConfirmation] = useState(false)

    const informations = Object.keys(parameters);

    let toReturn;

    switch(props.type){
        case "department":
        case "name":
            toReturn = 
            <GeneralContainer>
                <StyledInput type="text" placeholder={props.data.title} />
                <PostButton type="editProfil" content={<FontAwesomeIcon icon={faPen} />} postMethod={()=> console.log("clic")}/>
            </GeneralContainer>
        break;
        case "picture":
            toReturn =  
            <>
                <PictureBloc image={Deleted} handleChangePicture={()=>console.log("test")}/>
            </>
        break;
        case "informations":
            toReturn = 
            <StyledForm>
                {informations && informations.map((information,i )=>(
                <Information key={`${information}-${i}`}>
                    <StyledLabel htmlFor={`information__${information}`}>
                        {parameters[information].sentence}
                    </StyledLabel>
                    <StyledInput 
                        forInformation
                        id={`information__${information}`} 
                        name={`information__${information}`} 
                        type={parameters[information].inputType} 
                        placeholder={parameters[information].sentence} />
                </Information>
                ))}
                <PostButton content={"Appliquer"} />
            </StyledForm>
        break;
        case "password":
            toReturn = 
            <PasswordContainer>
                {passwordIsOK ? 
                <>
                    <PasswordBloc
                        onChange={(e)=>console.log(e.target.value)} 
                        label={"Votre nouveau mot de passe"} 
                        name={"password"}
                    />
                    <PasswordBloc
                        onChange={(e)=>console.log(e.target.value)} 
                        label={"Confirmez"} 
                        name={"password_-confirmation"}
                    />
                    <PostButton 
                        postMethod={()=>console.log("clic")}
                        content={"Changez mon mot de passe"} 
                    />
                </>
                :
                <>
                    <PasswordBloc
                        onChange={(e)=>console.log(e.target.value)} 
                        label={"Veuillez entrez votre ancien mot de passe"} 
                        name={"password"}
                    />
                    <PostButton 
                        postMethod={()=>setPasswordIsOk(!passwordIsOK)}
                        content={"Changez mon mot de passe"} 
                    />
                </>
                }
            </PasswordContainer>
        break;
        case "deleteAccount":
            toReturn = 
            <GeneralContainer column>
                {confirmation ?
                <>
                    <p>Confirmez que vous souhaitez supprimez votre compte</p> 
                    <div>
                        <StyledButton>Confirmez</StyledButton>
                        <StyledButton onClick={()=>setConfirmation(false)} cancel >Annuler</StyledButton>
                    </div>

                </>
                :
                <StyledButton onClick={()=>setConfirmation(true)}>Je veux supprimer mon compte</StyledButton>
                }
            </GeneralContainer>
        break;
        default:
            toReturn = <p>Error</p>
    }

    return(
        <Container isActive={props.isActive} isMobile={isMobile}>
            <StyledTitle isMobile={isMobile} onClick={props.onClick}>
                {props.data.title}
            </StyledTitle>
            <StyledIcon isActive={props.isActive} icon={faAngleUp} />
            <ContentContainer isActive={props.isActive} >
                {toReturn}
            </ContentContainer>
        </Container>
    )
}

export default AccordionItem