/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import styled from "styled-components";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext, ConnectionContext } from "../utils/context";

import Info from "./Info";
/*====================================================*/
/* ---------------------- Style ----------------------*/
/*====================================================*/

const Container = styled.div`
    padding: 10px 30px;
`

const ContainerInfo = styled.div`
    & > * {
        margin-bottom: 30px;
    }
`
/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/
function InformationBloc(){
    const {profil, parameters} = useContext(AppContext);
    const {dataConnection} = useContext(ConnectionContext)
    const profilId = useParams();

    /*=== Remove all info that have not been filled for users it's not their profil ===*/ 
    let informed = Object.keys(parameters);
    if (!(dataConnection.userId === profilId.id)){
        informed = informed.filter((info)=> profil[info])
    }

    return(
    <Container>
        <h3>Informations</h3>
        <ContainerInfo>
            {informed && informed.map((info,i)=> (
                <Info key={`${info}-${i}`} type={info} parameter={parameters[info]} />
            ))}
        </ContainerInfo>
    </Container>)
}

export default InformationBloc