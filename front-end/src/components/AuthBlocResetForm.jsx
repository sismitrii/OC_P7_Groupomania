/*====================================================*/
/* -------------------- Import -----------------------*/
/*====================================================*/
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../utils/context";

import AuthBlocSetPassword from "./AuthBlocSetPassword"
import AuthForm from "./AuthForm"
import AuthBlocButton from "./AuthBlocButton";
import AuthBlocError from "./AuthBlocError";

import { fetchPostOrPut } from "../utils/function/function";

/*====================================================*/
/* -------------------- Style ------------------------*/
/*====================================================*/

/*====================================================*/
/* --------------------- Main ------------------------*/
/*====================================================*/
function AuthBlocResetForm(){
    const [passwordChecked, setPasswordChecked] = useState(false);
    const {userData, error, setError} = useContext(AuthContext)
    const navigate = useNavigate();
    let {token} = useParams();

    /*=== Get the token created when forgot email is send in the url ===*/
    /*=== And check and set the new password then request change in DB ===*/
    async function resetRequest(e){
        e.preventDefault()
 
        const dataToPut = {
            token: token,
            password: userData.password
        }

        if (!passwordChecked){
            setError({...error, generalEror: "Ces mots de passe ne correspondent pas. Veuillez réessayer."})
        } else if(userData.password){
            const answer = await fetchPostOrPut("PUT",dataToPut,'http://localhost:3000/api/auth/reset_password')
            console.log(answer);
            navigate('/login')
        }
    }

    return (
    <AuthForm>
        <AuthBlocSetPassword 
            passwordChecked={passwordChecked} 
            setPasswordChecked={setPasswordChecked}
        />
        <AuthBlocButton 
            content={"Réinitialiser mot de passe"} 
            onClick={resetRequest} 
        />
        <AuthBlocError content={error.generalEror}/>
    </AuthForm>)
}

export default AuthBlocResetForm