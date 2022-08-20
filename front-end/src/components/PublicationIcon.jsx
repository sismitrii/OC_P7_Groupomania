/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons"
import { faHeart as fasHeart, faComment as fasComment } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"
import { useEffect, useState, useContext } from "react"
import { ConnectionContext, PublicationContext } from "../utils/context"
import colors from "../utils/styles/colors"

/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/
const IconContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
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
    const [heartActive, setHeartActive] = useState(false);
    const {dataConnection} = useContext(ConnectionContext);
    const {comments} = useContext(PublicationContext)

    useEffect(()=>{
        if(props.publication.userLiked.indexOf(dataConnection.userId)!== -1 ){
            setHeartActive(true)
        }
    }, [])

    async function handleLike(){
        const like = heartActive ? -1 : 1 ;
        props.publication.like += like;
        const bearer = 'Bearer ' + dataConnection.token;
        try {
            const res = await fetch(`http://localhost:3000/api/publication/${props.publication._id}/like`, {
            method: 'PUT',
            headers: {
                'Accept': '/',
                'Content-type': 'application/json',
                'Authorization': bearer
            },
            body: JSON.stringify({like: like})
            })
            const answer = await res.json();
            console.log(answer);
            await setHeartActive(!heartActive);
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
    <>
    {props.type === 'heart' ? 
        <IconContainer className={heartActive ? "active" : "" } onClick={()=> handleLike()}>
            <StyledIcon className='visible' icon={faHeart} />
            <StyledIconNotVisible className='not-visible' icon={fasHeart} />
            <p>{props.publication.like}</p>
        </IconContainer>
    :
        <IconContainer onClick={()=> props.handleFocusComment()}>
            <StyledIcon className='visible' icon={faComment} />
            <StyledIconNotVisible className='not-visible' icon={fasComment} />
            <p>{comments.length}</p>
        </IconContainer>
    }
    </>)
}

export default PublicationIcon