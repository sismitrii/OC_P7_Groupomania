/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"
import colors from "../utils/styles/colors"
import { useContext, useState } from "react"
import { AppContext, ConnectionContext } from "../utils/context"
import { fetchPostOrPut } from "../utils/function/function"
import { Link, useParams } from "react-router-dom"
/*====================================================*/
/* ---------------------- Style ----------------------*/
/*====================================================*/

const AddInfo = styled.div`
    display: flex;
    width: fit-content;
    height: 35px;
    align-items: center;
    border-radius: 15px;
    padding: 5px 20px; 
    background-color: ${colors.primary};
    color: #FFF;
    cursor: pointer;

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
    font-family: 'Arial';
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
            let birthdate = new Date(profil[props.type]);
            printed = <>{birthdate.toLocaleDateString('en-GB')}</>
            break
        default:
            printed = <>{profil[props.type]}</>
    }
    if (props.type === "birthday"){
        
        console.log()
    }

    function handleClick(){
        setIsOnChange(true);
    }

    async function handleLoseFocus(e){
        setIsOnChange(false);
        const dataTosend = {}
        dataTosend[props.type] = e.target.value;
        const answer = await fetchPostOrPut("PUT", dataTosend, `http://localhost:3000/api/user/${profilId.id}`, dataConnection)
        console.log(answer);
        setProfil((prev)=> ({...prev, ...dataTosend }))
    }

    async function handleKeyUp(e){
        await setTextHeight("auto")
        let scrollHeight = e.target.scrollHeight;
        await setTextHeight(scrollHeight+"px");
    }

    return (
    <>
    {props && profil[props.type] ? 
        <p>{props.parameter.sentence} : {printed}</p>
    :
        <>
            {isOnChange ? 
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

            :
            <AddInfo onClick={()=>handleClick()}>
                <FontAwesomeIcon icon={faCirclePlus} />
                <p>{props.parameter.sentence}</p>
            </AddInfo>

            }
        </>
    }
    </>
    )
}

export default Info