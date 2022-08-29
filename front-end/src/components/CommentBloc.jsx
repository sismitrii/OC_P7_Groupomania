/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/

import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ConnectionContext } from '../utils/context'
import ProfilImg from './ProfilImg'
import UpdateAndDelete from './UpdateAndDelete'

import Deleted from '../assets/Deleted.jpg'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { fetchGet } from '../utils/function/function'
import { useState } from 'react'

/*====================================================*/
/* ---------------------- Style ----------------------*/
/*====================================================*/

const BottomComment = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 10px;
`

const Comment = styled.div`
    position: relative;
    width: 100%;
    min-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FFF;
    margin-left: 10px;
    border-radius: 5px;
    padding: 5px 10px;
    text-align: left;

    p {
        width: 95%;
        font-size: 12px;
    }

    span {}
`

const StyledLink = styled(Link)`
    display: inline;
    font-weight: 600;
    margin-right: 5px;

    &:hover {
        text-decoration: underline;
    }
`
/*====================================================*/
/* ----------------------- Main ----------------------*/
/*====================================================*/

function CommentBloc(props){
    const {dataConnection} = useContext(ConnectionContext)
    const [author, setAuthor] = useState({})

    const getAuthor = useCallback(async()=>{
        const answer = await fetchGet(`http://localhost:3000/api/user/${props.comment.author}`)
        if (answer.user){
            await setAuthor(answer.user)
        } else {
            console.log(`L'auteur du commentaire "${props.comment.content}" n'existe plus`);
            setAuthor({})
        }
    },[props.comment])

    useEffect(()=>{
        getAuthor();
    },[getAuthor])

    return(
    <>
            <BottomComment>
            <ProfilImg 
                size='small' 
                src={author.profilImgUrl ? author.profilImgUrl : Deleted } 
            /> 
            <Comment>
                <p>
                    {author.username &&
                        <StyledLink to={`/profil/${props.comment.author}`}>{author.username} </StyledLink>
                    }
                    {props.comment.content}
                </p>
                {(props.comment.author === dataConnection.userId || (dataConnection.role && dataConnection.role.includes('ROLE_ADMIN'))) && 
                    <UpdateAndDelete  
                        comment={props.comment}
                    />}
                </Comment>
            </BottomComment>
    </>
    )
}

export default CommentBloc