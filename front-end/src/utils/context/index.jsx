import { useState, useEffect, createContext } from "react";

/*====================================================*/
/* ------------------ Connection ---------------------*/
/*====================================================*/
export const ConnectionContext = createContext()

export function ConnectionProvider({children}){
    const init = JSON.parse(localStorage.getItem("dataConnection"))
    let initState = init ? init: {} ;

    const [dataConnection, setDataConnection] = useState(initState)

    useEffect(()=> {
        const data = JSON.parse(localStorage.getItem("dataConnection"))
        if (data){
            setDataConnection(data);
        }
    }, [])

    useEffect(()=>{
        localStorage.setItem("dataConnection", JSON.stringify(dataConnection))
    },[dataConnection])

    return (<ConnectionContext.Provider value={{dataConnection, setDataConnection}}>
        {children}
    </ConnectionContext.Provider>)
}


/*====================================================*/
/* ---------------------- App ------------------------*/
/*====================================================*/
export const AppContext = createContext();

export function AppProvider({children}){
    const [modifIsOpen, setModifIsOpen] = useState(false);
    const [publications, setPublications] = useState([]);
    const [profil, setProfil] = useState({});
    const [profilPublications, setProfilPublications] = useState([])
    const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width:768px)").matches);

    const parameters = {
        email : {sentence: "Email", inputType: "email"},
        birthday: {sentence: "Date de naissance", inputType: "date"},
        workNumber: {sentence: "Numéro de poste", inputType: "number"},
        mobileNumber: {sentence: "Numéro de portable", inputType: "tel"},
        interests: {sentence: "Centres d'interets", inputType: "text"},
        biography: {sentence:"Biographie",inputType: "textarea"}
    }
    
    useEffect(()=>{
        window.addEventListener('resize', function(e){
            if(e.target.innerWidth < 768){
                setIsMobile(true)
            } else {
                setIsMobile(false)
            }
        })
    })

    return (
    <AppContext.Provider 
        value={
            {modifIsOpen, setModifIsOpen,
             publications, setPublications,
             profil, setProfil,
             profilPublications, setProfilPublications,
             isMobile , parameters}
             
        }
    >
        {children}
    </AppContext.Provider>)
}


/*====================================================*/
/* ------------------ Publication --------------------*/
/*====================================================*/
export const PublicationContext = createContext();

export function PublicationProvider({children}){
    const [comments, setComments] = useState([])
    const [publication, setPublication] = useState({})

    return (<PublicationContext.Provider value={{comments, setComments, publication, setPublication}}>
        {children}
        </PublicationContext.Provider>)
}

export const SettingsContext = createContext();

export function SettingsProvider({children}){
    const [userData, setUserData] = useState({})

    return (<SettingsContext.Provider value={{userData, setUserData}}>
        {children}
        </SettingsContext.Provider>)
}





    


