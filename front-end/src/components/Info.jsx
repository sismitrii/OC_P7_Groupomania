/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import styled from "styled-components"
import { useParams } from "react-router-dom"
import { useContext, useState } from "react"
import { AppContext, ConnectionContext } from "../utils/context"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"

import colors from "../utils/styles/colors"
import { fetchPostOrPut } from "../utils/function/function"

/*====================================================*/
/* ---------------------- Style ----------------------*/
/*====================================================*/
const AddInfo = styled.button`
    display: flex;
    width: fit-content;
    height: 35px;
    align-items: center;
    border-radius: 15px;
    padding: 5px 20px; 
    background-color: ${colors.primary};
    color: #FFF;
    cursor: pointer;
    border: none;
    font-size: 16px;
    font-family: 'Lato';

    svg {
        margin-right: 10px;
    }
`
const StyledInput = styled.input`
    display: block;
    width: 100%;
    height: 35px;
    border: none;
    border-radius: 5px;
    outline: none;
    padding-left: 15px;

    &[type="date"] {

        color: #95a5a6;
        font-family: arial, sans-serif;
        font-size: 18px;
        border: none;
        background:#FFF;
        padding:5px;
    }
`
const StyledTextArea = styled.textarea`
    display: block;
    width: 100%;
    height: ${(props) => props.textHeight};
    border: none;
    outline: none;
    resize: none;
    font-family: 'Lato';
    padding: 10px;

    &::-webkit-scrollbar{
        width: 0px;
    }
`
const A = styled.a`
    &:hover {
        text-decoration: underline;
    }
`
/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/
function Info(props){
    const [isOnChange, setIsOnChange] = useState(false)
    const {profil, setProfil} = useContext(AppContext)
    const profilId = useParams();
    const {dataConnection} = useContext(ConnectionContext);
    const [textHeight, setTextHeight] = useState("40px")

    let printed;
    switch (props.type){
        case "email" : 
            printed = <A href={`mailto:${profil[props.type]}`}>{profil[props.type]}</A>
            break;
        case "mobileNumber" : 
            printed = <A href={`tel: ${profil[props.type]}`}>{profil[props.type]}</A>
            break;
        case "birthday" :
            const birthdate = new Date(profil[props.type]);
            printed = <>{birthdate.toLocaleDateString('en-GB')}</>
            break
        default:
            printed = <>{profil[props.type]}</>
    }

    /*=== SetIsOnChange allowed to display an input to change profil data ===*/
    function handleClick(){
        setIsOnChange(true);
    }

    /*=== At Losing focus request to update new data in DB and display them===*/
    async function handleLoseFocus(e){
        setIsOnChange(false);
        const dataTosend = {}
        dataTosend[props.type] = e.target.value;
        const answer = await fetchPostOrPut("PUT", dataTosend, `http://localhost:3000/api/user/${profilId.id}`, dataConnection)
        console.log(answer);
        setProfil((prev)=> ({...prev, ...dataTosend }))
    }

    /*=== Autosizing of textArea===*/
    async function handleKeyUp(e){
        await setTextHeight("auto")
        const scrollHeight = e.target.scrollHeight;
        await setTextHeight(scrollHeight+"px");
    }

    return (
    <>
    {props && profil[props.type] ? 
        <p>{props.parameter.sentence} : {printed}</p>
    :
        <>
            {!isOnChange ? 
            <AddInfo onClick={()=>handleClick()}>
                <FontAwesomeIcon icon={faCirclePlus} />
                <p>{props.parameter.sentence}</p>
            </AddInfo>
            :
            <>
            {props.parameter.inputType === "textarea" ?
                <StyledTextArea 
                    onChange={(e)=>handleKeyUp(e)}
                    onBlur={(e)=>handleLoseFocus(e)}
                    textHeight = {textHeight}
                    maxLength= {500}
                    name = {`${profilId}-${props.parameter.inputType}`}
                    id = {`${profilId}-${props.parameter.inputType}`}
                    placeholder = {props.parameter.sentence}
                    autoFocus
                />
                :
                <StyledInput 
                    onBlur={(e)=>handleLoseFocus(e)} 
                    type={props.parameter.inputType} 
                    id={`${profilId}-${props.parameter.inputType}`}
                    name={`${profilId}-${props.parameter.inputType}`}
                    placeholder={props.parameter.sentence} 
                    autoFocus
                />
            }
        </>
            }
        </>
    }
    </>
    )
}

export default Info