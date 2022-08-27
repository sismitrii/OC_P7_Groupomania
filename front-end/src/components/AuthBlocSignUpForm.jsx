/*====================================================*/
/* -------------------- Import -----------------------*/
/*====================================================*/
import styled from "styled-components";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext, ConnectionContext } from "../utils/context";
import { fetchPostOrPut } from "../utils/function/function";

import AuthBlocButton from "./AuthBlocButton";
import AuthBlocEmail from "./AuthBlocEmail"
import AuthBlocError from "./AuthBlocError";
import AuthBlocSetPassword from "./AuthBlocSetPassword"
import AuthFormTest from "./AuthFormTest"

import colors from "../utils/styles/colors";

/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/
const AuthChangeSentence = styled.p`
    font-size: 12px;
    text-align: right;
    margin-right: 20px;

    a {
        color: ${colors.primary};
    }
`

/*====================================================*/
/* --------------------- Main ------------------------*/
/*====================================================*/
function AuthBlocSignUpForm(){
    const [passwordChecked, setPasswordChecked] = useState(false);
    const {error, setError, userData} = useContext(AuthContext)
    const {login} = useContext(ConnectionContext);

    async function signUp(e){
        e.preventDefault();
        if (!passwordChecked){
            setError({...error, generalEror: "Ces mots de passe ne correspondent pas. Veuillez réessayer." }) 
        } else if((userData.email) && (userData.password)){
            //console.log(await postData('http://localhost:3000/api/auth/signup', userData))
            const answer = await fetchPostOrPut("POST", userData,'http://localhost:3000/api/auth/signup')
            if (answer.message === "New user created"){
                login(userData);
            } else {
                setError({...error, generalEror: answer.message})
            }
        }
    }

    return(
    <AuthFormTest>
        <AuthBlocEmail />
        <AuthBlocSetPassword setPasswordChecked={setPasswordChecked} />
        <AuthBlocButton content={"Je m'inscris"} onClick={signUp}/>
        <AuthBlocError content={error.generalEror} />
        <AuthChangeSentence>
            Déjà inscrit ?  
            <Link to="/login"> Se Connectez</Link>
        </AuthChangeSentence>
    </AuthFormTest>
    )
}

export default AuthBlocSignUpForm