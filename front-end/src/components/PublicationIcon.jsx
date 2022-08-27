/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons"
import { faHeart as fasHeart, faComment as fasComment } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"
import { useContext } from "react"
import { ConnectionContext, PublicationContext } from "../utils/context"
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

    // useEffect(()=>{
    //     if(publication.userLiked.indexOf(dataConnection.userId)!== -1 ){
    //         setHeartActive(true)
    //     }
    // },[])

    async function handleLike(e){
        e.preventDefault()
        const like = publication.like ? -1 : 1 ;
        //like est cohérent avec la véritable valeur de like en DB
        let userLikedMod = [...publication.userLiked];
        if (like > 0){
            userLikedMod.push(dataConnection.userId);
        } else {
            userLikedMod = userLikedMod.filter((userId)=> userId !== dataConnection.userId)
        }
        await setPublication({...publication, like: publication.like + like, userLiked: userLikedMod})

        const answer = await fetchPostOrPut("PUT",{like: like},`http://localhost:3000/api/publication/${publication._id}/like`,dataConnection )
        console.log(answer);
        await setHeartActive(!heartActive);
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
            <p>{comments.length}</p>
        </IconContainer>
    }
    </>)
}

export default PublicationIcon