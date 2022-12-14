/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import styled from "styled-components"
import { useContext, useEffect } from "react"
import { ConnectionContext, PublicationContext } from "../utils/context"

import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons"
import { faHeart as fasHeart, faComment as fasComment } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import colors from "../utils/styles/colors"
import { fetchPostOrPut } from "../utils/function/function"

/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/
const IconContainer = styled.button`
    position: relative;
    display: flex;
    align-items: center;
    border: none;
    transition: all 250ms ease-in-out;

    &:hover {
         .not-visible {
            opacity: 1;
        }
        .visible {
            background-clip: text;
            color: transparent;
        }
    }

    &.active {
        .not-visible {
            opacity: 1;
        }
    }

    p{
        margin-left: 10px;
        color: ${colors.primary};
    }
`

const StyledIcon = styled(FontAwesomeIcon)`
    font-size: 25px;
    curdor: pointer;

    transition: all 250ms ease-in-out;
`

const StyledIconNotVisible = styled(FontAwesomeIcon)`
    position: absolute;
    font-size: 25px;
    left: 0px;
    opacity: 0;
    color: ${colors.primary};
    cursor: pointer;
    transition: all 250ms ease-in-out;
`
/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/
function PublicationIcon(props){
    //const [heartActive, setHeartActive] = useState(false);
    const {dataConnection} = useContext(ConnectionContext);
    const {comments, publication, setPublication, heartActive, setHeartActive} = useContext(PublicationContext)

    // a chaque chaque fois que la publi va ??tre modifi?? il va check?? si l'user est dans les userLiked
    useEffect(()=>{
        if (publication.userLiked){
            if(publication.userLiked.indexOf(dataConnection.userId)!== -1 ){
                setHeartActive(true)
            } else {
                setHeartActive(false)
            }
        }
    },[publication, dataConnection, setHeartActive])

    async function handleLike(e){
        e.preventDefault()
        const like = heartActive ? -1 : 1;
        //like est coh??rent avec la v??ritable valeur de like en DB
        let userLikedMod = [...publication.userLiked];
        if (like > 0){
            userLikedMod.push(dataConnection.userId);
        } else {
            userLikedMod = userLikedMod.filter((userId)=> userId !== dataConnection.userId)
        }
        await setPublication({...publication, like: publication.like + like, userLiked: userLikedMod})

        const answer = await fetchPostOrPut("PUT",{like: like},`http://localhost:3000/api/publication/${publication._id}/like`,dataConnection )
        console.log(answer);
    }

    return (
    <>
    {props.type === 'heart' ? 
        <IconContainer className={heartActive ? "active" : "" } onClick={(e)=> handleLike(e)}>
            <StyledIcon className='visible' icon={faHeart} />
            <StyledIconNotVisible className='not-visible' icon={fasHeart} />
            <p>{publication.like}</p>
        </IconContainer>
    :
        <IconContainer onClick={(e)=> props.handleFocusComment(e)}>
            <StyledIcon className='visible' icon={faComment} />
            <StyledIconNotVisible className='not-visible' icon={fasComment} />
            <p>{comments && comments.length}</p>
        </IconContainer>
    }
    </>)
}

export default PublicationIcon