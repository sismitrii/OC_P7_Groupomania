/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"
import colors from "../utils/styles/colors"


/*====================================================*/
/* ---------------------- Style ----------------------*/
/*====================================================*/

const StyledButton = styled.button`
    padding: ${(props)=> props.type === "comment" ? "Opx" :"5px 30px" };
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

    const content = {
        comment: <FontAwesomeIcon icon={faPaperPlane} />,
        publication: "Poster",
        modification: "Modifier"
    }

    return(<
        StyledButton 
            onClick={props.postMethod} 
            type={props.type}
        >
            {content[props.type]}
        </StyledButton>)
}


export default PostButton


