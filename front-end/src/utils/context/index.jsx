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