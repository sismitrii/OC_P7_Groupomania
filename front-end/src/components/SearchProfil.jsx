/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import styled from "styled-components"
import { Link } from "react-router-dom"

import ProfilImg from './ProfilImg'
import { useContext } from "react"
import { AppContext } from "../utils/context"
/*====================================================*/
/* ---------------------- Style ----------------------*/
/*====================================================*/
    const ProfilContainer = styled.div`
    margin: 0 auto;
    max-width: 1000px;
    `

    const StyledLink = styled(Link)`
        display: flex;
        align-items: center;
        width: 100%;
        height: 80px;
        padding-left: 30px;
        margin: 5px 0;
        background: #DEDEDE;
    `

    const StyledName = styled.p`
        padding-left: 20px;
        font-size: 20px;
        letter-spacing: 1px;
        font-weight: bold;
    `
/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/
function SearchProfil(props){
    const {setIsSearching} = useContext(AppContext)
    return(
        <ProfilContainer>
            <StyledLink 
                to={`/profil/${props.profil._id}`} 
                onClick={()=>{setIsSearching(false);props.setProfils([])}}
            >
                <ProfilImg src={props.profil.profilImgUrl} size={"medium"} />
                <StyledName>{props.profil.username}</StyledName>
            </StyledLink>
        </ProfilContainer>
    )
}

export default SearchProfil