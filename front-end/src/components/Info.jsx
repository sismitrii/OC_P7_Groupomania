/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"
import colors from "../utils/styles/colors"
import { useContext, useState } from "react"
import { AppContext } from "../utils/context"

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
`

/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/
function Info(props){
    const [isOnChange, setIsOnChange] = useState(false)
    const {profil} = useContext(AppContext)

    //si profil[props.type] alors on met un p
    //sinon on met un button

    function handleClick(){
        setIsOnChange(true);
    }

    function handleLoseFocus(){
        setIsOnChange(false);
        // requete changement d'info
        // setProfil
    }

    return (
    <>
    {props && profil[props.type] ? 
        <p>{props.sentence} : {profil[props.type]}</p>
    :
        <>
            {isOnChange ? 
            <StyledInput onBlur={()=>handleLoseFocus()} type='text' placeholder={props.sentence} autoFocus/>
            :
            <AddInfo onClick={()=>handleClick()}>
                <FontAwesomeIcon icon={faCirclePlus} />
                <p>{props.sentence}</p>
            </AddInfo>

            }
        </>
    }
    </>
    )
}

export default Info