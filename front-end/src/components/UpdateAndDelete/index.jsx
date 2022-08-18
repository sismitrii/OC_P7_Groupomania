/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import { useContext } from "react"
import { ConnectionContext } from "../../utils/context"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"
import colors from "../../utils/styles/colors"

/*====================================================*/
/* --------------------- Style ----------------------*/
/*====================================================*/
const Container = styled.div`
    position: relative;
    cursor: pointer;

    &:hover div{
        width: 135px;
        height: 30px;
        overflow: visible;
        opacity: 1;
        transform: scale(1);
    }
`

const UpdateAndDeleteContainer = styled.div`
    width: 0;
    height:0;
    overflow: hidden;
    opacity: 0;
    position: absolute;
    left: -110px;
    bottom: -32px;
    border: 1px solid black;
    border-radius: 5px;
    display: flex;
    font-size: 12px;
    padding: 0px 5px;
    background-color: #FFF;

    transform: scale(0);
    transform-origin: top right;
    transition: 0.3s;


    &::after {
        content: "";
        position: absolute;
        top: -15px;
        right: 10px;
        border-right : 7px solid transparent;
        border-bottom : 14px solid black;
        border-left : 8px solid transparent;
    }

    div {
        cursor: pointer;
        padding: 5px;
        color: ${colors.primary};
    }

`

/*====================================================*/
/* ----------------------- Main ----------------------*/
/*====================================================*/
function UpdateAndDelete(props){
    //props.type = "publication ou comment"
    const {dataConnection} = useContext(ConnectionContext);

    async function handleDelete(){
        //faire une requete pour supprimer la publication ou le commentaire
        try {
            console.log('try to delete')
            const requestUrl = `http://localhost:3000/api/publication/${props.id.publication}${props.id.comment ? `/comment/${props.id.comment}` : ""}`
            const bearer = 'Bearer ' + dataConnection.token;
            const res = await fetch(requestUrl,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bearer
                },
                body: null
            });
            const answer = await res.json();
            console.log(answer);
        } catch (error) {
            console.error(error)
        }
    }

    return(
    <Container >
        <FontAwesomeIcon icon={faEllipsis} />
        <UpdateAndDeleteContainer>
            <div>Modifier</div>
            <div onClick={()=>handleDelete()}>Supprimer</div>
        </UpdateAndDeleteContainer>
    </Container>
    )
}

export default UpdateAndDelete