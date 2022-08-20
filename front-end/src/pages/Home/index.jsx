/*====================================================*/
/* ------------------- Import ---------------------*/
/*====================================================*/
import { useContext, useState} from "react"
import styled, {keyframes} from "styled-components"

import Header from "../../components/Header"
import PublicationBloc from "../../components/PublicationBloc"
import colors from "../../utils/styles/colors"

import InfiniteScroll from 'react-infinite-scroll-component';
import fetchGet from "../../utils/function/function"
import { AppContext } from "../../utils/context"


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
    //const [publications, setPublications] = useState([])
    const {publications, setPublications} = useContext(AppContext)

    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);
    //console.log('render');

    const loadMorePublication = async() => {
        const totalLength = await fetchGet(`http://localhost:3000/api/publication/length`)

        if(publications.length >= totalLength.publicationLength){
            setHasMore(false)
        }
        try {
            //console.log("requete")
            const res = await fetch(`http://localhost:3000/api/publication/all/${offset}`)
            const dataToAdd = await res.json()
            await setPublications((prevPublication) => [...prevPublication, ...dataToAdd.publicationToReturn])
            setOffset(offset + 5);
        } catch (error) {
            console.error(error);
        }
    }
    if (!publications[0]){
        console.log(publications);
        loadMorePublication();
    }

    return (
    <>
        <Header active={"home"}/>
        <Container>
            <HomeTitle>Fil d'actualités</HomeTitle>
            <PublicationBloc 
                type={"add"}
            />
            <InfiniteScroll 
                dataLength={publications.length} 
                next={loadMorePublication}
                hasMore={hasMore}
                loader={<Loader />}
                endMessage={<h3>Il n'y a plus d'autres publications</h3>}
            >
                { publications && publications.map((publication,i)=>(
                    <PublicationBloc 
                        key={publication._id} 
                        publication={publication} 
                        type={"show"}
                    />
                ))}
            </InfiniteScroll>
        </Container>
        
    </>
    )
}

export default Home

//