/*====================================================*/
/* -------------------- Import -----------------------*/
/*====================================================*/
import AuthBloc from "../../components/AuthBloc"
import AuthPageContainer from "../../components/AuthPageContainer"
/*====================================================*/
/* --------------------- Main ------------------------*/
/*====================================================*/
function ResetPassword(){
    return(
    <AuthPageContainer>
        <AuthBloc page="resetPassword"/>
    </AuthPageContainer>
    )
}

export default ResetPassword