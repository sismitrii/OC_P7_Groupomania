/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import styled from "styled-components";
import { useContext, useState } from "react";
import { ConnectionContext, SettingsContext } from "../utils/context";

import PictureBloc from "./PictureBloc";
import PostButton from "./PostButton";

import { fetchPostOrPut } from "../utils/function/function";

/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`
/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
function AccordionItemPicture(props){
    const {userData, setUserData} = useContext(SettingsContext)
    const {dataConnection} = useContext(ConnectionContext)
    const [image, setImage] = useState("");

    async function handlePostPicture(){
        const formData = new FormData();
        formData.append('image', image);
        console.log(await fetchPostOrPut("PUT", {image: formData}, props.urlUpdate, dataConnection));
    }

    return(
    <Container>
        <PictureBloc 
            heightLimited 
            image={userData.profilImgUrl} 
            handleChangePicture={(e)=>{
                if (e.target.files[0]){
                    setUserData({...userData, profilImgUrl: URL.createObjectURL(e.target.files[0])});
                    setImage(e.target.files[0])
                }
            }}
        />
        <PostButton content={"Appliquer"} postMethod={handlePostPicture} />
    </Container>
    )
}

export default AccordionItemPicture