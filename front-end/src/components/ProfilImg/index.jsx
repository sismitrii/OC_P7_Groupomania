/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/

import styled from "styled-components"

/*====================================================*/
/* --------------------- Style ----------------------*/
/*====================================================*/
const StyledImg = styled.img`
    border-radius: 50%;
    width: ${(props)=> props.width}px;
    height: ${(props)=> props.width}px;
    object-fit: cover;
`

/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/

function ProfilImg(props){
    let width;
    switch (props.size){
        case 'small':
            width = 30;
            break;
        case 'medium':
            width = 60;
            break;
        case 'large':
            width = 100;
            break;
        default:
            width = 100;
            break;
    }

    return <StyledImg src={props.src } alt="Photo de profil" width={width} />
}

export default ProfilImg