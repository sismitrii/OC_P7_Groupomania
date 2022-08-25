/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/

import { faAngleUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"
import PostButton from "./PostButton"
import PictureBloc from "./PictureBloc"
import { useContext } from "react"
import { AppContext, ConnectionContext, SettingsContext } from "../utils/context"
import PasswordBloc from "./PasswordBloc"
import { useState } from "react"
import { fetchPostOrPut } from "../utils/function/function"
import AutosizedTextArea from "./AutosizedTextArea"
import { useNavigate } from "react-router-dom"

/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/
const Container = styled.div`
    position: relative;
    border-radius:${(props)=> props.isMobile ? "" :"5px"};
    background-color: ${(props)=>props.isMobile ? "#EDEDED" : "#FFF"}; 
    margin-bottom: ${(props)=> props.isActive ? "10px" : "2px"};
    box-shadow: 0px 0px 5px #AAA;
`

const StyledTitle = styled.button`
    width: 100%;
    border-radius: ${(props)=> props.isMobile ? "" : "5px"};
    padding: 10px 20px;
    cursor: pointer;
    border: none;
    text-align: left;
    font-size: 12px;
    ${(props)=> props.isMobile ? "" : "background-color: #FFF"};

    h2 {
        font-family: 'Raleway';
        font-weight: 600;
        font-size: 14px;
    }
`
const ContentContainer = styled.div`
    padding: 0px 20px;
    height: auto;
    max-height: ${(props)=> props.isActive? "300px" : "0px"};
    overflow: hidden;

    transition: max-height 0.3s ease-out;
`
const StyledInput = styled.input`
    ${(props)=>props.forInformation ? "width: 100%; min-width: 150px;max-width: 300px;": "flex:1;"}
    height: 25px;
    border: 1px solid #AAA;
    outline: none;
    padding-left: 10px;

    &[type="date"] {
        font-family: arial, sans-serif;
        font-size: 14px;
        background:#FFF;
        padding:5px;
        color : #888;
    }
`
const StyledIcon = styled(FontAwesomeIcon)`
    position: absolute;
    right: 20px;
    top: 7px;
    color : #000;
    transform: rotate(${(props)=> props.active === "true" ? "-180deg" : "0deg"});

    transition: transform 0.3s ease-in-out;
`
const GeneralContainer = styled.div`
    display: flex;
    flex-direction: ${(props)=> props.column ? "column" : "row"};
    justify-content: center;
    ${(props)=> props.column && "align-items: center;"}
    margin-bottom: 20px;
    
    p{
        font-size: 14px;
        text-align: center;
        margin-bottom: 10px;
    }

    div {
        display: flex;
        justify-content: space-around;
        width: 300px;
    }
`
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
const PasswordContainer = styled.div`
    margin: 0px 20px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    > button {
        margin: 20px 0 10px;
    }

    input {
        border-radius: 0px;
        border: 1px solid #AAA;
    }

    p{
        color: red;
    }
`
const StyledButton = styled.button`
    min-width : 90px;
    background-color: ${(props)=> props.cancel ? "#AAA" : "red"};
    color: #FFF;
    border: none;
    padding: 5px;
    border-radius: 2px;
    margin-bottom: 10px;
    cursor: pointer;
`
/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/
function AccordionItem(props){
    const {dataConnection} = useContext(ConnectionContext)
    const {parameters, isMobile} = useContext(AppContext)
    const {userData, setUserData} = useContext(SettingsContext)
    const [confirmation, setConfirmation] = useState(false)
    const [image, setImage] = useState("");
    const initialPassword = {passwordIsOK: false, password: "", confirmPassword: "", message:""}
    const [passwordValue, setPasswordValue]= useState(initialPassword)
    const navigate = useNavigate();
    
    const urlUpdate = `http://localhost:3000/api/user/${dataConnection.userId}`

    const informations = Object.keys(parameters);
    informations.shift();
    // remove email don't want to be possible to modified

    async function handlePostInformations(e, option){
        e.preventDefault() 
        const toChange ={}
        if (option === "informations"){
            informations.forEach((information)=>{
                toChange[information] = userData[information]
            })
        } else {
            toChange[props.type] = userData[props.type];
        }
        console.log(await fetchPostOrPut("PUT", toChange, urlUpdate, dataConnection));
        // mettre un texte en bas L'utilisateur à été modifié
    }

    async function handlePostPicture(){
        const formData = new FormData();
        formData.append('image', image);
        console.log(await fetchPostOrPut("PUT", {image: formData}, urlUpdate, dataConnection));
    }

    async function handleInformationChange(value, type){
        const toChange = {}
        toChange[type] = value;
        setUserData({...userData, ...toChange})
    }

    async function handleLogin(e){
        e.preventDefault();
        const answer = await fetchPostOrPut("POST", {email: userData.email, password: passwordValue.password},'http://localhost:3000/api/auth/login', dataConnection)
        if (answer.token){
            setPasswordValue({...passwordValue, password: "", passwordIsOK: true, message:""}) 
        } else {
            setPasswordValue({...passwordValue, message: "Mot de passe Incorrect"})
        }
    }

    async function handleResetPassword(e){
        e.preventDefault();
        if (passwordValue.password === passwordValue.confirmPassword){
            console.log(passwordValue);
            console.log(await fetchPostOrPut("PUT", {password: passwordValue.password}, 'http://localhost:3000/api/auth/change_password', dataConnection))
            setPasswordValue(initialPassword);
            // message qui dit pendant Xs que le mot de passe a été mis à jour
        } else {
            setPasswordValue({...passwordValue, message: "Veuillez rentrez deux mot de passes identique"})
        }
    }

    async function handleDelete(e){
        e.preventDefault();
        try {
            const bearer = 'Bearer ' + dataConnection.token;
            const res = await fetch(`http://localhost:3000/api/user/${dataConnection.userId}`,{
                method:"DELETE",
                headers: {
                    'Authorization' : bearer
                }
            })
            const answer = await res.json();
            console.log(answer);
            navigate('/login')

        } catch (error) {
            console.error(error)
        }
    }

    let toReturn;
    switch(props.type){
        case "department":
        case "username":
            toReturn = 
            <GeneralContainer>
                <StyledInput 
                    type="text" 
                    name={props.type}
                    id={props.type}
                    placeholder={props.data.title} 
                    value={props.type === 'username' ? userData.username : userData.department}
                    onChange={(e)=> handleInformationChange(e.target.value, props.type)}
                />
                <PostButton 
                    type="editProfil" 
                    content={<FontAwesomeIcon icon={faPen} />}
                    postMethod={handlePostInformations}
                />
            </GeneralContainer>
        break;
        case "picture":
            toReturn =  
            <GeneralContainer column>
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
            </GeneralContainer>
        break;
        case "informations":
            toReturn = 
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
                            value={userData[information]} />
                    :
                        <StyledInput 
                            forInformation
                            id={`information__${information}`} 
                            name={`information__${information}`} 
                            type={parameters[information].inputType} 
                            placeholder={parameters[information].sentence}
                            onChange={(e)=>handleInformationChange(e.target.value, information)}
                            value={userData[information]}
                        />
                    }
                </Information>
                ))}
                <PostButton type={"informations"} content={"Appliquer"} postMethod={handlePostInformations} />
            </StyledForm>
        break;
        case "password":
            toReturn = 
            <PasswordContainer>
                <PasswordBloc
                    onChange={(e)=>setPasswordValue({...passwordValue, password: e.target.value})} 
                    label={passwordValue.passwordIsOK ? "Votre nouveau mot de passe" : "Veuillez entrez votre ancien mot de passe"} 
                    name={"password"}
                    value={passwordValue.password}
                />
                {passwordValue.passwordIsOK &&
                    <PasswordBloc
                        onChange={(e)=>setPasswordValue({...passwordValue, confirmPassword: e.target.value})} 
                        label={"Confirmez"} 
                        name={"password_-confirmation"}
                    />
                }
                <PostButton 
                    postMethod={passwordValue.passwordIsOK ? handleResetPassword : handleLogin}
                    content={"Changez mon mot de passe"} 
                />
                <p>{passwordValue.message}</p>
            </PasswordContainer>
        break;
        case "deleteAccount":
            toReturn = 
            <GeneralContainer column>
                {!confirmation ?
                    <StyledButton onClick={()=>setConfirmation(true)}>Je veux supprimer mon compte</StyledButton>
                :
                <>
                    <p>Confirmez que vous souhaitez supprimez votre compte</p> 
                    <div>
                        <StyledButton onClick={(e)=>handleDelete(e)}>Confirmez</StyledButton>
                        <StyledButton onClick={()=>setConfirmation(false)} cancel >Annuler</StyledButton>
                    </div>
                </>
                }
            </GeneralContainer>
        break;
        default:
            toReturn = <p>Error</p>
    }

    return(
    <>
        {(!(props.type === 'deleteAccount' && dataConnection.role.includes('ROLE_ADMIN'))) ?
            <Container isActive={props.isActive} isMobile={isMobile}>
                <StyledTitle isMobile={isMobile} onClick={props.onClick}>
                    <h2>{props.data.title}</h2>
                </StyledTitle>
                {/* Revoir Erreur la solution ne me plait pas*/}
                <StyledIcon active={props.isActive.toString()} icon={faAngleUp} />
                <ContentContainer isActive={props.isActive} >
                    {toReturn}
                </ContentContainer>
            </Container>
        :
            <></>
        }
    </>)
}

export default AccordionItem