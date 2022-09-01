/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import styled from 'styled-components';
import { useContext } from 'react';
import { AppContext } from '../utils/context';

import NavBar from './NavBar';
import Search from './Search';
import LogOut from './LogOut';

import Logo from '../assets/icon-left-font.svg';
import { useLocation } from 'react-router-dom';

/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/
const HeaderContainer = styled.header`
    box-shadow: 0px 0px 5px 0px #b3b3b3;
    margin-bottom ${(props)=> props.isMobile ? "20px": "150px" }
`

const Container = styled.div`
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1300px;
    height: 120px;
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
    const location = useLocation()
    const {isMobile} = useContext(AppContext);

    return (
    <>
        {(location.pathname.includes('/home') || location.pathname.includes('/profil') || location.pathname.includes('/settings'))? 
        <HeaderContainer isMobile={isMobile}>
            <Container>
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
            </Container>
        </HeaderContainer>
        :
        <></>
        }
    </>
    )    
}

export default Header