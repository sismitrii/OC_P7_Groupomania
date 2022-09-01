/*====================================================*/
/* -------------------- Import -----------------------*/
/*====================================================*/
import styled from "styled-components"
import { AuthProvider } from "../utils/context"

import AuthBlocResetForm from "./AuthBlocResetForm"
import AuthBlocLoginForm from "./AuthBlocLoginForm"
import AuthBlocForgotForm from "./AuthBlocForgotForm"
import AuthBlocSignUpForm from "./AuthBlocSignUpForm"

import colors from "../utils/styles/colors"

/*====================================================*/
/* -------------------- Style ------------------------*/
/*====================================================*/

const Container = styled.div`
    width: 50%;
    min-width: 300px;
    max-width: 380px;
    margin: O auto;
    border-radius: 50px;
    background-color: ${colors.secondary};
    padding: 20px 30px;
`
const StyledTitle = styled.h1`
    text-align: center;
    font-weight: 500;
    color: ${colors.primary};
    font-size: 24px;
    margin-bottom: 15px;
    letter-spacing: 0.3px;

    @media (min-width: 768px){
        font-size: 25px;
    }
`
/*====================================================*/
/* --------------------- Main ------------------------*/
/*====================================================*/
function AuthBloc(props){

    const pages = {
        signUp : "Inscrivez-vous !",
        login : "Connectez-vous !",
        forgotPassword: "Mot de passe oublié ?",
        resetPassword: "Veuillez-rentrer un nouveau mot de passe"
    }

    let toReturn ;
    switch(props.page){
        case "signUp":
            toReturn = <AuthBlocSignUpForm />
        break;
        case "login":
            toReturn = <AuthBlocLoginForm />
        break;
        case "forgotPassword":
            toReturn = <AuthBlocForgotForm />
        break;
        case "resetPassword":
            toReturn = <AuthBlocResetForm />
        break;
        default:
            toReturn = <></>
    }

    return(
    <>
    <AuthProvider>
        <Container>
            <StyledTitle>{pages[props.page]}</StyledTitle>
                {toReturn}
        </Container>
    </AuthProvider>
    </>)
}

export default AuthBloc