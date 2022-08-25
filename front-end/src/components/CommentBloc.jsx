/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/

import styled from 'styled-components'
import ProfilImg from './ProfilImg'
import { Link } from 'react-router-dom'
import useFetch from '../utils/hooks'
import Deleted from '../assets/Deleted.jpg'
import UpdateAndDelete from './UpdateAndDelete'
import { useContext } from 'react'
import { ConnectionContext } from '../utils/context'

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
    //const [commentDeleted, setCommentDeleted] = useState(false);
    const {dataConnection} = useContext(ConnectionContext)

    const {data} = useFetch(`http://localhost:3000/api/user/${props.comment.author}`)

    return(
    <>
        {data.user &&
            <BottomComment>
            <ProfilImg 
                size='small' 
                src={data.user.profilImgUrl ? data.user.profilImgUrl : Deleted } 
            /> 
            <Comment>
                <p>
                    {data.user &&
                        <StyledLink to={`/profil/${props.comment.author}`}>{data.user.username} </StyledLink>
                    }
                    {props.comment.content}
                </p>
                {(props.comment.author === dataConnection.userId || (dataConnection.role && dataConnection.role.includes('ROLE_ADMIN'))) && 
                    <UpdateAndDelete  
                        comment={props.comment}
                    />}
                </Comment>
            </BottomComment>
        }
    </>
    )
}

export default CommentBloc