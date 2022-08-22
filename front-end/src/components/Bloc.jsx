/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import styled from "styled-components"
import AddNewPublication from "./AddNewPublication"
import ShowPublication from "./ShowPublication";
import { PublicationProvider } from "../utils/context";
import InformationBloc from "./InformationBloc";
import ProfilPublication from "./ProfilPublications";

/*====================================================*/
/* --------------------- Style ----------------------*/
/*====================================================*/

const Container = styled.section`

    width: ${(props)=> props.type === 'add' ? "96%" : "auto"};
    margin: 10px;
    background-color: #EDEDED;
    border-radius: 15px;
    box-shadow: ${(props)=> props.isInside ? "0 0 8px 5px" : "2px 6px 8px"} #C9C9C9;
    margin-bottom: 30px;
`


/*====================================================*/
/* ----------------------- Main ----------------------*/
/*====================================================*/
function Bloc(props){
    let toReturn; 

    switch (props.type){
        case 'add':
            toReturn = <AddNewPublication type={"publication"} />
            break;
        case 'show': 
            toReturn = 
                <PublicationProvider>
                    <ShowPublication publication={props.publication}/>
                </PublicationProvider>
            break;
        case 'info':
            toReturn = <InformationBloc />
            break;
        case 'profilPublication': 
            toReturn = <ProfilPublication />
            break;
        case 'settings':
            toReturn = <div>Settings</div>
            break;
        default:
            <></>
    }

    return (
    <Container type={props.type} isInside={props.isInside} >
        {toReturn}
    </Container>)
}

export default Bloc