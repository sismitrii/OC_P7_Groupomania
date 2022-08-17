/*====================================================*/
/* ------------------- Import ---------------------*/
/*====================================================*/
import { useState, useEffect, useCallback } from "react"
import styled, {keyframes} from "styled-components"

import Header from "../../components/Header"
import PublicationBloc from "../../components/PublicationBloc"
import colors from "../../utils/styles/colors"


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

const animationLoader = keyframes`
0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Loader = styled.div`
display: inline-block;
width: 80px;
height: 80px;

&::after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: ${colors.primary} transparent ${colors.secondary} transparent;
    animation: ${animationLoader} 1.2s linear infinite;
  }
`


/*====================================================*/
/* ------------------- Component ---------------------*/
/*====================================================*/
function Home(){
    //const [startToLoad, setStartToLoad] = useState(0);
    //const {data, isLoading, error} = useFetch(`http://localhost:3000/api/publication/${startToLoad}`);
    const [publications, setPublications] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    let offset = 0
    console.log('render');

    const loadMorePublication = useCallback(async() => {
        try {
            setIsLoading(true);
            const res = await fetch(`http://localhost:3000/api/publication/${offset}`)
            const dataToAdd = await res.json()
            await setPublications((prevPublication) => [...prevPublication, ...dataToAdd.publicationToReturn])
            offset += 5;
            // est ce que je ferais pas toute les requetes à la suite ?
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    },[setPublications])

    const handleScroll = (e)=>{
        if ((window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) && (isLoading === false)){
            loadMorePublication();
            console.log("loaded");
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
            { publications && publications.map((publication,i)=>(
                <PublicationBloc key={i} publication={publication} type={"show"}/>
                ))}
            {isLoading && <Loader></Loader>}
        </Container>
        
    </>
    )
}

export default Home

//