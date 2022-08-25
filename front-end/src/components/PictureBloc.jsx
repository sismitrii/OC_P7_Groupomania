/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus, faEdit } from "@fortawesome/free-solid-svg-icons"
import colors from "../utils/styles/colors"
/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/
const Container = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content:center;

    &:focus-within {
        box-shadow: 0px 0px 0px 1px ${colors.primary}
    }
`

const StyledLabel = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    z-index: 1; 
`

const StyledIcon = styled(FontAwesomeIcon)`
    font-size: 16px;
    margin: 10px 20px;

    @media(min-width: 768px){
        font-size: 20px;
    }
`

const StyledText = styled.p`
    font-weight: 500;
    text-align: center;
    font-size: 12px;

    @media(min-width: 768px){
        font-size: 16px;
    }
`

const StyledImg = styled.img`
    ${(props)=>props.heightLimited ? "height: 200px;" : "width: 280px;"}
    border-radius: 10px;
    margin: 10px 0;
    opacity: 0.6;
`

const IconEdit = styled(FontAwesomeIcon)`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 40px;
`

const StyledInput = styled.input`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    opacity: 0;
`

/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/
function PictureBloc(props){

    return(
    <Container>
    {props.image === null ? 
        <StyledLabel htmlFor={props.type === "publication" ? "addPicture" : "modificationAddPicture"} >
            <StyledIcon icon={faCirclePlus} />
            <StyledText >Ajouter une photo</StyledText>
        </StyledLabel>
    :
    <>
        <StyledImg heightLimited={props.heightLimited} src={props.image} alt="Image Publiée" />
        <IconEdit icon={faEdit} />
    </>
    }
    <StyledInput 
        type="file" 
        id={props.type === "publication" ? "addPicture" : "modificationAddPicture"} 
        accept="image/png, image/jpeg, image/jpg" 
        onChange={(e)=>props.handleChangePicture(e)} 
    />
</Container>)

}

export default PictureBloc