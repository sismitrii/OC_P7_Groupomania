import { useState, useEffect, createContext } from "react";

export const ConnectionContext = createContext()

export function ConnectionProvider({children}){
    const init = JSON.parse(localStorage.getItem("dataConnection"))
    let initState = init ? init: {} ;

    const [dataConnexion, setDataConnection] = useState(initState) 


    useEffect(()=> {
        const data = JSON.parse(localStorage.getItem("dataConnection"))
        if (data){
            setDataConnection(data)
        }
    }, [])

    useEffect(()=>{
        localStorage.setItem("dataConnection", JSON.stringify(dataConnexion))
    },[dataConnexion])




    return (<ConnectionContext.Provider value={{dataConnexion, setDataConnection}}>
        {children}
    </ConnectionContext.Provider>)
}