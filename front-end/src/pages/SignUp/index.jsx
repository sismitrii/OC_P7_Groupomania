//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import SignUpForm from '../../components/SignUpForm'
import Logo from '../../assets/icon-left-font.svg';
import styled from 'styled-components';

const AuthLogo = styled.img`
    width: 70%;
    min-width: 320px;
`

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

function SignUp(){
    return (
    <PageContainer>
        <AuthLogo src={Logo} alt="Logo de Groupomania"/>
        <SignUpForm />
    </PageContainer>)

}

export default SignUp