/*====================================================*/
/* --------------------- Import ----------------------*/
/*====================================================*/
import styled from "styled-components"
import { useContext, useState, useEffect } from "react"
import { AppContext } from "../utils/context"
import { ConnectionContext, PublicationContext } from "../utils/context"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis } from "@fortawesome/free-solid-svg-icons"
import ModificationBloc from "./ModificationBloc"
import AutosizedTextArea from "./AutosizedTextArea"

import colors from "../utils/styles/colors"
import { fetchPostOrPut } from "../utils/function/function"

/*====================================================*/
/* --------------------- Style ----------------------*/
/*====================================================*/
const Container = styled.div`
    position: relative;
    cursor: pointer;

    &:hover div, &:focus div, &:focus-within div{
        width: 135px;
        height: 30px;
        overflow: visible;
        opacity: 1;
        transform: scale(1);
        z-index:1;
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

    button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        padding: 5px;
        color: ${colors.primary};
    }
`
/*====================================================*/
/* ----------------------- Main ----------------------*/
/*====================================================*/
function UpdateAndDelete(props){
    const [isOpenModPubliBloc, setIsOpenModPubliBloc] = useState(false)
    const [isOpenModComment, setIsOpenModComment] = useState(false)
    const {dataConnection} = useContext(ConnectionContext);
    const {setPublications, setProfilPublications} = useContext(AppContext)
    const {comments, setComments, publication} = useContext(PublicationContext)
    const {setModifIsOpen} = useContext(AppContext)
    const [value, setValue] = useState("")

    useEffect(()=>{
        if (props.comment){
            setValue(props.comment.content)
        }
    },[props.comment])

    /*=== Request to delete publi or comment in DB and remove it from DOM===*/
    async function handleDelete(){
        try {
            const endUrl = props.comment ? `/comment/${props.comment._id}` : ""
            const requestUrl = `http://localhost:3000/api/publication/${publication._id}${endUrl}`
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
            if (props.comment){
                setComments((prev)=> prev.filter(comment => comment._id !== props.comment._id))
            } else {
                await setPublications((prev)=> prev.filter(publi=> publi._id !== publication._id))
                await setProfilPublications((prev)=> prev.filter(publi => publi._id !== publication._id))
            }
        } catch (error) {
            console.error(error)
        }
    }

    /*=== Open window of modification for publication(pop up) or for comment(input) ===*/
    function handleModification(){
        if (props.comment){
            setIsOpenModComment(true)
        } else {
            setIsOpenModPubliBloc(true);
            setModifIsOpen(true)
        }
    }

    /*=== On changing value in comment input set new value===*/
    async function handleChangeText(text){
        await setValue(text);
    }

    /*=== On Losing Focus request to update DB and display comment modified ===*/
    async function handleLoseFocus(){
        await setIsOpenModComment(false)

        const answer = await fetchPostOrPut("PUT",{content: value},`http://localhost:3000/api/publication/comment/${props.comment._id}`,dataConnection )
        console.log(answer);
   
        // voir s'il peut y avoir mieux parceque là c'est compliqué pour pas grand chose..
        const rank = comments.map((comment)=>comment._id).indexOf(props.comment._id)
        const ModComment = [];
        comments.forEach(comment => {
            ModComment.push(comment);
        });
        ModComment[rank] = {_id: props.comment._id, content: value, author: props.comment.author};
        setComments(ModComment);
    }

    return(
    <>
    {isOpenModPubliBloc && 
        <ModificationBloc 
            setIsOpenModPubliBloc={setIsOpenModPubliBloc}  
        />
    }
    {isOpenModComment && 
        <AutosizedTextArea
        isCommentMod
        handleLoseFocus={handleLoseFocus} 
        set={handleChangeText}
        input={{name: "modComment", placeholder: "Commentez cette publication"}}
        value={value}
        />
    }

   <Container tabIndex={0}>
        <FontAwesomeIcon icon={faEllipsis} />
        <UpdateAndDeleteContainer>
            <button aria-haspopup="true" aria-expanded={isOpenModPubliBloc} onClick={()=> handleModification()}>
                Modifier
            </button>
            <button onClick={()=>handleDelete()}>
                Supprimer
            </button>
        </UpdateAndDeleteContainer>
    </Container>
    </>
    )
}

export default UpdateAndDelete


    // const isInitialMount = useRef(true);

    // useEffect(() => {
    //   if (isInitialMount.current) {
    //      isInitialMount.current = false;
    //   } else {
    //     if (IsOpenModPubliBloc === false){
            
    //     }
    //   }
    // });