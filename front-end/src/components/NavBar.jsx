/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHouse, faGear } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import colors from "../utils/styles/colors";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import LogOut from "./LogOut";
import { ConnectionContext } from "../utils/context";

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


  ${(props)=>
    props.isOpen ? "top: 0; opacity: 1; height: 45px;": "top: -50px; opacity:1; height: 0px;"}

  &:hover {
    background-color: ${colors.primary};
  }

  a {
    display: ${(props)=> props.isOpen ? "block" : "none"};
    padding: ${(props)=> props.isOpen ? "15px" : "0px"};
    width: 100%;
    transition: all 250ms ease-in-out;

  }

  svg {
    display: ${(props)=> props.isOpen ? "inline" : "none"};
    position: absolute;
    left: 20px;
    font-size: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const AnimatedNavBarContainer = styled.div`
  position: absolute;
  top: 170px;
  left: 50%;
  transform: translate(-50%);
`;

const Container = styled.div`
  position: relative;
  width: 300px;
  height: 70px;
  background-color: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const NavBarList = styled.ul`
  display: flex;
  width: 210px;
`;
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
  font-weight: 300;
  letter-spacing: 1px;
  opacity: 0;
  transform: translateY(20px);

  transition: 0.5s;
`

const NavBarCircle = styled.div`
  position: absolute;
  top: -50%;
  left: ${(props)=> (props.left) + 45 }px;
  border: 6px solid white;
  width: 70px;
  height: 70px;
  background-color: ${colors.secondary};
  border-radius: 50%;

  transform: translate(${(props)=> props.transform}px);

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

// &:nth-child(1).active ~ .navBar__Circle {
//     transform: translateX(0);
//   }
//   &:nth-child(2).active ~ .navBar__Circle {
//     transform: translateX(70px);
//   }
//   &:nth-child(3).active ~ .navBar__Circle {
//     transform: translateX(140px);
//   }

/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/

function NavBar(props) {
  const [activeMenu, setActiveMenu] = useState(["home",0, 0]);
  //const [futurActive, setFutureActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
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

  useEffect(() => {
    const { active } = props;
    const indexObj = {
        home: 0,
        profil: 1,
        settings: 2
    }
    /*let index ;
    if (active === "home"){
        index = 0;
    }
    if (active === "profil"){
        index = 1;
    }
    if (active === "settings"){
        index = 2;
    }*/

    setActiveMenu([active, indexObj[active], activeMenu[1]]);
  }, [navigate]);

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

  //ajouter class au Circle


  function handleClick(id, index) {

    navigate(`/${id}`);
  }


  return (
    <nav>
      {props.$forMobile ? (
        <>
          <MenuBars icon={faBars} onClick={() => setIsOpen(!isOpen)} />
          <VerticalMenu>
            {routes.map((route)=>(
                <VerticalMenuElement isOpen={isOpen} key={route.id}>
                <Link to={`/${route.id}`}>
                  <FontAwesomeIcon icon={route.logo} />
                  {route.name}
                </Link>
              </VerticalMenuElement>
            ))}
            <VerticalMenuElement isOpen={isOpen}>
              <Search $isOpen={isOpen} setIsOpen={setIsOpen}/>
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
              {routes.map((route, index) => (
                <NavBarListElement
                  key={route.id}
                  aria-label={route.name}
                  id={route.id}
                  className={activeMenu[0] === route.id ? " active" : ""}
                  onClick={() => {
                    handleClick(route.id, index);
                  }}
                >
                    <NavBarListLink>
                    <NavBarIconContainer className="navBar__icon">
                      <FontAwesomeIcon icon={route.logo} />
                    </NavBarIconContainer>
                    <NavBarText className="navBar__text">{route.name}</NavBarText>
                  </NavBarListLink>
                </NavBarListElement>
              ))}
              <NavBarCircle className="navBar__Circle" transform={((activeMenu[1]-activeMenu[2])*70)} left={activeMenu[2]}/>
            </NavBarList>
          </Container>
        </AnimatedNavBarContainer>
      )}
    </nav>
  );
}

export default NavBar;
