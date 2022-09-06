/*====================================================*/
/* -------------------- Import -----------------------*/
/*====================================================*/
import { useContext } from "react"
import { AuthContext } from "../utils/context"
import styled from "styled-components"
/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/
const AuthLabel = styled.label`
    font-size: 14px;
    margin: 10px;
    @media (min-width: 768px){
        font-size: 18px;
    }
`
const AuthInput = styled.input`
    height: 30px;
    width: 100%;
    border: none;
    border-radius: 5px;
    padding-left: 5px ;
`

const EmailError = styled.p`
    font-family: sans-serif;
    font-size: 12px;
    color: red;
`

/*====================================================*/
/* --------------------- Main ------------------------*/
/*====================================================*/
function AuthBlocEmail(){
    const {userData, setUserData, error, setError, initialError} = useContext(AuthContext)


    function checkContent(e){
        const regex = /^\w+([.-]*\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
                
        if (regex.test(e.target.value)){
            setUserData({...userData, email: e.target.value})
            setError(initialError);
        } else {
            const newUserData = userData;
            delete newUserData.email;
            setUserData(newUserData);
            if (e.target.value.length > 0){
                setError({...error, mailError : "Veuillez rentrez une adresse email correcte. \n Ex:monadresse@groupomania.com"});
            } else {
                setError(initialError); 
            }
        }
    }

    return(
    <>
        <AuthLabel htmlFor="email">Mail</AuthLabel>
        <AuthInput 
            onChange={(e) => checkContent(e)} 
            name="email" 
            id="email" 
            type="email" 
        />
        <EmailError>{error.mailError}</EmailError>
    </>
    )
}

export default AuthBlocEmail