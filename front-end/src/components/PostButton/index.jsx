/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/

import styled from "styled-components"
import colors from "../../utils/styles/colors"


/*====================================================*/
/* ---------------------- Style ----------------------*/
/*====================================================*/

const StyledButton = styled.button`
    padding: ${(props)=> props.isText ? "5px 30px" :"0px" };
    border: none;
    border-radius: 8px;
    cursor: pointer;
    outline: none;
    background-color: ${colors.secondary};
    font-size: 16px;
`

/*====================================================*/
/* -------------------- Main  ------------------------*/
/*====================================================*/

function PostButton(props){

    

    return(<
        StyledButton 
            onClick={props.postMethod} 
            isText={typeof(props.content) === "string"}
        >
            {props.content}
        </StyledButton>)
}


export default PostButton


