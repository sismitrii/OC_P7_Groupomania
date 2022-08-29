/*====================================================*/
/* ------------------- Import ---------------------*/
/*====================================================*/
import styled from "styled-components";

import Logo from '../../assets/icon-left-font.svg'
import ErrorImg from '../../assets/Error404.png'
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ConnectionContext } from "../../utils/context";
/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/
const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 320px;

    a {
        width: 100%;
        max-width: 1000px;
    }
`
const StyledImg = styled.img`
    width: 80%;
    max-width: 700px;
`
const StyledLogo = styled.img`
    min-width: 320px;
    width: 100%;
    
`
/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/
function Error(){
    const {dataConnection} = useContext(ConnectionContext)
    return(
        <Container>
            {!dataConnection && <Link to='/home'><StyledLogo src={Logo} alt="Logo de Groupomania" /></Link>}
            <StyledImg src={ErrorImg} alt="page d'erreur 404" />
        </Container>
    )
}

export default Error