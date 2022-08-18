/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/

import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import ProfilImg from '../ProfilImg'
import { Link } from 'react-router-dom'
import useFetch from '../../utils/hooks'
import Deleted from '../../assets/Deleted.jpg'

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
    width: 100%;
    min-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FFF;
    margin-left: 10px;
    border-radius: 5px;
    padding: 5px 10px;

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

    const {data} = useFetch(`http://localhost:3000/api/user/${props.comment.author}`)


    return(
    <>
        {data.user &&
            <BottomComment>
            <ProfilImg size='small' src={data.user.profilImgUrl ? data.user.profilImgUrl : Deleted } /> 
                <Comment>
                    <p>
                        {data.user &&
                            <StyledLink to={`/profils/${props.comment.author}`}>{data.user.username} </StyledLink>
                        }
                        {props.comment.content}
                        </p>
                    <FontAwesomeIcon icon={faEllipsis} />
                </Comment>
            </BottomComment>
        }
    </>
    )
}

export default CommentBloc