/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import { useState } from "react";
import styled from "styled-components"

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
    border: ${(props)=> props.value ? "1px solid black" : "none"};
    outline: none;
    border-radius: 5px;
    resize: none;
    font-family: 'Arial';
    padding: 10px;

    @media (min-width: 768px){
        font-size: 18px;
    }

    &::-webkit-scrollbar{
        width: 0px;
    }
`

/*====================================================*/
/* ----------------------- Main ----------------------*/
/*====================================================*/

function TextInput(props){
    const [textHeight, setTextHeight] = useState("40px")

    async function handleKeyUp(e){
        props.set(e.target.value);
        await setTextHeight("auto")
        let scrollHeight = e.target.scrollHeight;
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

export default TextInput

