/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import styled from "styled-components"
import { useContext } from "react"
import { AppContext, ConnectionContext, SettingsContext } from "../utils/context"

import AutosizedTextArea from "./AutosizedTextArea"
import PostButton from "./PostButton"

import { fetchPostOrPut } from "../utils/function/function"

/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`
const Information = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;

    textarea {
        max-width: 300px;
        border: 1px solid #AAA;
        border-radius: 0;
    }
`
const StyledLabel = styled.label`
    min-width: 120px;
    font-size:12px
`
const StyledInput = styled.input`
    width: 100%;
    min-width: 150px;
    max-width: 300px;
    height: 25px;
    border: 1px solid #AAA;
    padding-left: 10px;
    margin-top: 2px;

    &[type="date"] {
        font-family: arial, sans-serif;
        font-size: 14px;
        background:#FFF;
        padding:5px;
        color : #888;
    }
`

/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/
function AccordionItemMultipleField(props){
    const {parameters,informations} = useContext(AppContext)
    const {userData, setUserData, setUpdatedMessage} = useContext(SettingsContext)
    const {dataConnection} = useContext(ConnectionContext)
    
    /*=== When user write in input it set the User Data===*/
    async function handleInformationChange(value, type){
        const toChange = {}
        toChange[type] = value;
        setUserData({...userData, ...toChange})
    }

    /*=== Request the update of user in DB and print a message to user ===*/
    async function handlePost(e){
        e.preventDefault() 
        const toChange ={}
        informations.forEach((information)=>{
            toChange[information] = userData[information]
        })
        console.log(await fetchPostOrPut("PUT", toChange, props.urlUpdate, dataConnection));
        setUpdatedMessage('Vos informations ont ??t?? mise ?? jour')
    }

    return(            
    <StyledForm>
        {informations && informations.map((information,i )=>(
        <Information key={`${information}-${i}`}>
            <StyledLabel htmlFor={`information__${information}`}>
                {parameters[information].sentence}
            </StyledLabel>
            { information === "biography" ? 
                <AutosizedTextArea
                    information={information} 
                    set={handleInformationChange} 
                    input={{name:  "information__biography" , placeholder: parameters[information].sentence}} 
                    value={userData[information] ? userData[information] : "" } />
            :
                <StyledInput 
                    forInformation
                    id={`information__${information}`} 
                    name={`information__${information}`} 
                    type={parameters[information].inputType} 
                    placeholder={parameters[information].sentence}
                    onChange={(e)=>handleInformationChange(e.target.value, information)}
                    value={userData[information] ? userData[information] : ""}
                />
            }
        </Information>
        ))}
        <PostButton content={"Appliquer"} postMethod={handlePost} />
    </StyledForm>)
}

export default AccordionItemMultipleField