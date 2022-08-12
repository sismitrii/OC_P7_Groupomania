/*====================================================*/
/* -------------------- Import -----------------------*/
/*====================================================*/
import Auth from '../../components/AuthForm'
import Logo from '../../assets/icon-left-font.svg';
import styled from 'styled-components';
import { useLocation } from "react-router-dom"


/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/
const AuthLogo = styled.img`
    width: 60%;
    min-width: 320px;
    margin: 30px 0px;
`

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background-color: #F4F4F4;
`

/*====================================================*/
/* ------------------- Component ---------------------*/
/*====================================================*/
function SignUp(){
    const location = useLocation();

    const authPage = location.pathname.split('/')[1];

    return (
    <PageContainer>
        <AuthLogo src={Logo} alt="Logo de Groupomania"/>
        <Auth page={authPage} />
    </PageContainer>)

}

export default SignUp