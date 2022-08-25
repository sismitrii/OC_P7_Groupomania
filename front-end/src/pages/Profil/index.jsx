/*====================================================*/
/* ------------------- Import ---------------------*/
/*====================================================*/
import styled from "styled-components"

import Header from "../../components/Header"
import ProfilImg from "../../components/ProfilImg"
import Bloc from "../../components/Bloc"

import colors from "../../utils/styles/colors"
import { useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect } from "react"
import { AppContext, ConnectionContext } from "../../utils/context"
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

    @media (min-width: 992px){ 
        flex-direction: row;
        align-items: flex-start;
    }

    & > section {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 700px;
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
        margin-bottom: 20px;
    }
`

const ProfilContainer = styled.section`
    display: flex;
    align-items: center;
    margin: 20px 0px;

    @media (min-width: 992px){
        margin-left: 20px; 
    }
`

const StyledH1 = styled.h1`
    font-size: ${(props)=>props.isMobile ? "20": "30"}px;
    font-weight: 500;
    margin: 5px 0px 25px;
`
const StyledH2 = styled.h2`
    font-size: ${(props)=>props.isMobile ? "15" : "20"}px;
    font-weight: 400;
`

const AdminButton = styled.button`
    padding: 10px;
    margin-left: 5px;
    background-color: #ff6000;
    color: #FFF;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-size: ${(props)=>props.isMobile ? "12" : "20"}px;
`

/*====================================================*/
/* ------------------- Component ---------------------*/
/*====================================================*/
function Profil(){
    const profilId = useParams();
    const navigate = useNavigate();
    const {dataConnection} = useContext(ConnectionContext)
    const {profil, setProfil, setProfilPublications, isMobile} = useContext(AppContext)

    async function handleAdminBan(){
        try {
            const bearer = 'Bearer ' + dataConnection.token;
            console.log(profilId.id);
            const res = await fetch(`http://localhost:3000/api/user/${profilId.id}`,{
                method:"DELETE",
                headers: {
                    'Authorization' : bearer
                }
            })
            const answer = await res.json();
            console.log(answer);
            navigate('/home')

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        async function loadProfil(){
            const answer = await fetchGet(`http://localhost:3000/api/user/${profilId.id}`)
            setProfil(answer.user);
        }
        loadProfil()
        async function getPublicationOfProfil(){
            const answer = await fetchGet(`http://localhost:3000/api/user/${profilId.id}/publications/0`)
            setProfilPublications(answer.publications);
        }
        getPublicationOfProfil();
    },[profilId])

    return (
    <>
    <Header active={"profil"}/>
    <Container>
        <section>
            <ProfilContainer>
                <ProfilImg forProfilPage src={profil.profilImgUrl} />
                <div>
                    <StyledH1 isMobile={isMobile}>
                        {profil.username}
                    </StyledH1>
                    <StyledH2 isMobile={isMobile}>
                        {profil.department}
                    </StyledH2>
                </div>
                { ((dataConnection.role && dataConnection.role.includes('ROLE_ADMIN'))) && (profil.role && (!profil.role.includes('ROLE_ADMIN'))) 
                &&
                    <AdminButton onClick={()=>handleAdminBan()} isMobile={isMobile}>
                        Bannir cet utilisateur
                    </AdminButton>
                }
            </ProfilContainer>
            <Bloc type={"info"} />
        </section>
        <Bloc type={"profilPublication"} />
    </Container>
    </>)
}

export default Profil