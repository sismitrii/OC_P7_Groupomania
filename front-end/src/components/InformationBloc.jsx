/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/

import styled from "styled-components";
import Info from "./Info";
/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/

const Container = styled.div`
    padding: 10px 30px;
`

const ContainerInfo = styled.div`
    margin-top: 30px;

    & > * {
        margin-top: 30px;
    }
`

/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
function InformationBloc(){

    return(
    <Container>
        <h3>Informations</h3>
        <ContainerInfo>
            <Info />
            <Info />
            <Info />
            <Info />
            <Info />
        </ContainerInfo>
    </Container>)
}

export default InformationBloc