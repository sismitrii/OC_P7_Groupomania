/*====================================================*/
/* ------------------- Import ---------------------*/
/*====================================================*/
import { useContext, useEffect} from "react"
import { Navigate } from "react-router-dom"
import styled from "styled-components"
import Header from "../../components/Header"
import Bloc from "../../components/Bloc"
import {fetchGet} from "../../utils/function/function"
import {AppContext, ConnectionContext } from "../../utils/context"
import Infinite from "../../components/Infinite"


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

    .infinite-scroll-component__outerdiv {
        width: 100%;
        text-align: center;
    }
`




/*====================================================*/
/* ------------------- Component ---------------------*/
/*====================================================*/
function Home(){
    const {setPublications} = useContext(AppContext)
    const {dataConnection} = useContext(ConnectionContext)

useEffect(()=>{
    async function loadPublications(){
        const answer = await fetchGet(`http://localhost:3000/api/publication/all/0`)
        setPublications(answer.publicationToReturn)
    }
    loadPublications();
},[])
    return (
    <>{ dataConnection.token ?
        <>
            <Header active={"home"}/>
            <Container>
                <h1>Fil d'actualités</h1>
                <Bloc 
                    type={"add"}
                />
                <Infinite />
            </Container>`
        </>
        :
        <Navigate replace to="/login"/>
    }
    </>
    )
}

export default Home

//