/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/

import { useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { AppContext, ConnectionContext } from "../utils/context";
import Info from "./Info";
/*====================================================*/
/* --------------------- Import ----------------------*/
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
/* --------------------- Import ----------------------*/
/*====================================================*/
function InformationBloc(){
    const {profil} = useContext(AppContext);
    const {dataConnection} = useContext(ConnectionContext)
    const profilId = useParams();

    // un tableau d'objet
    //[{type:"", value:""}, ]
    // si dataConnection.userId === profilId.id on voit que tout les type y soit
    // sinon 

    const parameters = {
        email : {sentence: "Email", inputType: "email"},
        birthday: {sentence: "Date de naissance", inputType: "date"},
        workNumber: {sentence: "Numéro de poste", inputType: "number"},
        mobileNumber: {sentence: "Numéro de portable", inputType: "tel"},
        interests: {sentence: "Centres d'interets", inputType: "text"},
        biographie: {sentence:"Biographie",inputType: "textarea"}
    }

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