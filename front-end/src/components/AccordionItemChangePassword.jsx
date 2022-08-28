/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import styled from "styled-components"
import { useState, useContext } from "react"
import { ConnectionContext, SettingsContext } from "../utils/context"

import PasswordBloc from "./PasswordBloc"
import PostButton from "./PostButton"

import { fetchPostOrPut } from "../utils/function/function"

/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/
const Container = styled.div`
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
/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/
function AccordionItemChangePassword(){
    const initialPassword = {passwordIsOK: false, password: "", confirmPassword: "", message:""}
    const [passwordValue, setPasswordValue]= useState(initialPassword)
    const {userData, setUpdatedMessage} = useContext(SettingsContext)
    const {dataConnection} = useContext(ConnectionContext)

    /*=== Login to check the user identity before he changed the password ===*/
    async function handleLogin(e){
        e.preventDefault();
        const answer = await fetchPostOrPut("POST", {email: userData.email, password: passwordValue.password},'http://localhost:3000/api/auth/login', dataConnection)
        if (answer.token){
            setPasswordValue({...passwordValue, password: "", passwordIsOK: true, message:""}) 
        } else {
            setPasswordValue({...passwordValue, message: "Mot de passe Incorrect"})
        }
    }

    /*=== Request to change the password and print succes or error ===*/
    async function handleResetPassword(e){
        e.preventDefault();
        if (passwordValue.password === passwordValue.confirmPassword){
            console.log(await fetchPostOrPut("PUT", {password: passwordValue.password}, 'http://localhost:3000/api/auth/change_password', dataConnection))
            setPasswordValue(initialPassword);
            setUpdatedMessage('Votre mot de passe à été mis à jour')
        } else {
            setPasswordValue({...passwordValue, message: "Veuillez rentrez deux mot de passes identique"})
        }
    }

    return(            
    <Container>
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
    </Container>)
}

export default AccordionItemChangePassword