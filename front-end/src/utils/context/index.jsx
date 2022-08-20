import { useState, useEffect, createContext } from "react";

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



export const AppContext = createContext();

export function AppProvider({children}){
    const [modifIsOpen, setModifIsOpen] = useState(false);
    const [publications, setPublications] = useState([]);

    return (<AppContext.Provider value={{modifIsOpen, setModifIsOpen, publications, setPublications}}>
        {children}
        </AppContext.Provider>)
}

export const PublicationContext = createContext();

export function PublicationProvider({children}){
    const [comments, setComments] = useState([])
    const [publication, setPublication] = useState({})

    return (<PublicationContext.Provider value={{comments, setComments, publication, setPublication}}>
        {children}
        </PublicationContext.Provider>)
}





    


