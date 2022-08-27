/*====================================================*/
/* -------------------- Import -----------------------*/
/*====================================================*/
import styled from "styled-components"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../utils/context"

import AuthFormTest from "./AuthFormTest"
import AuthBlocEmail from "./AuthBlocEmail"
import AuthBlocButton from "./AuthBlocButton"
import AuthBlocError from "./AuthBlocError"
import { fetchPostOrPut } from "../utils/function/function"
import { useNavigate } from "react-router-dom"

import colors from "../utils/styles/colors"
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
function AuthBlocForgotForm(){
    const {userData, error, setError} = useContext(AuthContext)
    const navigate = useNavigate();
    
    async function forgotRequest(e){
        e.preventDefault()
        if(userData.email){
            console.log(userData);
            const answer = await fetchPostOrPut("POST", userData,'http://localhost:3000/api/auth/forgot_password')
            console.log(answer);
            setError({...error, generalEror: answer.message})
            if (answer.message === "email sent"){
                setTimeout(()=>{
                    navigate('/login')
                }, 3000)
            }
        }
    }

    return(
    <AuthFormTest>
        <AuthBlocEmail />
        <AuthBlocButton onClick={forgotRequest} content={"Envoyer lien"} />
        <AuthBlocError content={error.generalEror}/>
        <AuthChangeSentence> 
            Vers la page de 
            <Link to="/login"> Connection</Link>
        </AuthChangeSentence>
    </AuthFormTest>
    )
}

export default AuthBlocForgotForm