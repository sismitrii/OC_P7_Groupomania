/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import styled from "styled-components"

import AddNewPublication from "../AddNewPublication"
import ShowPublication from "../ShowPublication";
import { useState } from "react";

/*====================================================*/
/* --------------------- Style ----------------------*/
/*====================================================*/

const Container = styled.section`
    ${(props)=>props.publiDeleted ? "display: none;" : ""}
    width: 100%;
    background-color: #EDEDED;
    border-radius: 15px;
    box-shadow: 2px 6px 8px #C9C9C9;
    margin-bottom: 30px;
`


/*====================================================*/
/* ----------------------- Main ----------------------*/
/*====================================================*/
function PublicationBloc(props){
    const [publiDeleted, setPubliDeleted] = useState(false);

    let toReturn; 

    switch (props.type){
        case 'add':
            toReturn = <AddNewPublication setNewPubli={props.setNewPubli} isPublication />
            break;
        case 'show': 
            toReturn = <ShowPublication setPubliDeleted={setPubliDeleted} last={props.last} publication={props.publication}/>
            break
        default:
            <></>
    }

    return (
    <Container publiDeleted={publiDeleted}>
        {toReturn}
    </Container>)
}

export default PublicationBloc