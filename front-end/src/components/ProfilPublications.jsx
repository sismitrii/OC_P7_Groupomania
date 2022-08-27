/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import { useState } from "react"
import { useContext } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { AppContext, ConnectionContext } from "../utils/context"
import Bloc from "./Bloc"
import InfiniteScroll from "react-infinite-scroll-component"
import { Loader } from "./Infinite"
import { fetchGet } from "../utils/function/function"
import { useEffect } from "react"
/*====================================================*/
/* ---------------------- Style ----------------------*/
/*====================================================*/

const Container = styled.div`
    margin: 10px;

    & .infinite-scroll-component__outerdiv {
        text-align : center;
    }

`

/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/

function ProfilPublication(){
    const {dataConnection} = useContext(ConnectionContext)
    const profilId = useParams();
    const {profilPublications, setProfilPublications, profil} = useContext(AppContext)
    const [offset, setOffset] = useState(5)
    const [hasMore, setHasMore] = useState(true)

useEffect(()=>{
    if (profil.publications){
        // reset old value of precedent profil if has more was at false
        setHasMore(true)
        if (profil.publications.length <=5){
            setHasMore(false);
        }
    }
},[profil, setProfilPublications])


    async function loadMorePublication() {
        const answer = await fetchGet(`http://localhost:3000/api/user/${profilId.id}/publications/${offset}`)
        setProfilPublications((prev)=> [...prev, ...answer.publications])
        setOffset(offset + 5)
        
        if (profilPublications){
            if(profilPublications.length >= profil.publications.length){
                setHasMore(false)
            }
        }
    }

    return(
    <Container>
        <h3>Publication</h3>
        {dataConnection.userId === profilId.id && <Bloc isInside type={"add"}/>} 
        <InfiniteScroll 
            dataLength={profilPublications.length} 
            next={loadMorePublication}
            hasMore={hasMore}
            loader={<Loader />}
            endMessage={<h4>Il n'y a plus d'autres publications</h4>}
        >
        {profilPublications && profilPublications.map((publication,i)=>(
            <Bloc 
                isInside
                key={`${publication._id}-${i}`} 
                publication={publication} 
                type={"show"}
            />
        ))}
        </InfiniteScroll>
    </Container> 
    )
}

export default ProfilPublication