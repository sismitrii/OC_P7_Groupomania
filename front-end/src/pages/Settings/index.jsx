/*====================================================*/
/* ------------------- Import ---------------------*/
/*====================================================*/
import Accordion from "../../components/Accordion"
import Bloc from "../../components/Bloc"
import Header from "../../components/Header"
import { SettingsProvider } from "../../utils/context"


/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/


/*====================================================*/
/* ------------------- Component ---------------------*/
/*====================================================*/
function Settings(){
    const isMobile = window.matchMedia("(max-width:768px)").matches
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