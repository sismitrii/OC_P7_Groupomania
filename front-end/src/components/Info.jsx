/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"
import colors from "../utils/styles/colors"
import { useState } from "react"

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
function Info(){
    const [isOnChange, setIsOnChange] = useState(false)

    function handleClick(){
        setIsOnChange(true);
    }

    function handleLoseFocus(){
        setIsOnChange(false);
    }

    return (
    // <p>Nasum rationem navigandi emas, Lorel</p>
    <>
        {isOnChange ? 
        <StyledInput onBlur={()=>handleLoseFocus()} type='text' placeholder="Numéro de portable" autoFocus/>
        :
        <AddInfo onClick={()=>handleClick()}>
            <FontAwesomeIcon icon={faCirclePlus} />
            <p>Numéro de portable</p>
        </AddInfo>

        }
    </>)
}

export default Info