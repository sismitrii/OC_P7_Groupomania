import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useContext } from 'react'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/styles/colors'
import zxcvbn from 'zxcvbn';
import { ConnectionContext } from '../../utils/context'


//@media screen and (max-width:992px)
//@media screen and (max-width:768px)

const AuthContainer = styled.div`
    width: 50%;
    min-width: 300px;
    max-width : 380px;
    margin: O auto;
    border-radius: 50px;
    background-color: ${colors.secondary};
    padding: 20px 30px;
`

const AuthTitle = styled.h1`
    text-align: center;
    font-weight : 500;
    color: ${colors.primary};
    font-size: 20px;
    margin-bottom: 20px;
    font-family: 'Arial';

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
    background-color : transparent;

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

const PasswordBloc = styled.div`
    position: relative;
    width: 100%;
`

const EyeIcon = styled(FontAwesomeIcon)`
    font-size: 12px;
    position: absolute;
    right: 6%;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
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


    &:focus {
        outline: none;
        box-shadow: 0 0 0 1px ${colors.primary};
    }
`

const AuthButton = styled.button`
    width: 65%;
    height: 40px;
    margin: 20px;
    background-color: ${colors.primary};
    color: white;
    font-size: 15px;
    text-align: center;
    border: none;
    border-radius: 10px;
    outline: none;
    cursor: pointer;

    @media (min-width : 768px){
        font-size : 18px;
    }
`

const AuthChangeSentence = styled.p`
    font-size: 12px;
    text-align: right;
    margin-right: 20px;
`
const AuthChangeLink =styled(Link)`
    color: ${colors.primary};
`

const AuthPasswordLink =styled(Link)`
    color: ${colors.primary};
    align-self: flex-end;
    font-size: 12px;
    margin-top: 10px
`
const ErrorMsg = styled.p`
    font-family : sans-serif;
    font-size: 12px;
    color: red;

    ${(props)=> props.$isAuthError ? "text-transform : uppercase; margin-top : 10px" : ""}
