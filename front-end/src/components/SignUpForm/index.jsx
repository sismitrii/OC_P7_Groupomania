import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/styles/colors'

const AuthContainer = styled.div`
    width: 35%;
    min-width: 300px;
    margin: auto;
    border-radius: 50px;
    background-color: ${colors.secondary};
    padding: 20px 30px;
`

const AuthTitle = styled.div`
    text-align: center;
    color: ${colors.primary};
    font-size: 20px;
    margin-bottom: 20px;
    font-family: 'Arial';
`

const AuthForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`

const PasswordStrenghtPart = styled.div`
    width: 20%;
    height: 8px;

    &:nth-child(1) {
        background-color: #F7091B;
    }
    &:nth-child(2) {
        background-color: #F77F0A;
    }
    &:nth-child(3) {
        background-color: #70FB86;
    }
    &:nth-child(4) {
        background-color: #07FA2E;
    }
`
const PasswordStrenght = styled.div`
    width: 100%;
    height: 8px;
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
`

const AuthChangeSentence = styled.p`
    font-size: 12px;
    text-align: right;
    margin-right: 20px;
`
const AuthChangeLink =styled(Link)`
    color: ${colors.primary};
`


function SignUpForm(){
    return (
    <AuthContainer>
        <AuthTitle>Inscrivez-vous</AuthTitle>
        <AuthForm>
            <AuthLabel>Mail</AuthLabel>
            <AuthInput name="email" id="signup__email" type="email" />
            <AuthLabel>Mot de passe</AuthLabel>
            <PasswordBloc>
                <AuthInput name="password" id="signup__password" type="password" />
                <EyeIcon icon={faEye} />
            </PasswordBloc>
            <PasswordStrenght>
                <PasswordStrenghtPart />
                <PasswordStrenghtPart />
                <PasswordStrenghtPart />
                <PasswordStrenghtPart />
            </PasswordStrenght>
            <AuthLabel>Confirmez votre mot de passe</AuthLabel>
            <PasswordBloc>
                <AuthInput name="confirm_password" id="signup__confirm" type="password" />
                <EyeIcon icon={faEye} />
            </PasswordBloc>

            <AuthButton>Je m'inscrit</AuthButton>
        </AuthForm>
        <AuthChangeSentence>Déjà Inscrit ? <AuthChangeLink to="/connection">Connectez-vous</AuthChangeLink></AuthChangeSentence>
    </AuthContainer>)
}

export default SignUpForm