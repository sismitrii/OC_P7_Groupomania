/*====================================================*/
/* ------------------- Import ---------------------*/
/*====================================================*/
import styled from "styled-components"

import Header from "../../components/Header"
import ProfilImg from "../../components/ProfilImg"
import Bloc from "../../components/Bloc"

import colors from "../../utils/styles/colors"
import { useParams } from "react-router-dom"
import { useContext, useEffect } from "react"
import { AppContext } from "../../utils/context"
import { fetchGet } from "../../utils/function/function"

/*====================================================*/
/* --------------------- Style -----------------------*/
/*====================================================*/

//(max-width:992px)
const Container = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    max-width: 1300px;
    margin: 0 auto;

    @media (min-width: 768px){ 
        flex-direction: row;
        align-items: flex-start;
    }

    & > section {
        width: 100%;
        margin: 0px 10px;

        @media (min-width: 992px){
            margin: 10px 20px;
        }
    }

    h3 {
        color: ${colors.primary};
        text-align:center;
        font-size: 25px;
        font-weight: 500;
    }
`

const ProfilContainer = styled.section`
    display: flex;
    margin: 20px 0px;

    @media (min-width: 992px){
        margin-left: 20px; 
    }
`

const StyledH1 = styled.h1`
    font-size: 30px;
    font-weight: 500;
    margin-top: 5px;
    margin-bottom: 25px;
`
const StyledH2 = styled.h2`
    font-size: 20px;
    font-weight: 400;
`

/*====================================================*/
/* ------------------- Component ---------------------*/
/*====================================================*/
function Profil(){
    const profilId = useParams();
    const {profil, setProfil} = useContext(AppContext)

    useEffect(()=>{
        async function loadProfil(){
            const answer = await fetchGet(`http://localhost:3000/api/user/${profilId.id}`)
            setProfil(answer.user);
        }
        loadProfil()
    },[profilId])

    return (
    <>
    <Header active={"profil"}/>
    <Container>
        <section>
            <ProfilContainer>
                <ProfilImg forProfilPage src={profil.profilImgUrl} />
                <div>
                    <StyledH1>{profil.username}</StyledH1>
                    <StyledH2>{profil.department}</StyledH2>
                </div>
            </ProfilContainer>
            <Bloc type={"info"} />
        </section>
        <Bloc>
            <h3>Publication</h3>
            <div>
            <Bloc 
                type={"add"}
            /> 
            </div>
            <div></div>
        </Bloc>
    </Container>
    </>)
}

export default Profil