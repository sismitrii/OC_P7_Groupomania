/*====================================================*/
/* -------------------- Import -----------------------*/
/*====================================================*/
import AuthBloc from "../../components/AuthBloc"
import AuthPageContainer from "../../components/AuthPageContainer"

/*====================================================*/
/* --------------------- Main ------------------------*/
/*====================================================*/
function SignUp(){
    return(
    <AuthPageContainer >
        <AuthBloc page="signUp"/>
    </AuthPageContainer>
    )
}

export default SignUp