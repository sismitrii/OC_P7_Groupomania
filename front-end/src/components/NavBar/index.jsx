import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faBars} from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components"
import colors from "../../utils/styles/colors"
import { useState } from "react"

const MenuBars = styled(FontAwesomeIcon)`
    color : ${colors.primary};
    margin : 20px;
    font-size : 28px;
    cursor : pointer;
`




function NavBar(props){

    const [isOpen, setIsOpen] = useState(false)
    // faire un ul avec 6 li en position absolute qui ont une width de 100% et une height de 40px
    return (
    <nav>
    {props.$forMobile ? <MenuBars icon={faBars}/>: <div>NavBar animated</div> }
    </nav>)
}

export default NavBar