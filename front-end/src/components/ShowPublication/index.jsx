/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import { faEllipsis, faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons"
import { faHeart as fasHeart, faComment as fasComment } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from 'react-router-dom' 
import styled from "styled-components"

import ProfilPicture from '../../assets/photo_ident.png'
import PublicationImg from "../../assets/Flo_Suki.jpg"
import TextInput from "../TextInput"
import PostButton from "../PostButton"

import ProfilImg from "../ProfilImg"
import colors from "../../utils/styles/colors"
import { useCallback, useRef, useState } from "react"




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

    div {
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

const CommentContainer = styled.div`
    width: 100%;
    margin: 10px 0px;
`

const CommentForm = styled.form`
    width: 100%;
    display: flex;
`

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
    }
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

function ShowPublication(){
    const [heartActive, setHeartActive] = useState(false)

    const commentInput = useRef(null);

    function handleChangeText(value){
        console.log(value)
    }

    function handlePost(e){
        e.preventDefault();
    }

    function handleLike(){
        setHeartActive(!heartActive);
    }

    // with useCallBack function handleFocusComment is build only once at first render of page ?
    const handleFocusComment = useCallback(()=>{
        commentInput.current.focus();
    },[commentInput])

    return (
        <PublicationContainer>
            <TopContainer>
                <ProfilContainer>
                    <ProfilImg size='medium' src={ProfilPicture} />
                    <ProfilText>
                        <StyledLink to="/profil">Flo Guerin</StyledLink>
                        <p>Il y a 3h</p>
                    </ProfilText>
                </ProfilContainer>
                {/* Component a faire pour l'icon */}
                <FontAwesomeIcon icon={faEllipsis} />
            </TopContainer>
            <StyledText>L’endurance est l’une des choses les plus difficiles mais ceux qui endurent finissent par gagner</StyledText>
            <ImgContainer>
                <StyledImg src={PublicationImg} alt="Image de la publication" />
            </ImgContainer>
            <IconContainer>
                <div className={heartActive ? "active" : "" } onClick={()=> handleLike()}>
                    <StyledIcon className='visible' icon={faHeart} />
                    <StyledIconNotVisible className='not-visible' icon={fasHeart} />
                    <p>3</p>
                </div>
                <div onClick={()=> handleFocusComment()}>
                    <StyledIcon className='visible' icon={faComment} />
                    <StyledIconNotVisible className='not-visible' icon={fasComment} />
                    <p>1</p>
                </div>
            </IconContainer>
            <CommentContainer>
                <CommentForm>
                    <TextInput setRef={commentInput} set={handleChangeText} input={{name: "comment", placeholder: "Commentez cette publication"}}/>
                    <PostButton postMethod={handlePost} content={<FontAwesomeIcon icon={faPaperPlane} />} />
                </CommentForm>
                <BottomComment>
                <ProfilImg size='small' src={ProfilPicture} />
                    <Comment>
                        <p>Courage pour ce projet mec!</p>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </Comment>
                </BottomComment>
            </CommentContainer>
        </PublicationContainer> 
    )
}

export default ShowPublication

//Quand tu declenche un event d'un component et que tu n'as besoin qu'il re-render utiliser useCallBack ou useMemo
// Permet d'enregistrer une fonction et que celle-ci ne soit pas re-built à chaque re-render juste quand celà la concerne
// En plus si on change un elt dans la function (sans useCallback) qui fait qu'elle re-render et ba on peut avoir une boucle infini

//https://infinitypaul.medium.com/reactjs-useeffect-usecallback-simplified-91e69fb0e7a3