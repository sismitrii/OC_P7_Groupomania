/*====================================================*/
/* -------------------- Import -----------------------*/
/*====================================================*/
import AuthBloc from "../../components/AuthBloc"
import AuthPageContainer from "../../components/AuthPageContainer"

/*====================================================*/
/* --------------------- Main ------------------------*/
/*====================================================*/
function Login(){
    return(
    <AuthPageContainer >
        <AuthBloc page="login"/>
    </AuthPageContainer>
    )
}

export default Login