/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/

import { useState, useContext } from 'react'
import { useNavigate, useParams, Link } from "react-router-dom";
import styled from 'styled-components'
import colors from '../utils/styles/colors';
import zxcvbn from 'zxcvbn';
import { ConnectionContext } from '../utils/context';
import { fetchPostOrPut } from '../utils/function/function';
import PasswordBloc from './PasswordBloc';


/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/

//@media screen and (max-width:992px)
//@media screen and (max-width:768px)
const AuthContainer = styled.div`
    width: 50%;
    min-width: 300px;
    max-width: 380px;
    margin: O auto;
    border-radius: 50px;
    background-color: ${colors.secondary};
    padding: 20px 30px;
`

const AuthTitle = styled.h1`
    text-align: center;
    font-weight: 500;
    color: ${colors.primary};
    font-size: 20px;
    margin-bottom: 20px;
    font-family: 'Lato';

    @media (min-width: 768px){
        font-size: 25px;
    }
`

const AuthForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`

const PasswordStrenghtPart = styled.div`
    width: 17%;
    height: 8px;
    background-color: transparent;

    &:nth-child(1) {
        ${(props) =>  props.strenghtPassword >= 0 && `background-color: #F7091B;` }
    }
    &:nth-child(2) {
        ${(props) =>  props.strenghtPassword >= 1 && `background-color: #F77F0A;` }
    }
    &:nth-child(3) {
        ${(props) =>  props.strenghtPassword >= 2 && `background-color: #fbf80e;` }
    }
    &:nth-child(4) {
        ${(props) =>  props.strenghtPassword >= 3 && `background-color: #70FB86;` }
    }
    &:nth-child(5) {
        ${(props) =>  props.strenghtPassword >= 4 && `background-color: #07FA2E;` }
    }
`
const PasswordStrenght = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`

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

const AuthButton = styled.button`
    min-width: 65%;
    padding: 5px 10px;
    height: 40px;
    margin: 20px;
    background-color: ${colors.primary};
    color: white;
    font-size: 15px;
    text-align: center;
    border: none;
    border-radius: 10px;
    cursor: pointer;

    @media (min-width: 768px){
        font-size: 18px;
    }
`

const AuthChangeSentence = styled.p`
    font-size: 12px;
    text-align: right;
    margin-right: 20px;
`
const AuthChangeLink = styled(Link)`
    color: ${colors.primary};
`

const AuthPasswordLink = styled(Link)`
    color: ${colors.primary};
    align-self: flex-end;
    font-size: 12px;
    margin-top: 10px
`
const ErrorMsg = styled.p`
    font-family: sans-serif;
    font-size: 12px;
    color: red;

    ${(props)=> props.$isAuthError ? "text-transform: uppercase; margin-top: 10px": ""}
`

