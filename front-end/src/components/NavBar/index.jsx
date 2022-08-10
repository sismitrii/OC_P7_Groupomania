import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faBars} from '@fortawesome/free-solid-svg-icons'

function NavBar(props){
    return (
    <>
    {props.$forMobile ? <FontAwesomeIcon icon={faBars}/>: <div>NavBar animated</div> }
    </>)
}

export default NavBar