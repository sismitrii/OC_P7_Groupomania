/*====================================================*/
/* ------------------- Import ---------------------*/
/*====================================================*/
import styled from "styled-components"

import Header from "../../components/Header"
import PublicationBloc from "../../components/PublicationBloc"


/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/

const Container = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: auto;
    max-width: 700px;
    min-width: 320px;
`

const HomeTitle = styled.h1`
    font-size: 25px;
    font-weight: 500;
    margin: 20px;
`

/*====================================================*/
/* ------------------- Component ---------------------*/
/*====================================================*/
function Home(){
    return (
    <>
        <Header active={"home"}/>
        <Container>
            <HomeTitle>Fil d'actualités</HomeTitle>
            <PublicationBloc />
        </Container>
        
    </>
    )
}

export default Home