/*====================================================*/
/* ------------------- Function ----------------------*/
/*====================================================*/
const regexToCheck = {
    email: /^\w+([.-]*\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/
}

function checkContent(e, type, userData, setUserData){
    const regex = regexToCheck[type];
    
    const testRegex = regex.test(e.target.value);

    const errorMsgTag = e.target.nextElementSibling
    
    if (testRegex){
        const newUserData = userData;
        newUserData[type] = e.target.value;
        setUserData(newUserData) 
        errorMsgTag.innerText = "";
    } else {
        const newUserData = userData;
        delete newUserData.type;
        setUserData(newUserData);
        if (e.target.value.length > 0){
            errorMsgTag.innerHTML = "Veuillez rentrez une adresse email correcte. <br/> | Ex: monadresse@groupomania.com";
        } else {
            errorMsgTag.innerText = ""; 
        }
    }
}

async function postData(url, dataToPost){

    const answer = await fetchPostOrPut("POST", dataToPost,url)
    return answer;
}

/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/

function Auth(props){
    const [userData, setUserData] = useState({});
    const [strenghtPassword, setStrenght] = useState(-1);
    const [passwordChecked, setPasswordChecked] = useState(false);
    const {setDataConnection} = useContext(ConnectionContext)

    const {token} = useParams();

    const navigate = useNavigate();

    async function signUpRequest(e){
        e.preventDefault();
        const errorMsgTag = document.querySelector('.confirmationErrorMsg')
        if (!passwordChecked){
            errorMsgTag.innerText = "Ces mots de passe ne correspondent pas. Veuillez réessayer."
        } else if((userData.email) && (userData.password)){
            console.log(await postData('http://localhost:3000/api/auth/signup', userData))
            login();
        }
    }

    function passwordConfirmation(e){
        document.querySelector('.confirmationErrorMsg').innerText = "";
        if (e.target.value.length > 0){
            if (e.target.value === userData.password){
                setPasswordChecked(true);
            } else {
                setPasswordChecked(false);  
            }
        }
    }

    function checkStrenghtPassword(e){
        if (e.target.value.length > 0){
            setStrenght(zxcvbn(e.target.value).score);
            setUserData(data =>({
                ...data,
                password: e.target.value
            }))
        } else {
            const newUserData = userData;
            delete newUserData.password;
            setUserData(newUserData);
            setStrenght(-1);
        }
    }

    async function loginRequest(e){
        e.preventDefault();
        if (userData.email && userData.password){
            login()
        }
    }
    
    async function login(){
    
        const dataConnection = await postData('http://localhost:3000/api/auth/login', userData)
        if (dataConnection.message){
            document.querySelector('.passwordErroMsg').innerText = dataConnection.message;
        } else {
            document.querySelector('.passwordErroMsg').innerText = "";
            setDataConnection(dataConnection)
            navigate('/home')     
        }
    }

    async function forgotRequest(e){
        e.preventDefault()
        if(userData.email){
            const dataConnection = await postData('http://localhost:3000/api/auth/forgot_password',{email: userData.email});
            if (dataConnection.message){
                document.querySelector('.passwordErroMsg').innerText = dataConnection.message;
                if (dataConnection.message === "email sent"){
                    setTimeout(()=>{
                        navigate('/login')
                    }, 3000)
                }
            } else {
                document.querySelector('.passwordErroMsg').innerText = "";
            }
        }
    }

    async function resetRequest(e){
        e.preventDefault()
        const errorMsgTag = document.querySelector('.confirmationErrorMsg')
 
        const dataToPut = {
            token: token,
            password: userData.password
        }

        if (!passwordChecked){
            errorMsgTag.innerText = "Ces mots de passe ne correspondent pas. Veuillez réessayer."
        } else if(userData.password){

            const answer = await fetchPostOrPut("PUT",dataToPut,'http://localhost:3000/api/auth/reset_password')
            console.log(answer);
            navigate('/login')
        }
    }

    let authTitleValue = "Inscrivez-vous";

    switch (props.page){
        case 'login':
            authTitleValue = "Connectez-vous";
            break;
        case 'forgotPassword':
            authTitleValue = "Mot de passe oublié";
            break;
        case 'resetPassword':
            authTitleValue = "Veuillez-rentrez un nouveau mot de passe";
            break;
        default:
            authTitleValue = "Inscrivez-vous";
            break;
    }

    const buttonAuth = [
        {
            type: 'login',
            function: (e)=> loginRequest(e),
            text: "Je me connecte"
        },
        {
            type: '',
            function: (e)=> signUpRequest(e),
            text: "Je m'inscrit"
        },
        {
            type: 'forgotPassword',
            function: (e)=> forgotRequest(e),
            text: "Envoyer lien"
        },
        {
            type: 'resetPassword',
            function: (e)=> resetRequest(e),
            text: "Réinitialiser mot de passe"
        }
    ]


    return (
    <AuthContainer>
        <AuthTitle>{authTitleValue}</AuthTitle>
        <AuthForm>
            { props.page !== 'resetPassword' &&
            <>
                <AuthLabel htmlFor='signup__email'>Mail</AuthLabel>
                <AuthInput 
                    onChange={(e) => {checkContent(e, "email", userData, setUserData)}} 
                    name="email" 
                    id="signup__email" 
                    type="email" />
                <ErrorMsg></ErrorMsg>
            </>
            }
            {(props.page === 'login' || props.page === '' || props.page === 'resetPassword' ) &&
            <>
                <PasswordBloc 
                    onChange={checkStrenghtPassword} 
                    label={"Mot de passe"}
                    name={"password"}
                />
            </>
            }
            
            {props.page === 'login' && 
                <AuthPasswordLink to="/forgotPassword">Mot de passe oublié ?</AuthPasswordLink>
            }
            
            {(props.page === '' || props.page === 'resetPassword' )&& 
            <>
                <PasswordStrenght>
                    <PasswordStrenghtPart strenghtPassword = {strenghtPassword}/>
                    <PasswordStrenghtPart strenghtPassword = {strenghtPassword}/>
                    <PasswordStrenghtPart strenghtPassword = {strenghtPassword}/>
                    <PasswordStrenghtPart strenghtPassword = {strenghtPassword}/>
                    <PasswordStrenghtPart strenghtPassword = {strenghtPassword}/>
                </PasswordStrenght>
                <PasswordBloc 
                    onChange={(e)=>passwordConfirmation(e)} 
                    label={"Confirmez votre mot de passe"} 
                    name={"password-confirmation"}
                />
                <ErrorMsg className='confirmationErrorMsg'></ErrorMsg>

            </>}
            <ErrorMsg $isAuthError className='passwordErroMsg'></ErrorMsg>
            {buttonAuth.map((obj, index)=>(
                obj.type === props.page ?
                <AuthButton key={`${obj.type}-${index}`} onClick={obj.function}>{obj.text}</AuthButton>
                : ""
            ))}
        </AuthForm>
        {props.page === 'login' && 
            <AuthChangeSentence>Pas encore de compte ? <AuthChangeLink to="/">S'inscrire</AuthChangeLink></AuthChangeSentence>
        }
        {props.page === '' && 
            <AuthChangeSentence>Déjà Inscrit ? <AuthChangeLink to="/login">Connectez-vous</AuthChangeLink></AuthChangeSentence>
        }
    </AuthContainer>)
}

export default Auth