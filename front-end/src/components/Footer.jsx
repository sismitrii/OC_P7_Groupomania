/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/

import { useLocation } from "react-router-dom";
import styled from "styled-components"

import Logo from '../assets/icon-left-font.svg';
/*====================================================*/
/* ---------------------- Style ----------------------*/
/*====================================================*/
const FooterContainer = styled.footer`
    width: 100%;
    background-color: #EEE;
    margin-top: 20px;
`

const Container = styled.div`
    margin: 0 auto
    width: 100%;
    min-width: 320px;
    max-width: 1400px;
    display: flex;
    align-items: center;
`

const FooterLogo = styled.img`
    width: 30%;
    min-width: 180px;
    max-width: 400px;
`

const StyledText = styled.p`
    font-size: 12px;
`
/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/
function Footer(){
    const location = useLocation();
    return(
    <>
    {(location.pathname.includes('/home') || location.pathname.includes('/profil') || location.pathname.includes('/settings')) ? 
        <FooterContainer>
            <Container>
                <FooterLogo src={Logo} alt="Logo de Groupomania"/>
                <div>
                    <StyledText>Copyright © 2022 - OpenClassroom Project - Realised by Florian Guerin</StyledText>
                </div>
            </Container>
        </FooterContainer>
    :
        <></>}
    </>)
}

export default Footer