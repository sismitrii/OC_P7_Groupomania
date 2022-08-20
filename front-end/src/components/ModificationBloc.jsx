/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/

import { useContext } from "react"
import styled from "styled-components"
import { AppContext } from "../utils/context"
import colors from "../utils/styles/colors"
import AddNewPublication from "./AddNewPublication"

/*====================================================*/
/* ---------------------- Style ----------------------*/
/*====================================================*/

const Container = styled.div`
    position: fixed;
    top:0;
    left:0;
    background: rgba(0,0,0, 0.4);
    width: 100%;
    height: 100vh;
    z-index: 1000;
`

const ModificationContainer = styled.div`
    position: absolute;
    width: 90%;
    min-width: 320px;
    max-width: 600px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
    background: rgba(230, 230, 230, 1);

    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid black;
    border-radius: 15px;
    padding: 20px;
`

const ModificationTitle = styled.h2`
    color: ${colors.primary};
    font-size : 35px;
    font-weight: 500;
    margin-bottom: 20px;
`

const Leave = styled.div`
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    font-size: 30px;
`

/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/

function ModificationBloc(props){
    const {setModifIsOpen} = useContext(AppContext)

    // publicationId={publication._id} 
    // imageUrl={publication.imageUrl} 
    // value={publication.content} 
    return(
    <Container>
        <ModificationContainer>
            <ModificationTitle>Modifier la publication</ModificationTitle>
            <Leave onClick={()=> {props.setIsOpenModPubliBloc(false); setModifIsOpen(false)}}>X</Leave>
            <AddNewPublication 
                setIsOpenModPubliBloc={props.setIsOpenModPubliBloc}

                type={"modification"}
            />
        </ModificationContainer>
    </Container>
    )
}

export default ModificationBloc