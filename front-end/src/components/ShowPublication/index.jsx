/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import { faEllipsis } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from 'react-router-dom' 
import styled from "styled-components"

import { useEffect, useState } from "react"
import CommentBloc from "../CommentBloc"
import ProfilImg from "../ProfilImg"
import { useCallback, useRef } from "react"
import useFetch from "../../utils/hooks"
import PublicationIcon from "../PublicationIcon"
import AddNewPublication from "../AddNewPublication"


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
        margin-top: 8px;
        font-size: 12px;
    }
`

const StyledText = styled.p`
    width: 90%;
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
    border-bottom : 1px solid black;
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
    
    transition : 250ms;

    &:hover {
        border-bottom: 1px solid black;
    }
`

/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/

function ShowPublication(props){
    const commentInput = useRef(null);
    const publication = props.publication;

    const calcDate = useCallback(()=>{
        const timePassed = (Date.now() - (new Date(publication.createdAt).getTime()))/1000/60;
        if (timePassed < 60){
            return `${Math.ceil(timePassed)}min`
        } else {
            return `${Math.round(timePassed/60)}h`
        }
    }, [publication])
    
    const [comments, setComments] = useState([])
    
    const {data, isLoading, error } = useFetch(`http://localhost:3000/api/user/${publication.author}`)

    const fetchComment = useCallback(async()=>{
        try {
            const res = await fetch(`http://localhost:3000/api/publication/${publication._id}/comment`)
            const answer = await res.json()
            setComments(answer)
        } catch (error) {
        }
    },[])

    useEffect(()=>{
        fetchComment();
    },[])


    // TO DO requete de l'author
    // requete de l'image de l'utilisateur
    // requete des commentaires
    // calcul du temps de création
    
    //Probablement mieux
    let user;
    if (data){
        user = data.user;
    }

    // with useCallBack function handleFocusComment is build only once at first render of page ?
    const handleFocusComment = useCallback(()=>{
        commentInput.current.focus();
    },[commentInput])

    return (<>
        {user &&
        <PublicationContainer>
            <TopContainer>
                <ProfilContainer>
                    <ProfilImg size='medium' src={user.profilImgUrl} />
                    <ProfilText>
                        <StyledLink to="/profil">{user.username}</StyledLink>
                        <p>Il y a {calcDate()} </p>
                    </ProfilText>
                </ProfilContainer>
                {/* Component a faire pour l'icon */}
                <FontAwesomeIcon icon={faEllipsis} />
            </TopContainer>
            <StyledText>{publication.content}</StyledText>
            {publication.imageUrl &&
            <ImgContainer>
                <StyledImg src={publication.imageUrl} alt="Image de la publication" />
            </ImgContainer>
            }
            <IconContainer>
                <PublicationIcon type={"heart"} publication={publication} />
                <PublicationIcon type={"comment"} publication={publication} handleFocusComment={handleFocusComment}/>
            </IconContainer>
            <CommentContainer>
                <AddNewPublication isComment setRef={commentInput} publicationId={publication._id}/>
                {/* <BottomComment>
                <ProfilImg size='small' src={ProfilPicture} />
                    <Comment>
                        <p>Courage pour ce projet mec!</p>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </Comment>
                </BottomComment> */}
                {comments && comments.comments.map((comment)=>(
                    <CommentBloc key={comment._id} comment={comment}/>
                ))}
            </CommentContainer>
        </PublicationContainer> 
        } 
    </>
    )
}

export default ShowPublication

//Quand tu declenche un event d'un component et que tu n'as besoin qu'il re-render utiliser useCallBack ou useMemo
// Permet d'enregistrer une fonction et que celle-ci ne soit pas re-built à chaque re-render juste quand celà la concerne
// En plus si on change un elt dans la function (sans useCallback) qui fait qu'elle re-render et ba on peut avoir une boucle infini

//https://infinitypaul.medium.com/reactjs-useeffect-usecallback-simplified-91e69fb0e7a3