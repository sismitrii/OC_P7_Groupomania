/*====================================================*/
/* -------------------- Import -----------------------*/
/*====================================================*/
import styled from "styled-components"

import Logo from '../assets/icon-left-font.svg'
/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background-color: #F4F4F4;
`
const AuthLogo = styled.img`
    width: 60%;
    min-width: 320px;
    margin: 30px 0px;
`
/*====================================================*/
/* --------------------- Main ------------------------*/
/*====================================================*/
function AuthPageContainer({children}){
    return(
    <Container>
        <AuthLogo src={Logo} alt="Logo de Groupomania"/>
        {children}
    </Container>)
}

export default AuthPageContainer