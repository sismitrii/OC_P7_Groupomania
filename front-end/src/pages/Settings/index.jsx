/*====================================================*/
/* ------------------- Import ---------------------*/
/*====================================================*/
import { useContext } from "react"
import styled from "styled-components"
import Accordion from "../../components/Accordion"
import Bloc from "../../components/Bloc"
import Header from "../../components/Header"
import { AppContext, SettingsProvider } from "../../utils/context"


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
    return (
    <SettingsProvider>
        <Header active={"settings"}/>
        <Container>
        <h1>Paramètres</h1>
        {isMobile ? 
            <Accordion />
        :
            <Bloc type={"settings"}/>
        }
        </Container>
    </SettingsProvider> 
    )
}

export default Settings