/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import styled from "styled-components"
import { useRef } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye } from "@fortawesome/free-solid-svg-icons"

import colors from "../utils/styles/colors"
/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/
const Label = styled.label`
    font-size: 14px;
    margin: 10px;
    @media (min-width: 768px){
        font-size: 18px;
    }
`
const InputContainer = styled.div`
    position: relative;
    width: 100%;
`
const StyledInput = styled.input`
    height: 30px;
    width: 100%;
    border: none;
    border-radius: 5px;
    padding-left: 5px ;

    &:focus {
        outline: none;
        box-shadow: 0 0 0 1px ${colors.primary};
    }
`
const EyeButton = styled.div`
    font-size: 12px;
    position: absolute;
    right: 6%;
    top: 50%;
    transform: translateY(-50%);
    background-color: transparent;
    border: none;
    cursor: pointer;

`
/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/
function PasswordBloc(props){
    const input = useRef(null)

    /*=== At click on eye change type of input to show it content===*/
    function showPassword(e){
        e.preventDefault();

        if (input.current.type === "password"){
            input.current.type = "text";
        } else {
            input.current.type = "password";
        }
    }

    return(
        <>
        <Label htmlFor={props.name} >{props.label}</Label>
        <InputContainer>
            <StyledInput 
                onChange={(e)=> props.onChange(e)} 
                name={props.name}
                id={props.name}
                type="password" 
                value={props.value}
                ref={input}
            />
            <EyeButton aria-controls={props.name} onClick={(e)=> showPassword(e)}>
                <FontAwesomeIcon 
                tabIndex="0"
                onKeyDown={(e)=>{
                    if(e.key === 'Enter' || e.key === " "){
                        showPassword(e)
                    }
                }}
                aria-label="Icon en forme d'œil, fait apparaitre le mot de passe au clic" 
                icon={faEye} />
            </EyeButton>
        </InputContainer>
    </>
    )
}

export default PasswordBloc