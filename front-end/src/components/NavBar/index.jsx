import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faBars, faHouse, faGear } from '@fortawesome/free-solid-svg-icons'
import { faUser } from "@fortawesome/free-regular-svg-icons"
import styled from "styled-components"
import colors from "../../utils/styles/colors"
import { useState } from "react"
import { Link } from "react-router-dom"
import Search from "../Search";

const MenuBars = styled(FontAwesomeIcon)`
    color : ${colors.primary};
    margin : 20px;
    font-size : 28px;
    cursor : pointer;
`

const VerticalMenu = styled.ul`
    position : absolute;
    left : 0;
    top : 125px;
    width : 100%;
    list-style-type : none;
`



const VerticalMenuElement = styled.li`
    position : relative;
    width : 100%;
    background-color : ${colors.secondary};
    text-align : center;
    margin-top : 1px;
    font-size : 16px;
    font-weight : 500;
    transition: all 250ms ease-in-out;

    ${(props)=> 
       props.isOpen ? "top : 0; opacity: 1; display: block;" : "top : -50px; opacity : 0; display : none;"
    }

    &:hover {
        background-color : ${colors.primary};
    }

    a {
        display : block;
        padding : 15px;
        width : 100%;
    }

    svg {
        position : absolute;
        left : 20px ;
        font-size : 25px;
    }

`
//const translate = 50;

// function translateLi(){
//     let toReturn ="";
//     for (let i= 1; i<6;i++){
//         toReturn += `&:nth-child(${i}){
//             transform : translateY(${(translate)*i}px);
//             display : block;
//             opacity : 1;
//         }`
//     }
//     return toReturn;
// }





function NavBar(props){

    const [isOpen, setIsOpen] = useState(false)
    return (
    <nav>
    {props.$forMobile ?
    <>
    <MenuBars icon={faBars} onClick={()=> setIsOpen(!isOpen)}/>
    <VerticalMenu>
        <VerticalMenuElement isOpen={isOpen}><Link to="/Home"><FontAwesomeIcon icon={faHouse} />Accueil</Link></VerticalMenuElement>
        <VerticalMenuElement isOpen={isOpen}><Link to="/Home"><FontAwesomeIcon icon={faUser} />Profil</Link></VerticalMenuElement>
        <VerticalMenuElement isOpen={isOpen}><Link to="/Home"><FontAwesomeIcon icon={faGear} />Paramètres</Link></VerticalMenuElement>
        {/* Peut-etre remplacer le contenu des 2 dernier <li> par <Search> et <Logout>
         et il renverront sous la taille mobile les icones et le contenu en gardant leur fonctionnalité */}
        <VerticalMenuElement isOpen={isOpen}><Search/></VerticalMenuElement> 
        <VerticalMenuElement isOpen={isOpen}><Link to="/Home">Se Déconnecter</Link></VerticalMenuElement>
    </VerticalMenu>
    </> 
    
    :
     <div>NavBar animated</div> }
    </nav>)
}

export default NavBar