/*====================================================*/
/* ------------------- Import ---------------------*/
/*====================================================*/
import Accordion from "../../components/Accordion"
import Bloc from "../../components/Bloc"
import Header from "../../components/Header"
//import styled from "styled-components"


/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/


/*====================================================*/
/* ------------------- Component ---------------------*/
/*====================================================*/
function Settings(){
    const isMobile = window.matchMedia("(max-width:768px)").matches
    return (
    <>
        <Header active={"settings"}/>
        {isMobile ? 
            <Accordion />
        :
            <Bloc type={"settings"}/>
        }
        
    </> 
    )
}

export default Settings