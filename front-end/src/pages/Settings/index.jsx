/*====================================================*/
/* ------------------- Import ---------------------*/
/*====================================================*/
import { useContext } from "react"
import Accordion from "../../components/Accordion"
import Bloc from "../../components/Bloc"
import Header from "../../components/Header"
import { AppContext, SettingsProvider } from "../../utils/context"


/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/


/*====================================================*/
/* ------------------- Component ---------------------*/
/*====================================================*/
function Settings(){
    const {isMobile} = useContext(AppContext);
    return (
    <SettingsProvider>
        <Header active={"settings"}/>
        {isMobile ? 
            <Accordion />
        :
            <Bloc type={"settings"}/>
        }
        
    </SettingsProvider> 
    )
}

export default Settings