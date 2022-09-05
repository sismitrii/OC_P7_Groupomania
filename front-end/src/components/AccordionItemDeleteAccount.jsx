/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import styled from "styled-components"
import { useContext, useState } from "react"
import { ConnectionContext } from "../utils/context"
import { useNavigate } from "react-router-dom"

/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/
const Container = styled.div`
    display: flex;
    flex-direction: column ;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    
    p{
        font-size: 14px;
        text-align: center;
        margin-bottom: 10px;
    }

    div {
        display: flex;
        justify-content: space-around;
        width: 300px;
    }
`
const StyledButton = styled.button`
    min-width : 90px;
    background-color: ${(props)=> props.cancel ? "#AAA" : "red"};
    color: #FFF;
    border: none;
    padding: 5px;
    border-radius: 2px;
    cursor: pointer;
`
/*====================================================*/
/* ---------------------- Main -----------------------*/
/*====================================================*/
function AccordionItemDeleteAccount(){
    const [confirmation, setConfirmation] = useState(false)
    const {dataConnection} = useContext(ConnectionContext)
    const navigate = useNavigate();

    /*=== Request to delete the account and return to login page===*/
    async function handleDelete(e){
        e.preventDefault();
        try {
            const bearer = 'Bearer ' + dataConnection.token;
            const res = await fetch(`http://localhost:3000/api/user/${dataConnection.userId}`,{
                method:"DELETE",
                headers: {
                    'Authorization' : bearer
                }
            })
            const answer = await res.json();
            console.log(answer);
            navigate('/')

        } catch (error) {
            console.error(error)
        }
    }

    return(
    <Container>
        {!confirmation ?
            <StyledButton onClick={()=>setConfirmation(true)}>
                Je veux supprimer mon compte
            </StyledButton>
        :
        <>
            <p>Confirmez que vous souhaitez supprimez votre compte</p> 
            <div>
                <StyledButton onClick={(e)=>handleDelete(e)}>
                    Confirmez
                </StyledButton>
                <StyledButton onClick={()=>setConfirmation(false)} cancel>
                    Annuler
                </StyledButton>
            </div>
        </>
        }
    </Container>)
}

export default AccordionItemDeleteAccount