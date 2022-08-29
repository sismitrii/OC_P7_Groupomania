import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

import { fetchPostOrPut } from "../function/function";
/*====================================================*/
/* ---------------------- Auth -----------------------*/
/*====================================================*/
export const AuthContext = createContext()

export function AuthProvider({children}){
    const [userData, setUserData] = useState({});
    const initialError = {mailError: "", generalEror: ""}
    const [error, setError] = useState(initialError) 

    return (
    <AuthContext.Provider 
        value={{
            userData, setUserData,
            error, setError, initialError
        }}
    >
        {children}
        </AuthContext.Provider>)
}

/*====================================================*/
/* ------------------ Connection ---------------------*/
/*====================================================*/
export const ConnectionContext = createContext()

export function ConnectionProvider({children}){
    const init = JSON.parse(localStorage.getItem("dataConnection"))
    let initState = init ? init: {} ;

    const [dataConnection, setDataConnection] = useState(initState)
    const navigate = useNavigate();

    /*=== Request to log with data entered and set dataConnection with the answer===*/
    /*=== Return error message if error===*/
    const login = async(userData)=>{
        const answer = await fetchPostOrPut("POST", userData,'http://localhost:3000/api/auth/login')
        if (answer.message){
            return answer.message;
        } else {
            setDataConnection(answer)
            navigate('/home') 
            return "";    
        }
    }

    /*=== If user is reloading his page it get dataConnection in the local Storage ===*/
    useEffect(()=> {
        const data = JSON.parse(localStorage.getItem("dataConnection"))
        if (data){
            setDataConnection(data);
        }
    }, [])

    /*=== when data connection are it add to the local storage these data ===*/
    useEffect(()=>{
        localStorage.setItem("dataConnection", JSON.stringify(dataConnection))
    },[dataConnection])

    return (<ConnectionContext.Provider value={{dataConnection, setDataConnection, login}}>
        {children}
    </ConnectionContext.Provider>)
}

/*====================================================*/
/* ---------------------- App ------------------------*/
/*====================================================*/
export const AppContext = createContext();

export function AppProvider({children}){
    const [modifIsOpen, setModifIsOpen] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
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

    const informations = Object.keys(parameters);
    informations.shift();
    
    /*=== On resizing it check if it's mobile size or bigger===*/
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
             isSearching, setIsSearching,
             publications, setPublications,
             profil, setProfil,
             profilPublications, setProfilPublications,
             isMobile , parameters, informations}
             
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
    const [heartActive, setHeartActive] = useState(false)

    return (
    <PublicationContext.Provider 
        value={{
            comments, setComments, 
            publication, setPublication, 
            heartActive, setHeartActive}
        }
    >
        {children}
        </PublicationContext.Provider>)
}


/*====================================================*/
/* -------------------- Settings ---------------------*/
/*====================================================*/

export const SettingsContext = createContext();

export function SettingsProvider({children}){
    const [userData, setUserData] = useState({})
    const [activeIndex, setActiveIndex] = useState(0);
    const [updatedMessage, setUpdatedMessage] = useState("");

    useEffect(()=>{
        setActiveIndex(0);
    },[updatedMessage])

    return (
    <SettingsContext.Provider 
        value={{userData, setUserData,
            updatedMessage, setUpdatedMessage,
            activeIndex, setActiveIndex}}
    >
        {children}
    </SettingsContext.Provider>)
}





    


