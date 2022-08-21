/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import styled from "styled-components"
import AddNewPublication from "./AddNewPublication"
import ShowPublication from "./ShowPublication";
import { PublicationProvider } from "../utils/context";

/*====================================================*/
/* --------------------- Style ----------------------*/
/*====================================================*/

const Container = styled.section`

    width: 100%;
    background-color: #EDEDED;
    border-radius: 15px;
    box-shadow: 2px 6px 8px #C9C9C9;
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
            break
        default:
            <></>
    }

    return (
    <Container >
        {toReturn}
    </Container>)
}

export default Bloc