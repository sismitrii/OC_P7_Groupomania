/*====================================================*/
/* -------------------- Import -----------------------*/
/*====================================================*/
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext, ConnectionContext } from "../utils/context";
import styled from "styled-components";

import AuthBlocButton from "./AuthBlocButton";
import AuthBlocEmail from "./AuthBlocEmail"
import AuthBlocError from "./AuthBlocError";
import AuthForm from "./AuthForm"
import PasswordBloc from "./PasswordBloc";

import colors from "../utils/styles/colors";
/*====================================================*/
/* -------------------- Style ------------------------*/
/*====================================================*/

const AuthChangeSentence = styled.p`
    font-size: 12px;
    text-align: right;
    margin-right: 20px;

    a {
        color: ${colors.primary};
    }
`
const ForgotPasswordLink = styled(Link)`
    color: ${colors.primary};
    align-self: flex-end;
    font-size: 12px;
    margin-top: 10px
`

/*====================================================*/
/* --------------------- Main ------------------------*/
/*====================================================*/
function AuthBlocLoginForm(){
    const {userData, setUserData, error, setError, initialError} = useContext(AuthContext)
    const {login} = useContext(ConnectionContext);
    const [valuePassword, setValuePassword] = useState("")

    /*=== Set the user data with the email the user is enterring ===*/
    function handleChange(e){
        if (e.target.value.length > 0){
            setUserData({
                ...userData,
                password: e.target.value
            })
        } else {
            const newUserData = userData;
            delete newUserData.password;
            setUserData(newUserData);
        }
        setValuePassword(e.target.value)
        setError(initialError)
    }

    /*=== Check if there a an email and login and call login function of Connection context to login ===*/
    async function loginRequest(e){
        e.preventDefault();
        if (userData.email && userData.password){
            const err = await login(userData);
            setError({...error, generalEror: err})
        }
    }

    return(
        <AuthForm>
            <AuthBlocEmail />
            <PasswordBloc 
                onChange={handleChange} 
                label={"Mot de passe"}
                name={"password"}
                value={valuePassword}
            />
            <ForgotPasswordLink to="/forgotPassword">Mot de passe oublié ?</ForgotPasswordLink>
            <AuthBlocButton content={"Je me connecte"} onClick={loginRequest} />
            <AuthBlocError content={error.generalEror}/>
            <AuthChangeSentence>
                Pas encore de compte ?  
                <Link to="/"> S'inscrire</Link>
            </AuthChangeSentence>
        </AuthForm>
    )
}

export default AuthBlocLoginForm