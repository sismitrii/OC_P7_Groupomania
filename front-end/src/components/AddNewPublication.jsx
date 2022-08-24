/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import { useState, useContext, useEffect } from "react"
import { AppContext, ConnectionContext} from "../utils/context"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane} from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"

import TextInput from "./TextInput"
import PostButton from "./PostButton"
import {fetchGet, fetchPostOrPut} from "../utils/function/function"
import PictureBloc from "./PictureBloc"

/*====================================================*/
/* --------------------- Style ----------------------*/
/*====================================================*/

const StyledForm = styled.form`
    width: 100%;
    ${(props)=> props.type === "comment" ? "display: flex;" : ""}
    padding: ${(props)=> props.type === "comment" ? "10px 15px" : "10px 25px"};
`

const BottomBloc = styled.div`
    display: flex;
    flex-direction: ${(props)=> props.direction};
    justify-content: space-between;
    ${(props)=> props.type === "comment" ? "" : "align-items: center;"}
`

/*====================================================*/
/* ----------------------- Main ----------------------*/
/*====================================================*/

function AddNewPublication(props){
    const [image, setImage] = useState(null)
    const [publicationData, setPublicationData] = useState({})
    const {dataConnection} = useContext(ConnectionContext);
    const {publications, setPublications, profilPublications, setProfilPublications, setModifIsOpen} = useContext(AppContext);
    const [value, setValue] = useState("")

    const type = props.type;

    let modificationData = {};

    useEffect(()=>{
        if(props.imageUrl){
            setImage(props.imageUrl);
            const formData = new FormData();
            formData.append('image', props.imageUrl);
            modificationData.image = formData;
        }
        if(props.value){
            modificationData.content = props.value
            setValue(props.value);
        }
        setPublicationData(modificationData);
    },[props.imageUrl, props.value])


    
    const inputValue = {
        publication: {
            name: "share",
            placeholder: "Que souhaitez-vous partagez ?",
            url: "",
            postButton: "Poster"
        },
        comment: {
            name:"comment",
            placeholder: "Commentez cette publication",
            url: `/${props.publicationId}/comment`,
            setRef: props.setRef,
            postButton: <FontAwesomeIcon icon={faPaperPlane} />
        },
        modification: {
            name: "modification",
            placeholder: "Que souhaitez-vous partagez ?",
            url: `/${props.publicationId}`,
            postButton: "Modifier"
        }
    }

    async function handleChangePicture(e){
        if (e.target.files[0]){
            setImage(URL.createObjectURL(e.target.files[0])); 
            
            const formData = new FormData();
            formData.append('image', e.target.files[0]);
            await setPublicationData({...publicationData, image: formData});
        }
    }

    async function handleChangeText(text){
        await setValue(text);
        await setPublicationData({...publicationData, content: text})
    }

    async function handlePost(e){
        e.preventDefault();
        if (publicationData !== {}){ 
            if (publicationData.image && publicationData.content ){ 
                publicationData.image.append('content', publicationData.content);
                delete publicationData.content;
            }

            const method = type === "modification" ? "PUT" : "POST";
            const answer = await fetchPostOrPut(method, publicationData,`http://localhost:3000/api/publication${inputValue[type].url}`, dataConnection )
            console.log(answer)
            if (type === "publication"){
                const newPubli = await fetchGet(`http://localhost:3000/api/publication/one/${answer.id}`)
                setPublications((prev)=> [newPubli.publication, ...prev])
                setProfilPublications((prev)=>[newPubli.publication, ...prev])
            } else if (type === "comment"){
                props.setComments((prev)=>[...prev, {_id: answer.commentId, content: publicationData.content, author: dataConnection.userId}]);
            } else if (type === "modification"){
                const updatePubli = await fetchGet(`http://localhost:3000/api/publication/one/${props.publicationId}`)
                const rank = publications.map((publication)=> publication._id).indexOf(props.publicationId)
                publications[rank] = updatePubli.publication
                profilPublications[rank] = updatePubli.publication
                //const publicationsModifed = publications;
                //publicationsModifed[rank] = updatePubli.publication
                //setPublications(publicationsModifed);
                props.setIsOpenModPubliBloc(false);
                setModifIsOpen(false);
            }
            setValue(""); 
            await setImage(null);
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
                    <PictureBloc image={image} type={type} handleChangePicture={handleChangePicture}/>
                }
                <PostButton 
                    postMethod={handlePost} 
                    type={type} 
                    content={inputValue[type].postButton} />
            </BottomBloc>
        </StyledForm>
    )
}

export default AddNewPublication