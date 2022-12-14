/*====================================================*/
/* ------------------- Import ---------------------*/
/*====================================================*/
import styled from "styled-components"
import { useContext } from "react"
import { Navigate } from "react-router-dom"

import Accordion from "../../components/Accordion"
import Bloc from "../../components/Bloc"

import { AppContext, ConnectionContext, SettingsProvider } from "../../utils/context"

/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/
const Container = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 320px;
`
/*====================================================*/
/* ------------------- Component ---------------------*/
/*====================================================*/
function Settings(){
    const {isMobile} = useContext(AppContext);
    const {dataConnection} = useContext(ConnectionContext)
    return (
    <>
        { dataConnection.token ?
            <SettingsProvider>
                <Container>
                <h1>Paramètres</h1>
                {isMobile ? 
                    <Accordion />
                :
                    <Bloc type={"settings"}/>
                }
                </Container>
            </SettingsProvider> 
        :
        <Navigate replace to="/"/>
        }
    </>
    )
}

export default Settings