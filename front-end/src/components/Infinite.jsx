/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import styled, {keyframes} from "styled-components"
import { useContext, useState } from "react"
import { AppContext } from "../utils/context"

import InfiniteScroll from "react-infinite-scroll-component"
import Bloc from "./Bloc"

import { fetchGet } from "../utils/function/function"
import colors from "../utils/styles/colors"
/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/
const animationLoader = keyframes`
0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const Loader = styled.div`
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
/* ---------------------- Main -----------------------*/
/*====================================================*/
function Infinite(){
    const {publications, setPublications} = useContext(AppContext)

    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(5);
    
    /*=== Fetch 5 more publications and set tif they are more publi for infinite scroll ===*/ 
    const loadMorePublication = async() => {
        const totalLength = await fetchGet(`http://localhost:3000/api/publication/length`)

        if(publications.length >= totalLength.publicationLength){
            setHasMore(false)
        }
        const dataToAdd = await fetchGet(`http://localhost:3000/api/publication/all/${offset}`)
        await setPublications((prevPublication) => [...prevPublication, ...dataToAdd.publicationToReturn])
        setOffset(offset + 5);
    }

    return(
        <InfiniteScroll 
        dataLength={publications.length} 
        next={loadMorePublication}
        hasMore={hasMore}
        loader={<Loader />}
        endMessage={<h3>Il n'y a plus d'autres publications</h3>}
    >
        { publications && publications.map((publication,i)=>(
            <Bloc 
                key={`${publication._id}-${i}`} 
                publication={publication} 
                type={"show"}
            />
        ))}
    </InfiniteScroll>
    )
}

export default Infinite