/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AppContext } from "../utils/context"

import colors from "../utils/styles/colors"

/*====================================================*/
/* ---------------------- Style ----------------------*/
/*====================================================*/
const LogOutContainer = styled.button`
    padding: 10px 30px;
    margin: 0 10px;
    text-align: center;
    border: none;
    border-radius: 12px;
    background-color: ${colors.secondary};
    cursor: pointer;
`
const StyledText = styled.p`
    display: block;
    width: 100%;
    padding: 15px;
    cursor: pointer;
`
/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/

function LogOut(){
    const {isMobile} = useContext(AppContext)
    const navigate = useNavigate();
    function handleLogOut(){
        localStorage.clear();
        navigate('/login');
    }

    return (
        <div onClick={()=>handleLogOut()}>
            {isMobile ?
                <StyledText tabIndex="0">Se Déconnecter</StyledText> 
            : 
                <LogOutContainer>Deconnection</LogOutContainer>}
        </div>)
}

export default LogOut