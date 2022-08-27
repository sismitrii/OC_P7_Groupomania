/*====================================================*/
/* -------------------- Import -----------------------*/
/*====================================================*/
import styled from "styled-components"
import colors from "../utils/styles/colors"
/*====================================================*/
/* -------------------- Style ------------------------*/
/*====================================================*/
const StyledButton = styled.button`
    min-width: 65%;
    padding: 5px 10px;
    height: 40px;
    margin: 20px;
    background-color: ${colors.primary};
    color: white;
    font-size: 15px;
    text-align: center;
    border: none;
    border-radius: 10px;
    cursor: pointer;

    @media (min-width: 768px){
        font-size: 18px;
    }
`
/*====================================================*/
/* --------------------- Main ------------------------*/
/*====================================================*/
function AuthBlocButton(props){
    return(
        <StyledButton onClick={(e)=>props.onClick(e)}>{props.content}</StyledButton>
    )
}

export default AuthBlocButton