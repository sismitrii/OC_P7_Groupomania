/*====================================================*/
/* ------------------- Import ---------------------*/
/*====================================================*/
import { useState, useEffect, useRef, useCallback } from "react"
import styled from "styled-components"

import useFetch from "../../utils/hooks"

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

const Test = styled.div`
    margin: 50px;
`

/*====================================================*/
/* ------------------- Component ---------------------*/
/*====================================================*/
function Home(){
    //const [startToLoad, setStartToLoad] = useState(0);
    //const {data, isLoading, error} = useFetch(`http://localhost:3000/api/publication/${startToLoad}`);
    const [publications, setPublications] = useState([])
    let offset = 0

    const loadMorePublication = async() => {
        try {
            const res = await fetch(`http://localhost:3000/api/publication/${offset}`)
            const dataToAdd = await res.json()
            await setPublications((prevPublication) => [...prevPublication, ...dataToAdd.publicationToReturn])
            offset += 5;
        } catch (error) {
            console.error(error);
        }
    }

    const handleScroll = (e)=>{
        if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight){
            loadMorePublication();
        }
    }

    useEffect(()=>{
        loadMorePublication();
        window.addEventListener("scroll", handleScroll)
    },[])


    // on veut charger les data au chargement de la page avec les 5 premieres publications
    // quand on arrive en bas on ne veut pas re-render tout Home mais juste ajouter les 
    // const handleObserver = useCallback((entries) => {
    //     const target = entries[0];
    //     //Retourne une valeur booléenne valant true si 
    //     //l'élément cible s'entrecoupe avec la zone d'intersection de l'élément racine
    //     if (target.isIntersecting) {
    //         console.log("ref");
    //         setStartToLoad((prev) => prev + 5); 
    //         // on update startToLoad donc on a re-render de Home
    //         // et fetchData du useEffect du hook qui
            
    //     }
    //   }, []);

    // // re-render chaque fois que l'on appelle la callBack donc que l'on arrive en bas ? 
    // useEffect(() => {
    //     // https://developer.mozilla.org/fr/docs/Web/API/Intersection_Observer_API#cr%C3%A9ation_dun_observateur_dintersection
    //     // on crée un IntersectionObserver qui prend en parametre une callBack et ici l'option de marge au top
    //     const observer = new IntersectionObserver(handleObserver, {root: null, rootMargin: "20px", threshold: 0});
    //     if (endOfPage.current){
    //         observer.observe(endOfPage.current);
    //     }
    //   }, [handleObserver]);

    return (
    <>
        <Header active={"home"}/>
        <Container>
            <HomeTitle>Fil d'actualités</HomeTitle>
            <PublicationBloc type={"add"}/>
            {publications.map((publication,i)=>(
                <PublicationBloc key={i} publication={publication} type={"show"}/>
            ))}
            {/* {isLoading ?
            <h1>Loading</h1>
            :
            <>
            <PublicationBloc type={"add"}/>
                {data[0] && data[0].publicationToReturn.map((publication)=>(
                    <PublicationBloc key={publication._id} publication={publication} type={"show"}/>
                ))}
            </>} */}
            
        </Container>
        
    </>
    )
}

export default Home

//