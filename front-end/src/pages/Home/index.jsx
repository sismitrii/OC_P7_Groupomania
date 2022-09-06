/*====================================================*/
/* ------------------- Import ---------------------*/
/*====================================================*/
import styled from "styled-components"
import { Navigate } from "react-router-dom"
import { useContext, useEffect} from "react"
import {AppContext, ConnectionContext } from "../../utils/context"

import Bloc from "../../components/Bloc"
import Infinite from "../../components/Infinite"

import {fetchGet} from "../../utils/function/function"

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

    /*=== When arriving on Home load 5 first publication ===*/
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
        
            <Container>
                <h1>Fil d'actualités</h1>
                <Bloc 
                    type={"add"}
                />
                <Infinite />
            </Container>`
        </>
        :
        <Navigate replace to="/"/>
    }
    </>
    )
}

export default Home

//