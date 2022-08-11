import { Link } from "react-router-dom"
import styled from "styled-components"
import colors from "../../utils/styles/colors"
import { useNavigate } from "react-router-dom";


const LogOutContainer = styled.button`
    padding : 10px 30px;
    margin : 0 10px;
    text-align : center;
    border : none;
    border-radius : 12px;
    outline : none;
    background-color : ${colors.secondary};
    cursor : pointer;
`

function LogOut(){
    const navigate = useNavigate();
    function handleLogOut(){
        localStorage.clear();
        navigate('/login');
    }

    return (
        <div onClick={()=>handleLogOut()}>
            {window.matchMedia("(max-width:768px)").matches ?
                <Link to="/Home">Se Déconnecter</Link> 
            : 
                <LogOutContainer>Deconnection</LogOutContainer>}
        </div>)
}

export default LogOut