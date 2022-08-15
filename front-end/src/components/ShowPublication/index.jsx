/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import { faEllipsis, faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"

import ProfilPicture from '../../assets/photo_ident.png'
import PublicationImg from "../../assets/Flo_Suki.jpg"
import TextInput from "../TextInput"
import PostButton from "../PostButton"

import ProfilImg from "../ProfilImg"
import colors from "../../utils/styles/colors"




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

    h2 {
        font-size: 18px;
        font-weight: 500;
    }

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
        display: flex;
        align-items: center;

        p{
            margin-left: 10px;
            color: ${colors.primary};
        }
    }
`

const StyledIcon = styled(FontAwesomeIcon)`
    font-size: 25px;
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

/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/

function ShowPublication(){

    function handleChangeText(value){
        console.log(value)
    }

    function handlePost(e){
        e.preventDefault();
    }

    return (
    <PublicationContainer>
        <TopContainer>
            <ProfilContainer>
                <ProfilImg size='medium' src={ProfilPicture} />
                <ProfilText>
                    <h2>Flo Guerin</h2>
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
            <div>
                <StyledIcon icon={faHeart} />
                <p>3</p>
            </div>
            <div>
                <StyledIcon icon={faComment} />
                <p>1</p>
            </div>
        </IconContainer>
        <CommentContainer>
            <CommentForm>
                <TextInput set={handleChangeText} input={{name: "comment", placeholder: "Commentez cette publication"}}/>
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
        
    </PublicationContainer>)
}

export default ShowPublication