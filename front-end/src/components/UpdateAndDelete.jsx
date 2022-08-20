/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import { useContext, useState } from "react"
import { ConnectionContext, PublicationContext } from "../utils/context"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"
import colors from "../utils/styles/colors"
import ModificationBloc from "./ModificationBloc"

import { AppContext } from "../utils/context"
import TextInput from "./TextInput"
import { useEffect } from "react"

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
    const [isOpenModPubliBloc, setIsOpenModPubliBloc] = useState(false)
    const [isOpenModComment, setIsOpenModComment] = useState(false)
    const {dataConnection} = useContext(ConnectionContext);
    const {comments, setComments} = useContext(PublicationContext)
    const {setModifIsOpen} = useContext(AppContext)
    const [value, setValue] = useState("")

    useEffect(()=>{
        if (props.id.comment){
            setValue(props.id.comment.content)
        }
    },[props.id.comment])



    // const isInitialMount = useRef(true);

    // useEffect(() => {
    //   if (isInitialMount.current) {
    //      isInitialMount.current = false;
    //   } else {
    //     if (IsOpenModPubliBloc === false){
            
    //     }
    //   }
    // });

    async function handleDelete(){
        try {
            const endUrl = props.id.comment ? `/comment/${props.id.comment._id}` : ""
            const requestUrl = `http://localhost:3000/api/publication/${props.id.publication._id}${endUrl}`
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
            props.setDeleted(true);
        } catch (error) {
            console.error(error)
        }
    }

    function handleModification(){
        if (props.id.comment){
            setIsOpenModComment(true)
        } else {
            setIsOpenModPubliBloc(true);
            setModifIsOpen(true)
        }
    }

    async function handleChangeText(text){
        await setValue(text);
    }

    async function handleLoseFocus(){
        await setIsOpenModComment(false)
        try {
            const bearer = "Bearer " + dataConnection.token
            const res = await fetch(`http://localhost:3000/api/publication/comment/${props.id.comment._id}`,{
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': bearer
                },
                body: JSON.stringify({content: value})
            })
            const answer = await res.json();
            console.log(answer);
        } catch (error) {
            console.error(error);
        }    
        // voir s'il peut y avoir mieux parceque là c'est compliqué pour pas grand chose..
        const rank = comments.map((comment)=>comment._id).indexOf(props.id.comment._id)
        let ModComment = [];
        comments.forEach(comment => {
            ModComment.push(comment);
        });
        ModComment[rank] = {_id: props.id.comment._id, content: value, author: props.id.comment.author};
        setComments(ModComment);
    }

    return(
    <>
    {isOpenModPubliBloc && 
        <ModificationBloc 
            setIsOpenModPubliBloc={setIsOpenModPubliBloc} 
            publication={props.id.publication} 
        />
    }
    {isOpenModComment && 
        <TextInput
        isCommentMod
        handleLoseFocus={handleLoseFocus} 
        set={handleChangeText}
        input={{name: "modComment", placeholder: "Commentez cette publication"}}
        value={value}
        />
    }

   <Container >
        
        <FontAwesomeIcon icon={faEllipsis} />
        <UpdateAndDeleteContainer>
            
            <div onClick={()=> handleModification()} >Modifier</div>
            <div onClick={()=>handleDelete()}>Supprimer</div>
        </UpdateAndDeleteContainer>
    </Container>
    </>
    )
}

export default UpdateAndDelete