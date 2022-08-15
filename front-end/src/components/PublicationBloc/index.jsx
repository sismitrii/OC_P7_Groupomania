/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import styled from "styled-components"

import AddNewPublication from "../AddNewPublication"

/*====================================================*/
/* --------------------- Style ----------------------*/
/*====================================================*/

const Container = styled.div`
    width: 100%;
    background-color: #EDEDED;
    border-radius: 15px;
    box-shadow: 2px 6px 8px #C9C9C9;
`


/*====================================================*/
/* ------------------ Main Function ------------------*/
/*====================================================*/
function PublicationBloc(props){
    return (
    <Container>
        <AddNewPublication />
    </Container>)
}

export default PublicationBloc