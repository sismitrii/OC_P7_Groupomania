/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import { useState } from "react";
import styled from "styled-components"

import colors from "../utils/styles/colors";

/*====================================================*/
/* --------------------- Style ----------------------*/
/*====================================================*/

const StyledInput = styled.textarea`
    ${(props)=> props.isCommentMod ? 
        `position: absolute;
        left: 0px;
        top: 0px;
        z-index: 900;`
    :
        ``
    }

    width: 100%;
    height: ${(props) => props.textHeight};
    border: none;
    border-radius: 5px;
    resize: none;
    font-family: 'Lato';
    padding: 10px;
    font-size: 12px;

    &:focus {
        outline: none;
        box-shadow: 0px 0px 0px 1px ${colors.primary}
    }

    @media (min-width: 768px){
        font-size: 14px;
    }

    &::-webkit-scrollbar{
        width: 0px;
    }
`

/*====================================================*/
/* ----------------------- Main ----------------------*/
/*====================================================*/

function AutosizedTextArea(props){
    const [textHeight, setTextHeight] = useState("40px")

    /*=== Autosize the textarea and call function of props===*/
    async function handleKeyUp(e){
        props.set(e.target.value, props.information);
        await setTextHeight("auto")
        const scrollHeight = e.target.scrollHeight;
        await setTextHeight(scrollHeight+"px");
    }

    return (
        <StyledInput
            isCommentMod={props.isCommentMod}
            ref={props.input.setRef ? props.input.setRef : null}
            onChange={(e)=>handleKeyUp(e)}
            onBlur={()=>props.handleLoseFocus ? props.handleLoseFocus(): null}
            textHeight = {textHeight}
            maxLength={500}
            name={props.input.name}
            id={props.input.name} 
            aria-label={props.input.placeholder} 
            placeholder={props.input.placeholder}
            value={props.value}
            required
         />
    )
}

export default AutosizedTextArea

