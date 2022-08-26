/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/

import styled from "styled-components"
import { useContext } from "react"
import { AppContext, ConnectionContext, SettingsContext } from "../utils/context"

import PostButton from "./PostButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen } from "@fortawesome/free-solid-svg-icons"

import colors from "../utils/styles/colors"
import { fetchPostOrPut } from "../utils/function/function"

/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/
const Container = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`

const StyledInput = styled.input`
    flex:1;
    height: 25px;
    border: 1px solid #AAA;
    padding-left: 10px;
    margin-top: 2px;
`

/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/
function AccordionItemOneField(props){
    const {userData, setUserData} = useContext(SettingsContext)
    const {dataConnection} = useContext(ConnectionContext)

    async function handleInformationChange(value, type){
        const toChange = {}
        toChange[type] = value;
        setUserData({...userData, ...toChange})
    }

    async function handlePost(e){
        e.preventDefault() 
        const toChange ={}
        toChange[props.type] = userData[props.type];
        console.log(await fetchPostOrPut("PUT", toChange, props.urlUpdate, dataConnection));
        // mettre un texte en bas L'utilisateur à été modifié
    }

    return(
    <Container>
        <StyledInput 
            type="text" 
            name={props.type}
            id={props.type}
            placeholder={props.data} 
            value={props.type === 'username' ? userData.username : userData.department}
            onChange={(e)=> handleInformationChange(e.target.value, props.type)}
        />
        <PostButton 
            type="editProfil" 
            content={<FontAwesomeIcon icon={faPen} />}
            postMethod={handlePost}
        />
    </Container>
    )
}

export default AccordionItemOneField