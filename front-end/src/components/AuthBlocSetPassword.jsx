/*====================================================*/
/* -------------------- Import -----------------------*/
/*====================================================*/
import { useContext, useState } from "react";
import styled from "styled-components";
import zxcvbn from "zxcvbn";
import { AuthContext } from "../utils/context";

import PasswordBloc from "./PasswordBloc"
/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/
const PasswordStrenght = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`
const PasswordStrenghtPart = styled.div`
    width: 17%;
    ${(props) =>  props.strenghtPassword >= 0 && "height: 8px"};
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

/*====================================================*/
/* --------------------- Main ------------------------*/
/*====================================================*/
function AuthBlocSetPassword(props){
    const [strenghtPassword, setStrenght] = useState(-1);
    const {userData, setUserData, setError, initialError} = useContext(AuthContext)

    /*=== Check the strenght of password with zxcvbn===*/ 
    function checkStrenghtPassword(e){
        if (e.target.value.length > 0){
            setStrenght(zxcvbn(e.target.value).score);
            setUserData({...userData, password: e.target.value})
        } else {
            const newUserData = userData;
            delete newUserData.password;
            setUserData(newUserData);
            setStrenght(-1);
        }
        setError(initialError)
    }

    /*=== Check if the two password are the same ===*/
    function passwordConfirmation(e){
        if (e.target.value.length > 0){
            if (e.target.value === userData.password){
                props.setPasswordChecked(true);
            } else {
                props.setPasswordChecked(false);  
            }
        }
        setError(initialError)
    }

    return(
    <>
        <PasswordBloc 
            onChange={checkStrenghtPassword} 
            label={"Mot de passe"}
            name={"password"}
        />
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
    </>)
}

export default AuthBlocSetPassword