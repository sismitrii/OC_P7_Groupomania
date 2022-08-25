/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import { Link } from 'react-router-dom' 
import styled from "styled-components"

import { useContext, useEffect, useCallback, useRef } from "react"
import { ConnectionContext, PublicationContext } from '../utils/context'
import CommentBloc from "./CommentBloc"
import ProfilImg from "./ProfilImg"
import useFetch from "../utils/hooks"
import PublicationIcon from "./PublicationIcon"
import AddNew from "./AddNew"
import UpdateAndDelete from "./UpdateAndDelete"


/*====================================================*/
/* --------------------- Style ----------------------*/
/*====================================================*/

const PublicationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
`

const TopContainer = styled.div`
    width: 95%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const ProfilContainer = styled.div`
    display: flex;
    align-items: center;
`

const ProfilText = styled.div`
    margin-left: 15px;

    p{
        text-align:left;
        margin-top: 8px;
        font-size: 12px;
    }
`

const StyledText = styled.p`
    width: 90%;
    text-align: left;
    margin: 20px auto;
`

const ImgContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 250px;
    background-color: #FFF;
`

const StyledImg = styled.img`
    height: 250px;
    margin: 0 auto;
`

const IconContainer = styled.div`
    
    display: flex;
    justify-content: space-around;
    width: 80%;
    border-bottom: 1px solid black;
    padding: 10px 0px;
`

const CommentContainer = styled.div`
    width: 100%;
    margin: 10px 0px;
`



const StyledLink = styled(Link)`
    border-bottom: 1px solid transparent;
    font-size: 18px;
    font-weight: 500;
    
    transition: 250ms;

    &:hover {
        border-bottom: 1px solid black;
    }
`

/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/

function Publication(props){
    const commentInput = useRef(null);
    const {comments, setComments, publication, setPublication, setHeartActive} = useContext(PublicationContext)
    const {dataConnection} = useContext(ConnectionContext)

    useEffect(()=>{
        setPublication(props.publication);
        if(props.publication.userLiked.indexOf(dataConnection.userId)!== -1 ){
            setHeartActive(true)
            //console.log("je set heart Active parceque l'user est dans publication.userLiked")
        }
    },[props.publication])
    
    
    const {data} = useFetch(`http://localhost:3000/api/user/${props.publication.author}`)
    const fetchComment = useCallback(async()=>{
        try {
            const res = await fetch(`http://localhost:3000/api/publication/${props.publication._id}/comment`)
            const answer = await res.json()
            setComments(answer.comments)
        } catch (error) {
            console.error(error)
        }
    },[publication])

useEffect(()=>{
    fetchComment();
},[])

    const calcDate = useCallback(()=>{
        const timePassed = (Date.now() - (new Date(publication.createdAt).getTime()))/1000/60;

        if (timePassed < 60){ // less than an hour
            return `${Math.ceil(timePassed)}min`
        } else if (timePassed < (60*24)){ // less than an day
            return `${Math.floor(timePassed/60)}h`
        } else if (timePassed < (60*24*7)){ // less than a week
            return `${Math.floor(timePassed/(60*24))}j`
        } else {
            return `${Math.floor(timePassed/(60*24*7))}sem`
        }
    }, [publication])

    // with useCallBack function handleFocusComment is build only once at first render of page ?
    const handleFocusComment = useCallback(()=>{
        commentInput.current.focus();
    },[commentInput])

    return (<>
        {data.user &&
        <PublicationContainer >
            <TopContainer>
                <ProfilContainer>
                    <ProfilImg size='medium' src={data.user.profilImgUrl} />
                    <ProfilText>
                        <StyledLink to={`/profil/${publication.author}`}>{data.user.username}</StyledLink>
                        <p>Il y a {calcDate()} </p>
                    </ProfilText>
                </ProfilContainer>
                { data.user._id === dataConnection.userId &&
                    <UpdateAndDelete  
                        id={{publication: publication}}
                    />
                }
            </TopContainer>
            <StyledText>{publication.content}</StyledText>
            {publication.imageUrl &&
                <ImgContainer>
                    <StyledImg src={publication.imageUrl} alt="Image de la publication" />
                </ImgContainer>
            }
            <IconContainer>
                <PublicationIcon 
                    type={"heart"}  
                />
                <PublicationIcon 
                    type={"comment"} 
                    handleFocusComment={handleFocusComment}
                />
            </IconContainer>
            <CommentContainer>
                <AddNew 
                    type={"comment"} 
                    setRef={commentInput} 
                    publicationId={publication._id}
                    setComments={setComments}
                />
                {comments && comments.map((comment,i)=>(
                    <CommentBloc 
                        key={`${comment._id}`}  
                        comment={comment}
                    />
                ))}
            </CommentContainer>
        </PublicationContainer> 
        } 
    </>
    )
}


export default Publication

//Quand tu declenche un event d'un component et que tu n'as besoin qu'il re-render utiliser useCallBack ou useMemo
// Permet d'enregistrer une fonction et que celle-ci ne soit pas re-built à chaque re-render juste quand celà la concerne
// En plus si on change un elt dans la function (sans useCallback) qui fait qu'elle re-render et ba on peut avoir une boucle infini

//https://infinitypaul.medium.com/reactjs-useeffect-usecallback-simplified-91e69fb0e7a3