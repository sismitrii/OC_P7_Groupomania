/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import styled from "styled-components"
import { useContext } from "react"
import { AppContext, ConnectionContext, SettingsContext } from "../utils/context"

import AutosizedTextArea from "./AutosizedTextArea"
import PostButton from "./PostButton"

import colors from "../utils/styles/colors"
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

    &:focus {
        outline: none;
        box-shadow: 0px 0px 0px 1px ${colors.primary};
    }
`

/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/
function AccordionItemMultipleField(props){
    const {parameters,informations} = useContext(AppContext)
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
        informations.forEach((information)=>{
            toChange[information] = userData[information]
        })
        console.log(await fetchPostOrPut("PUT", toChange, props.urlUpdate, dataConnection));
        // mettre un texte en bas L'utilisateur à été modifié
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