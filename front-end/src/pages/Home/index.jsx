/*====================================================*/
/* ------------------- Import ---------------------*/
/*====================================================*/
import { useContext, useState} from "react"
import styled, {keyframes} from "styled-components"

import Header from "../../components/Header"
import Bloc from "../../components/Bloc"
import colors from "../../utils/styles/colors"

import InfiniteScroll from 'react-infinite-scroll-component';
import {fetchGet} from "../../utils/function/function"
import { AppContext } from "../../utils/context"
import { useEffect } from "react"

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

useEffect(()=>{
    async function loadPublications(){
        const answer = await fetchGet(`http://localhost:3000/api/publication/all/0`)
        setPublications(answer.publicationToReturn)
    }
    loadPublications();
},[])
    return (
    <>
        <Header active={"home"}/>
        <Container>
            <h1>Fil d'actualités</h1>
            <Bloc 
                type={"add"}
            />
            <Infinite />
        </Container>
        
    </>
    )
}

export default Home

//