/*====================================================*/
/* -------------------- Import -----------------------*/
/*====================================================*/
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../utils/context";


import AuthBlocSetPassword from "./AuthBlocSetPassword"
import AuthFormTest from "./AuthFormTest"
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
    <AuthFormTest>
        <AuthBlocSetPassword 
            passwordChecked={passwordChecked} 
            setPasswordChecked={setPasswordChecked}
        />
        <AuthBlocButton 
            content={"Réinitialiser mot de passe"} 
            onClick={resetRequest} 
        />
        <AuthBlocError content={error.generalEror}/>
    </AuthFormTest>)
}

export default AuthBlocResetForm