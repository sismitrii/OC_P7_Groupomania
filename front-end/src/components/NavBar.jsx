/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import styled from "styled-components";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext, ConnectionContext } from "../utils/context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHouse, faGear } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Search from "./Search";
import LogOut from "./LogOut";

import colors from "../utils/styles/colors";

/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/
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
  z-index: 2;
  background-color: #FFF;
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
  ${(props)=> !(props.isSearching) && 'overflow: hidden;'}

  ${(props)=>
    props.isOpen ? "top: 0; opacity: 1; height: 45px;": "top: -50px; opacity:1; height: 0px;"}

  &:hover, &:focus-within {
    background-color: ${colors.primary};
  }

  svg {
    display: ${(props)=> !(props.isOpen || props.isSearching) && "none"};
    ${(props)=>!(props.isSearching) && 
      `position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);`}
      font-size: 20px;
  }
`

const StyledLink = styled(Link)`
  display: block;
  padding 15px;
  width: 100%;
  transition: all 250ms ease-in-out;
`

const AnimatedNavBarContainer = styled.div`
  position: absolute;
  top: 170px;
  left: 50%;
  transform: translate(-50%);
`
const Container = styled.div`
  position: relative;
  width: 300px;
  height: 70px;
  background-color: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`
const NavBarList = styled.ul`
  display: flex;
  width: 210px;
`
const NavBarListElement = styled.li`
  position: relative;
  list-style: none;
  width: 70px;
  height: 70px;
  cursor: pointer;
  z-index: 1;

  &.active div {
    .navBar__icon {
      transform: translateY(-36px);
    }
    .navBar__text {
      opacity: 1;
      transform: translateY(10px);
    }
  }

  &:nth-child(1).active ~ .navBar__Circle {
    transform: translateX(0);
  }
  &:nth-child(2).active ~ .navBar__Circle {
    transform: translateX(70px);
  }
  &:nth-child(3).active ~ .navBar__Circle {
    transform: translateX(140px);
  }
`
const NavBarListLink = styled.div`
  position: relative;
  display: flex;
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
  font-weight: 500;
  letter-spacing: 1px;
  opacity: 0;
  transform: translateY(20px);

  transition: 0.5s;
`
const NavBarCircle = styled.div`
  position: absolute;
  top: -50%;
  border: 6px solid white;
  width: 70px;
  height: 70px;
  background-color: ${colors.secondary};
  border-radius: 50%;

  &::before {
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

  &::after {
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

/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/

function NavBar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const {isSearching} = useContext(AppContext)
  const {dataConnection} = useContext(ConnectionContext)

  const navigate = useNavigate();

  const routes = [
    {
      id: "home",
      name: "Accueil",
      logo: faHouse
    },
    {
      id: `profil/${dataConnection.userId}`,
      name: "Profil",
      logo: faUser
    },
    {
      id: "settings",
      name: "Paramètres",
      logo: faGear
    },
  ];



  function handleClick(e, id){
    const allLi = document.querySelectorAll('.list');
    allLi.forEach((li)=>{
        li.classList.remove('active')
    })
    e.currentTarget.classList.add('active');
    navigate(`/${id}`);
}

  return (
    <nav>
      {props.$forMobile ? (
        <>
          <MenuBars 
            tabIndex="0" 
            icon={faBars} 
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={(e)=>{
              if(e.key === 'Enter' || e.key === ' '){
                e.preventDefault(); // cancel scroll down on space
                setIsOpen(!isOpen)
              }}} />
          <VerticalMenu>
            {routes.map((route)=>(
                <VerticalMenuElement isOpen={isOpen} onClick={()=>setIsOpen(false)} key={route.id}>
                <StyledLink to={`/${route.id}`}>
                  <FontAwesomeIcon icon={route.logo} />
                  {route.name}
                </StyledLink>
              </VerticalMenuElement>
            ))}
            <VerticalMenuElement isSearching={isSearching} isOpen={isOpen}>
              <Search isOpen={isOpen} setIsOpen={setIsOpen}/>
            </VerticalMenuElement>
            <VerticalMenuElement isOpen={isOpen}>
              <LogOut />
            </VerticalMenuElement>
          </VerticalMenu>
        </>
      ) : (
        <AnimatedNavBarContainer>
          <Container>
            <NavBarList>
              {routes.map((route) => (
                <NavBarListElement
                  tabIndex="0"
                  key={route.id}
                  aria-label={route.name}
                  id={route.id}
                  className={`list ${route.id === 'home' && "active"}`}
                  onKeyDown={(e)=>{
                    if (e.key === 'Enter'){
                      handleClick(e,route.id)
                    }
                  }}
                  onClick={(e) => {
                    handleClick(e, route.id);
                  }}
                >
                    <NavBarListLink>
                    <NavBarIconContainer className="navBar__icon">
                      <FontAwesomeIcon icon={route.logo} />
                    </NavBarIconContainer>
                    <NavBarText className="navBar__text">{route.name}</NavBarText>
                  </NavBarListLink >
                </NavBarListElement>
              ))}
              <NavBarCircle className="navBar__Circle"/>
            </NavBarList>
          </Container>
        </AnimatedNavBarContainer>
      )}
    </nav>
  );
}

export default NavBar;
