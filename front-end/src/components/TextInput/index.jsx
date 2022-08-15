/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import { useState } from "react";
import styled from "styled-components"

/*====================================================*/
/* --------------------- Style ----------------------*/
/*====================================================*/

const StyledInput = styled.textarea`
    width: 100%;
    height: ${(props) => props.textHeight};
    border: none;
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
/* ------------------ Main Function ------------------*/
/*====================================================*/

function TextInput(props){
    const [textHeight, setTextHeight] = useState("40px")

    async function handleKeyUp(e){
        await setTextHeight("auto")
        let scrollHeight = e.target.scrollHeight;
        await setTextHeight(scrollHeight+"px");
        props.set(e.target.value);
    }

    return (
        <StyledInput
            onKeyUp={(e)=>handleKeyUp(e)}
            textHeight = {textHeight}
            maxLength={500}
            name={props.input.name}
            id={props.input.name} 
            aria-label={props.input.placeholder} 
            placeholder={props.input.placeholder}
            required
         />
    )
}

export default TextInput