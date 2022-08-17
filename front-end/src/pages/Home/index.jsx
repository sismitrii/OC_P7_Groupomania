/*====================================================*/
/* ------------------- Import ---------------------*/
/*====================================================*/
import { useState, useEffect, useCallback } from "react"
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
    //const [startToLoad, setStartToLoad] = useState(0);
    //const {data, isLoading, error} = useFetch(`http://localhost:3000/api/publication/${startToLoad}`);
    const [publications, setPublications] = useState([])
    let offset = 0

    const loadMorePublication = useCallback(async() => {
        try {
            const res = await fetch(`http://localhost:3000/api/publication/${offset}`)
            const dataToAdd = await res.json()
            await setPublications((prevPublication) => [...prevPublication, ...dataToAdd.publicationToReturn])
            offset += 5;
        } catch (error) {
            console.error(error);
        }
    },[setPublications])

    const handleScroll = (e)=>{
        if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight){
            loadMorePublication();
        }
    }

    useEffect(()=>{
        loadMorePublication();
        window.addEventListener("scroll", handleScroll)
    },[])


    return (
    <>
        <Header active={"home"}/>
        <Container>
            <HomeTitle>Fil d'actualités</HomeTitle>
            <PublicationBloc type={"add"}/>
            {publications.map((publication,i)=>(
                <PublicationBloc key={i} publication={publication} type={"show"}/>
            ))}

            
        </Container>
        
    </>
    )
}

export default Home

//