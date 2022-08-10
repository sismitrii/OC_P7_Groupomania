/*====================================================*/
/* --------------------- Import -----------------------*/
/*====================================================*/
import Logo from '../../assets/icon-left-font.svg';
import styled from 'styled-components';

import NavBar from '../NavBar';
import Search from '../Search';
import LogOut from '../LogOut';

/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/
const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 90px;
`

/*====================================================*/
/* ------------------- Component ---------------------*/
/*====================================================*/

//window.matchMedia("(min-width: 400px)").matches
function Header(){
    return (
    <HeaderContainer>
        <img src={Logo} alt="Logo de Groupomania"/>
        {window.matchMedia("(max-width:768px)").matches ?
            <NavBar $forMobile />
       :
        <>
            <NavBar />
            <Search />
            <LogOut />
        </>

        }
        
    </HeaderContainer>)
}

// Header avec un affichage différent en fct de la taille 

export default Header