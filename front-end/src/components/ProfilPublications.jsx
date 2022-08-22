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
import { Loader } from "../pages/Home"
import { fetchGet } from "../utils/function/function"
import { useEffect } from "react"
/*====================================================*/
/* ---------------------- Style ----------------------*/
/*====================================================*/

const Container = styled.div`
    margin: 20px;

    & .infinite-scroll-component {
        margin:0 auto;
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
    const [hasMore, setHasMore] = useState(false)


    async function loadMorePublication() {

        const answer = await fetchGet(`http://localhost:3000/api/user/${profilId.id}/publications/${offset}`)
        setProfilPublications(answer.publications)
        setOffset(offset + 5)

        if(profilPublications.length < profil.publications.length){
            setHasMore(true)
        }
    }

    console.log(profilPublications);

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