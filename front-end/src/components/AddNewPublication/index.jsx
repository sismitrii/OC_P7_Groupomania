/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import { useState, useContext } from "react"
import { ConnectionContext } from "../../utils/context"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus} from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"

import TextInput from "../TextInput"
import PostButton from "../PostButton"

/*====================================================*/
/* --------------------- Style ----------------------*/
/*====================================================*/

const StyledForm = styled.form`
    width: 100%;
    ${(props)=> props.isComment ? "display: flex;" : ""}
    padding: 10px 25px;
`

const BottomBloc = styled.div`
    display: flex;
    flex-direction: ${(props)=> props.direction};
    justify-content: space-between;
    ${(props)=> props.isPublication ? "align-items: center;" : ""}
`

const PictureBloc = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`

const StyledIcon = styled(FontAwesomeIcon)`
    font-size: 20px;
    margin: 10px 20px;
`

const StyledText = styled.p`
    font-weight: 500;
`

const StyledInput = styled.input`
    position: absolute;
    left: 0;
    opacity: 0;
`
const StyledLabel = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    z-index: 1;
`
const StyledImg = styled.img`
    width: 280px;
    border-radius: 10px;
    margin: 10px 0;
`

/*====================================================*/
/* ------------------ Main Function ------------------*/
/*====================================================*/

function AddNewPublication(props){
    const [image, setImage] = useState(null)
    const [publicationData, setPublicationData] = useState({})
    const {dataConnection} = useContext(ConnectionContext);

    const inputValue = {
        publication: {
            name: "share",
            placeholder: "Que souhaitez-vous partagez ?",
            url: `http://localhost:3000/api/publication`
        },
        comment: {
            name:"comment",
            placeholder: "Commentez cette publication",
            url: `http://localhost:3000/api/publication/${props.publicationId}/comment`,
            setRef: props.setRef
        }
    }

    function handleChangePicture(e){
        if (e.target.files[0]){
            setImage(URL.createObjectURL(e.target.files[0])); 
            // voir si on pourrait pas utiliser useRef vu que re-render avec setPublicationData
            // https://developer.mozilla.org/fr/docs/Web/API/URL/createObjectURL
            
            const formData = new FormData();
            formData.append('image', e.target.files[0]);
            setPublicationData({...publicationData, image: formData});
        }
    }

    function handleChangeText(value){
        setPublicationData({...publicationData, content: value})
    }

    async function handlePost(e){
        e.preventDefault();
        if (publicationData !== {}){ 
            if (publicationData.image && publicationData.content){ 
                publicationData.image.append('content', publicationData.content);
                delete publicationData.content;
            }
            try {
                const bearer = "Bearer " + dataConnection.token
                const header = publicationData.image ? {
                    'Accept': '/',
                    'Authorization': bearer
                } :
                {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json',
                    'Authorization': bearer
                }

                const dataToPost = publicationData.image ? publicationData.image : JSON.stringify(publicationData)
                let res = await fetch(inputValue[type].url, {
                    method: "POST",
                    headers: header,
                    body: dataToPost
                })
                    await setPublicationData({})
                    await setImage(null)
                    document.getElementById(inputValue[type].name).value = ""; 
                    let answer = await res.json()
                    console.log(answer);
            } catch(err) {
                console.log(err);
            }
        }
    }

    const type = props.isComment ? "comment" : "publication";

    return (
        <StyledForm isComment={props.isComment}>
            <TextInput set={handleChangeText} input={inputValue[type]}/>
            <BottomBloc isPublication={props.isPublication} direction={image === null ? "row" : "column"}>
                {props.isPublication && 
                <PictureBloc>
                {image === null ?
                <> 
                    <StyledLabel htmlFor="addPicture" >
                        <StyledIcon icon={faCirclePlus} />
                        <StyledText >Ajouter une photo</StyledText>
                    </StyledLabel>
                    <StyledInput 
                        type="file" 
                        id="addPicture" 
                        accept="image/png, image/jpeg, image/jpg" 
                        onChange={(e)=>handleChangePicture(e)} 
                    />
                </>
                :
                    <StyledImg src={image} alt="Image Publiée" />
                }
            </PictureBloc>
                }
                <PostButton postMethod={handlePost} type={type} />
            </BottomBloc>
        </StyledForm>
    )
}

export default AddNewPublication