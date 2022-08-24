/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import Logo from '../assets/icon-left-font.svg';
import styled from 'styled-components';

import NavBar from './NavBar';
import Search from './Search';
import LogOut from './LogOut';
import { useContext } from 'react';
import { AppContext } from '../utils/context';

/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/
const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 120px;
    box-shadow: 0 4px 10px -2px #b3b3b3;
    margin-bottom ${(props)=> props.isMobile ? "20px": "150px" }
`
const HeaderLogo = styled.img`
    width: 60%;
    min-width: 260px;
    max-width: 400px;
`

/*====================================================*/
/* ------------------- Component ---------------------*/
/*====================================================*/

function Header(props){
    const {isMobile} = useContext(AppContext);

    return (
    <HeaderContainer isMobile={isMobile}>
        <HeaderLogo src={Logo} alt="Logo de Groupomania"/>
        {isMobile ?
            <NavBar $forMobile/>
       :
        <>
            <NavBar active={props.active}/>
            <Search />
            <LogOut />
        </>

        }
    </HeaderContainer>)
}

export default Header