`

const regexToCheck = {
    email: /^\w+([.-]*\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/
}
function checkContent(e, type, userData, setUserData){
    // on va crée une fonction qui va checker les tout les input que l'on va rentrer
    // aussi bien pour la page de connexion que pour les infos utilisateur dans le profil
    // il faudra passer en paramètre de la fonction le type et on aura un objet avec les pairs clé regex
    const regex = regexToCheck[type];
    
    let testRegex = regex.test(e.target.value);

    let errorMsgTag = e.target.nextElementSibling
    
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

function showPassword(e){
    e.stopPropagation();
    const input = e.currentTarget.previousElementSibling
    if (input.type === "password"){
        input.type = "text";
    } else {
        input.type = "password";
    }
}

function checkStrenghtPassword(e,setStrenght, userData, setUserData){
    if (e.target.value.length > 0){
        setStrenght(zxcvbn(e.target.value).score);
        setUserData(data =>({
            ...data,
            password : e.target.value
        }))
    } else {
        const newUserData = userData;
        delete newUserData.password;
        setUserData(newUserData);
        setStrenght(-1);
    }
}

function passwordConfirmation(e, userData, setPasswordChecked){
    document.querySelector('.confirmationErrorMsg').innerText = "";
    if (e.target.value.length > 0){
        if (e.target.value === userData.password){
            setPasswordChecked(true);
        } else {
            setPasswordChecked(false);  
        }
    }
}


async function postData(url, dataToPost){
    if (!url){return}
    try {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(dataToPost)
        })
            let answer = await res.json()
            return answer;
    } catch(err) {
        console.log(err);
    }
}

async function signUpRequest(e,userData, passwordChecked){
    e.preventDefault();
    const errorMsgTag = document.querySelector('.confirmationErrorMsg')
    if (!passwordChecked){
        errorMsgTag.innerText = "Ces mots de passe ne correspondent pas. Veuillez réessayer."
    } else if((userData.email) && (userData.password)){
        console.log(await postData('http://localhost:3000/api/auth/signup', userData))
        //const dataConnexion = await postData('http://localhost:3000/api/auth/login', userData);
        

        // apres il faut faire une fonstion login et 
        //recup le userId et le token pour les stocker dans le localStorage
    }
}

async function loginRequest(e, userData, setDataConnection){
    e.preventDefault();
    if (userData.email && userData.password){
        login(userData)
        setDataConnection({userId: '62f370f0effa1dc5620e6578', token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiO…I5M30.vf0MMXXoPq19fIo5ILMjMvypRzfE7XYurn2NnQ5uWck'})
        console.log("mis à jour")
    }
}

async function login(userData){
    // on va faire la requete
    const dataConnexion = await postData('http://localhost:3000/api/auth/login', userData)
    if (dataConnexion.message){
        document.querySelector('.passwordErroMsg').innerText = dataConnexion.message;
    } else {
        document.querySelector('.passwordErroMsg').innerText = "";
    }
    // enregister UserId et token
    // redirigé vers la page Home
}

function Auth(props){
    const [userData, setUserData] = useState({});
    const [strenghtPassword, setStrenght] = useState(-1);
    const [passwordChecked, setPasswordChecked] = useState(false);
    const {dataConnexion, setDataConnection} = useContext(ConnectionContext)

    return (
    <AuthContainer>
        <AuthTitle>{props.isLogin ? "Connectez-vous" : "Inscrivez-vous"}</AuthTitle>
        <AuthForm>
            <AuthLabel>Mail</AuthLabel>
            <AuthInput onChange={(e) => {checkContent(e, "email", userData, setUserData)}} name="email" id="signup__email" type="email" />
            <ErrorMsg></ErrorMsg>
            <AuthLabel>Mot de passe</AuthLabel>
            <PasswordBloc>
                <AuthInput onChange={(e)=> checkStrenghtPassword(e, setStrenght, userData, setUserData)} name="password" id="signup__password" type="password" />
                <EyeIcon onClick={(e)=> showPassword(e)}icon={faEye} />
            </PasswordBloc>
            
            {props.isLogin ? <AuthPasswordLink to="/">Mot de passe oublié ?</AuthPasswordLink> : 
            <>
                <PasswordStrenght>
                    <PasswordStrenghtPart strenghtPassword = {strenghtPassword}/>
                    <PasswordStrenghtPart strenghtPassword = {strenghtPassword}/>
                    <PasswordStrenghtPart strenghtPassword = {strenghtPassword}/>
                    <PasswordStrenghtPart strenghtPassword = {strenghtPassword}/>
                    <PasswordStrenghtPart strenghtPassword = {strenghtPassword}/>
                </PasswordStrenght>
                <AuthLabel>Confirmez votre mot de passe</AuthLabel>
                <PasswordBloc>
                    <AuthInput onChange={(e)=> passwordConfirmation(e, userData, setPasswordChecked)} name="confirm_password" id="signup__confirm" type="password" />
                    <EyeIcon onClick={(e)=> showPassword(e)} icon={faEye} />
                </PasswordBloc>
                <ErrorMsg className='confirmationErrorMsg'></ErrorMsg>

            </>}
            <ErrorMsg $isAuthError className='passwordErroMsg'></ErrorMsg>
            {props.isLogin ? 
            <AuthButton onClick={(e)=> loginRequest(e,userData, setDataConnection)}>Je me connecte</AuthButton>
            : <AuthButton onClick={(e)=> signUpRequest(e,userData, passwordChecked)}>Je m'inscrit</AuthButton>
            }
        </AuthForm>
        {props.isLogin ?  
        <AuthChangeSentence>Pas encore de compte ? <AuthChangeLink to="/">S'inscrire</AuthChangeLink></AuthChangeSentence>
        : <AuthChangeSentence>Déjà Inscrit ? <AuthChangeLink to="/login">Connectez-vous</AuthChangeLink></AuthChangeSentence>}
    </AuthContainer>)
}

export default Auth