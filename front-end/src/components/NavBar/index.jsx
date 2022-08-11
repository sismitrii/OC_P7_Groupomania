import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faBars, faHouse, faGear } from '@fortawesome/free-solid-svg-icons'
import { faUser } from "@fortawesome/free-regular-svg-icons"
import styled from "styled-components"
import colors from "../../utils/styles/colors"
import { useState } from "react"
import { Link } from "react-router-dom"
import Search from "../Search";
import LogOut from "../LogOut"

const MenuBars = styled(FontAwesomeIcon)`
    color: ${colors.primary};
    margin: 20px;
    font-size: 28px;
    cursor: pointer;
`

const VerticalMenu = styled.ul`
    position: absolute;
    left: 0;
    top: 125px;
    width: 100%;
    list-style-type: none;
`

const VerticalMenuElement = styled.li`
    position: relative;
    width: 100%;
    background-color: ${colors.secondary};
    text-align: center;
    margin-top: 1px;
    font-size: 16px;
    font-weight: 500;
    transition: all 250ms ease-in-out;

    ${(props)=> 
       props.isOpen ? "top: 0; opacity: 1; display: block;" : "top : -50px; opacity: 0; display: none;"
    }

    &:hover {
        background-color: ${colors.primary};
    }

    a {
        display: block;
        padding: 15px;
        width: 100%;
    }

    svg {
        position: absolute;
        left: 20px ;
        font-size: 25px;
    }
`

const AnimatedNavBarContainer = styled.div`
    position: absolute;
    top: 200px;
    left: 50%;
    transform: translate(-50%)
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

const Container = styled.div`
    position: relative;
    width: 300px;
    height: 70px;
    background-color: #D9D9D9;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`

const NavBarList =styled.ul`
    display: flex;
    width: 210px;
`
const NavBarListElement = styled.li`
    position: relative;
    list-style: none;
    width: 70px;
    height: 70px;
    z-index: 1;

    &.active a {
        .navBar__icon{
            transform: translateY(-36px);
        } 
        .navBar__text{
            opacity: 1;
            transform: translateY(10px);
        }
    }

    &:nth-child(1).active ~ .navBar__Circle{
        transform: translateX(0)
    }
    &:nth-child(2).active ~ .navBar__Circle{
        transform: translateX(70px)
    }
    &:nth-child(3).active ~ .navBar__Circle{
        transform: translateX(140px)
    }
    

`
const NavBarListLink = styled(Link)`
    position: relative;
    display: flex ;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    text-align: center;
    font-weight: 500;
`
const NavBarIconContainer = styled.span`
    position: relative;
    display: block;
    line-height: 75px;
    font-size: 24px;
    text-align: center;

    transition: 0.5s;
`

const NavBarText = styled.span`
    position: absolute;
    color: ${colors.primary};
    font-weight: 300;
    letter-spacing: 1px;
    opacity: 0;
    transform: translateY(20px);

    transition: 0.5s;
`
const NavBarCircle = styled.div `
    position: absolute;
    top: -50%;
    border: 6px solid white;
    width: 70px;
    height: 70px;
    background-color: ${colors.secondary};
    border-radius: 50%;

    &::before{
        content: "";
        position: absolute;
        top: 50%;
        left: -21.5px;
        border-radius-top: 50%;
        border-top-right-radius: 20px; 
        width: 19px;
        height: 20px;
        background-color: transparent;
        box-shadow: 0px -10px 0 0 white;  
    }

    &::after{
        content: "";
        position: absolute;
        top: 50%;
        right: -21.5px;
        border-top-left-radius: 20px; 
        width: 19px;
        height: 20px;
        background-color: transparent;
        box-shadow: 0px -10px 0 0 white;  
    }

    transition: 0.5s;
`



function NavBar(props){
    const [isOpen, setIsOpen] = useState(false)

    function setActive(e){
        const allLi = document.querySelectorAll('.list');
        allLi.forEach((li)=>{
            li.classList.remove('active')
        })
        e.currentTarget.classList.add('active');
    }

    return (
    <nav>
    {props.$forMobile ?
    <>
    <MenuBars icon={faBars} onClick={()=> setIsOpen(!isOpen)}/>
    <VerticalMenu>
        <VerticalMenuElement isOpen={isOpen}><Link to="/Home"><FontAwesomeIcon icon={faHouse} />Accueil</Link></VerticalMenuElement>
        <VerticalMenuElement isOpen={isOpen}><Link to="/Home"><FontAwesomeIcon icon={faUser} />Profil</Link></VerticalMenuElement>
        <VerticalMenuElement isOpen={isOpen}><Link to="/Home"><FontAwesomeIcon icon={faGear} />Paramètres</Link></VerticalMenuElement>
        <VerticalMenuElement isOpen={isOpen}><Search /></VerticalMenuElement> 
        <VerticalMenuElement isOpen={isOpen}><LogOut /></VerticalMenuElement>
    </VerticalMenu>
    </> 
    
    :
     <AnimatedNavBarContainer>
        <Container>
            <NavBarList>
                <NavBarListElement className="list active" onClick={(e)=>{setActive(e)}}>
                    <NavBarListLink to="/Home">
                        <NavBarIconContainer className="navBar__icon">
                            <FontAwesomeIcon icon={faHouse}/>
                        </NavBarIconContainer>
                        <NavBarText className="navBar__text">Accueil</NavBarText>
                    </NavBarListLink>
                </NavBarListElement>
                <NavBarListElement className="list" onClick={(e)=>{setActive(e)}}>
                    <NavBarListLink to="/Home">
                        <NavBarIconContainer className="navBar__icon">
                            <FontAwesomeIcon icon={faUser}/>
                        </NavBarIconContainer>
                        <NavBarText className="navBar__text">Profil</NavBarText>
                    </NavBarListLink>
                </NavBarListElement>
                <NavBarListElement className="list" onClick={(e)=>{setActive(e)}}>
                    <NavBarListLink to="/Home">
                        <NavBarIconContainer className="navBar__icon">
                            <FontAwesomeIcon icon={faGear}/>
                        </NavBarIconContainer>
                        <NavBarText className="navBar__text">Paramètres</NavBarText>
                    </NavBarListLink>
                </NavBarListElement>
                <NavBarCircle className="navBar__Circle"/>
            </NavBarList>
        </Container>
     </AnimatedNavBarContainer> }
    </nav>)
}

export default NavBar