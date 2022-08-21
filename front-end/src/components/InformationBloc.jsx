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
    margin-top: 30px;

    & > * {
        margin-top: 30px;
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

    const sentences = {
        email : "Email",
        birthday: "Date de naissance",
        workNumber: "Numéro de poste",
        mobile: "Numéro de portable",
        interests: "Centres d'interets",
        biographie: "Biographie"
    }

    let informed = Object.keys(sentences);
    if (!(dataConnection.userId === profilId.id)){
        informed = informed.filter((info)=> profil[info])
    }

    return(
    <Container>
        <h3>Informations</h3>
        <ContainerInfo>
            {informed && informed.map((info,i)=> (
                <Info key={`${info}-${i}`} type={info} sentence={sentences[info]} />
            ))}
        </ContainerInfo>
    </Container>)
}

export default InformationBloc