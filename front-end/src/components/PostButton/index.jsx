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
    min-width: 40px;
    max-height: 40px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
    background-color: ${colors.secondary};
    font-size: 16px;
    margin-left: 10px;
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


