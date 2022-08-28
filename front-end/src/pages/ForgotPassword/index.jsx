/*====================================================*/
/* -------------------- Import -----------------------*/
/*====================================================*/
import AuthBloc from "../../components/AuthBloc"
import AuthPageContainer from "../../components/AuthPageContainer"

/*====================================================*/
/* --------------------- Main ------------------------*/
/*====================================================*/
function ForgotPassword(){
    return(
    <AuthPageContainer>
       <AuthBloc page="forgotPassword"/> 
    </AuthPageContainer>
    )
}

export default ForgotPassword