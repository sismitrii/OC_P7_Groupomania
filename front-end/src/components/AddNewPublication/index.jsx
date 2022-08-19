/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import { useState, useContext, useEffect } from "react"
import { ConnectionContext} from "../../utils/context"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus, faEdit} from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"

import TextInput from "../TextInput"
import PostButton from "../PostButton"
import fetchGet from "../../utils/function/function"

/*====================================================*/
/* --------------------- Style ----------------------*/
/*====================================================*/

const StyledForm = styled.form`
    width: 100%;
    ${(props)=> props.type === "comment" ? "display: flex;" : ""}
    padding: 10px 25px;
`

const BottomBloc = styled.div`
    display: flex;
    flex-direction: ${(props)=> props.direction};
    justify-content: space-between;
    ${(props)=> props.type === "comment" ? "" : "align-items: center;"}
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
    width: 100%;
    height: 100%;
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
    opacity: 0.6;
`

const IconEdit = styled(FontAwesomeIcon)`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 40px;
`

/*====================================================*/
/* ------------------ Main Function ------------------*/
/*====================================================*/

function AddNewPublication(props){
    const [image, setImage] = useState(null)
    const [publicationData, setPublicationData] = useState({})
    const {dataConnection} = useContext(ConnectionContext);
    const [value, setValue] = useState("")

    const type = props.type;

    let modificationData = {};

    // ONLY FOR MODIFICATION
    useEffect(()=>{
        if(props.imageUrl){
            const formData = new FormData();
            formData.append('image', props.imageUrl);
            modificationData.image = formData;
        }
        if(props.value){
            modificationData.content = props.value
        }
        setPublicationData(modificationData);
    },[props.imageUrl, props.value])

    // ONLY FOR MODIFICATION
    useEffect(()=>{
        if(props.imageUrl){
            setImage(props.imageUrl);
        }
    },[props.imageUrl])

    useEffect(()=>{
        if (props.value){
            setValue(props.value);
        }
    },[props.value])

    const inputValue = {
        publication: {
            name: "share",
            placeholder: "Que souhaitez-vous partagez ?",
            url: ""
        },
        comment: {
            name:"comment",
            placeholder: "Commentez cette publication",
            url: `/${props.publicationId}/comment`,
            setRef: props.setRef
        },
        modification: {
            name: "modification",
            placeholder: "Que souhaitez-vous partagez ?",
            url: `/${props.publicationId}`,
            value: props.value
        }
    }

    // on renvoit dans tout les cas publication, comment ou modification une value
    // Pour publication et comment c'est au début un champs vide 
    // Pour modification c'est au debut la valeur de la publication
    // et dans tout les cas ensuite c'est la valeur de l'input

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

    function handleChangeText(text){
        setValue(text);
        setPublicationData({...publicationData, content: text})
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
                const method = type === "modification" ? "PUT" : "POST";
                const header = publicationData.image ? {
                    'Accept': '/',
                    'Authorization': bearer
                } :
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': bearer
                }

                const dataToPost = publicationData.image ? publicationData.image : JSON.stringify(publicationData)
                let res = await fetch(`http://localhost:3000/api/publication${inputValue[type].url}`, {
                    method: method,
                    headers: header,
                    body: dataToPost
                })
                    let answer = await res.json()
                    console.log(answer);
                    if (type === "publication"){
                        const newPubli = await fetchGet(`http://localhost:3000/api/publication/one/${answer.id}`)
                        props.setPublications((prev)=> [newPubli.publication, ...prev])
                    } else if (type === "comment"){
                        props.setComments((prev)=>[...prev, {content: publicationData.content, author: dataConnection.userId}]);
                    } else if (type === "modification"){
                        props.setIsOpenModificationBloc(false);
                    }
                    setValue("");  
            } catch(err) {
                console.log(err);
            }
        }
    }

    return (
        <StyledForm type={type}>
            <TextInput 
                set={handleChangeText} 
                input={inputValue[type]}
                value={value}
            />
            <BottomBloc type={props.type} direction={image === null ? "row" : "column"}>
                {(props.type === "publication" || props.type === "modification") && 
                    
                    <PictureBloc>
                        {image === null ? 
                            <StyledLabel htmlFor={type === "publication" ? "addPicture" : "modificationAddPicture"} >
                                <StyledIcon icon={faCirclePlus} />
                                <StyledText >Ajouter une photo</StyledText>
                            </StyledLabel>
                        :
                        <>
                            <StyledImg src={image} alt="Image Publiée" />
                            <IconEdit icon={faEdit} />
                        </>
                        }
                        <StyledInput 
                            type="file" 
                            id={type === "publication" ? "addPicture" : "modificationAddPicture"} 
                            accept="image/png, image/jpeg, image/jpg" 
                            onChange={(e)=>handleChangePicture(e)} 
                        />
                    </PictureBloc>
                }
                <PostButton postMethod={handlePost} type={type} />
            </BottomBloc>
        </StyledForm>
    )
}

export default AddNewPublication