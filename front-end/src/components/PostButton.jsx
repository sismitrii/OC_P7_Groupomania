/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/

import styled from "styled-components"
import colors from "../utils/styles/colors"

/*====================================================*/
/* ---------------------- Style ----------------------*/
/*====================================================*/

const StyledButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${(props)=> {
        if (props.type === "comment"){return "0"}
        else if (props.type === "editProfil"){return "12px 8px"}
        else {return "5px 30px" }}};
    ${(props)=> props.type === "comment" ? "min-width: 40px" : ""};
    ${(props)=>props.type === "editProfil" ? "height: 25px;" : ""}
    max-height: 40px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: ${colors.secondary};
    font-size: 12px;
    margin-left: 10px;

    @media (min-width: 768px){
        font-size: 16px;
    }
`

/*====================================================*/
/* -------------------- Main  ------------------------*/
/*====================================================*/

function PostButton(props){

    return(<
        StyledButton 
            onClick={(e)=>props.postMethod(e, props.type)} 
            type={props.type}
        >
            {props.content}
        </StyledButton>)
}


export default PostButton


