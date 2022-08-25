/*====================================================*/
/* ------------------- Import ---------------------*/
/*====================================================*/

import Header from "../../components/Header";
import ErrorImg from '../../assets/Error404.png'
import styled from "styled-components";

/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    min-width: 320px;
`

const StyledImg = styled.img`
    width: 80%;
    max-width: 700px;
`
/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/
function Error(){

    return(
        <>
            <Header />
            <Container>
                <StyledImg src={ErrorImg} alt="page d'erreur 404" />
            </Container>
        </>
    )
}

export default Error