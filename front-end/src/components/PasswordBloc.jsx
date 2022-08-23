/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import styled from "styled-components"
import colors from "../utils/styles/colors"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye } from "@fortawesome/free-solid-svg-icons"
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
const EyeIcon = styled(FontAwesomeIcon)`
    font-size: 12px;
    position: absolute;
    right: 6%;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
`

/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/
function PasswordBloc(props){

    function showPassword(e){
        e.stopPropagation();
        const input = e.currentTarget.previousElementSibling
        if (input.type === "password"){
            input.type = "text";
        } else {
            input.type = "password";
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
                type="password" />
            <EyeIcon onClick={(e)=> showPassword(e)}icon={faEye} />
        </InputContainer>
    </>
    )
}

export default PasswordBloc