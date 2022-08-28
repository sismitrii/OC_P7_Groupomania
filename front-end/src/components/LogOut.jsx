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
                <Link to="/Home">Se Déconnecter</Link> 
            : 
                <LogOutContainer>Deconnection</LogOutContainer>}
        </div>)
}

export default LogOut