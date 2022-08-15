/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import { useState, useContext } from "react"
import { ConnectionContext } from "../../utils/context"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"

import TextInput from "../TextInput"
import PostButton from "../PostButton"

/*====================================================*/
/* --------------------- Style ----------------------*/
/*====================================================*/

const StyledForm = styled.form`
    width: 100%;
    padding: 10px 25px;
`

const BottomBloc = styled.div`
    display: flex;
    flex-direction: ${(props)=> props.direction};
    justify-content: space-between;
    align-items: center;
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
    z-index: 1000;
`
const StyledImg = styled.img`
    width: 280px;
    border-radius: 10px;
    margin: 10px 0;
`

/*====================================================*/
/* ------------------ Main Function ------------------*/
/*====================================================*/

function AddNewPublication(){
    const [image, setImage] = useState(null)
    const [publicationData, setPublicationData] = useState({})
    const {dataConnection, setDataConnection} = useContext(ConnectionContext);

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
                const dataToPost = publicationData.image ? publicationData.image : JSON.stringify(publicationData)
                let res = await fetch('http://localhost:3000/api/publication', {
                    method: "POST",
                    headers: {
                        'Accept': '/',
                        'Authorization': bearer
                    },
                    body: dataToPost
                })
                    await setPublicationData({})
                    await setImage(null)
                    document.getElementById('share').value = "";
                    let answer = await res.json()
                    console.log(answer);
            } catch(err) {
                console.log(err);
            }
        }
    }

    return (
        <StyledForm>
            <TextInput set={handleChangeText} input={{name: "share", placeholder: "Que souhaitez-vous partagez ?"}}/>
            <BottomBloc direction={image === null ? "row" : "column"}>
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
                <PostButton postMethod={handlePost} content={"Poster"} />
            </BottomBloc>
        </StyledForm>
    )
}

export default AddNewPublication