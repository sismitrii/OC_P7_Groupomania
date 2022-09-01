/*====================================================*/
/* -------------------- Import -----------------------*/
/*====================================================*/
import styled from "styled-components"
/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    label {
        letter-spacing: 0.3px;
    }
`
/*====================================================*/
/* --------------------- Main ------------------------*/
/*====================================================*/
function AuthFormTest({children}){
    return(
        <StyledForm>
        {children}
        </StyledForm>)
}

export default AuthFormTest