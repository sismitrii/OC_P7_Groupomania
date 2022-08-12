import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faBars, faHouse, faGear } from '@fortawesome/free-solid-svg-icons'
import { faUser } from "@fortawesome/free-regular-svg-icons"
import styled from "styled-components"
import colors from "../../utils/styles/colors"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
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
       props.isOpen ? "top: 0; opacity: 1;" : "top : -50px; opacity: 0;"
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
    top: 170px;
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

    &.active div {
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
const NavBarListLink = styled.div`
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

    const navigate = useNavigate();

    useEffect(()=>{
        const test = document.getElementById(props.active);
        if (test){
            const allLi = document.querySelectorAll('.list');
            allLi.forEach((li)=>{
                li.classList.remove('active')
            })
        test.classList.add('active')
        }
    },[])


    //IDEE quand je clique dessus je ne passe pas par un lien je fais le changement d'actif ()
    //et ensuite je navigate sur l'autre page avec la bonne class déjà inscrite
    // (non au re-render de la page le translate s'effectuera)

    // IDEE crée un composant App avec le header, la page et le footer comme ça on change pas le header..
    
    // IDEE travailler avec un actif et un futur actif et avec des position left(ou right) qui évolue
    // et des translate qui se calcule avec la différence actif/ futur actif. 
    // Si tu passe de home à profil d'abord un transform de ((futurActif- Actif)*70) 
    // puis au re-render left = (futurActif*70) + décalage initial(45px)
    // futurActif devra être un state initialisé à 0
    // Au clic la 1ere chose à faire c'est le translate pour ça on doit 
    // donner la classe active au li( text et icon) et faire faire au cercle un transform
    // li.active transform = 

    function setActive(e){
        const allLi = document.querySelectorAll('.list');
        allLi.forEach((li)=>{
            li.classList.remove('active')
        })
        e.currentTarget.classList.add('active');
        const id = e.currentTarget.id
        
        setTimeout(()=>{
            navigate(`/${id}`)
        },250) 
    }


    return (
    <nav>
    {props.$forMobile ?
    <>
    <MenuBars icon={faBars} onClick={()=> setIsOpen(!isOpen)}/>
    <VerticalMenu>
        <VerticalMenuElement isOpen={isOpen}><Link to="/home"><FontAwesomeIcon icon={faHouse} />Accueil</Link></VerticalMenuElement>
        <VerticalMenuElement isOpen={isOpen}><Link to="/home"><FontAwesomeIcon icon={faUser} />Profil</Link></VerticalMenuElement>
        <VerticalMenuElement isOpen={isOpen}><Link to="/home"><FontAwesomeIcon icon={faGear} />Paramètres</Link></VerticalMenuElement>
        <VerticalMenuElement isOpen={isOpen}><Search /></VerticalMenuElement> 
        <VerticalMenuElement isOpen={isOpen}><LogOut /></VerticalMenuElement>
    </VerticalMenu>
    </> 
    
    :
     <AnimatedNavBarContainer>
        <Container>
            <NavBarList>
                <NavBarListElement id="home" className="list" onClick={(e)=>{setActive(e)}}>
                    <NavBarListLink>
                        <NavBarIconContainer className="navBar__icon">
                            <FontAwesomeIcon icon={faHouse}/>
                        </NavBarIconContainer>
                        <NavBarText className="navBar__text">Accueil</NavBarText>
                    </NavBarListLink>
                </NavBarListElement>
                <NavBarListElement id="profil" className="list" onClick={(e)=>{setActive(e)}}>
                    <NavBarListLink>
                        <NavBarIconContainer className="navBar__icon">
                            <FontAwesomeIcon icon={faUser}/>
                        </NavBarIconContainer>
                        <NavBarText className="navBar__text">Profil</NavBarText>
                    </NavBarListLink>
                </NavBarListElement>
                <NavBarListElement id="settings" className="list" onClick={(e)=>{setActive(e)}}>
                    <NavBarListLink>
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